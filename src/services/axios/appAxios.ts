import axios from 'axios';
import { BASE_URL } from '../../utils/types/constants.ts';

const appAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const refreshToken = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/refresh`, {
      token: localStorage.getItem('token'),
    });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

appAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

appAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return appAxios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default appAxios;
