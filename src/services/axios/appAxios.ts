import axios from 'axios';
import { BASE_URL } from '../../utils/types/constants.ts';
import { TokenService } from '../index.ts';

const appAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

appAxios.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

appAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await TokenService.refreshToken();
        const newToken = TokenService.getToken();
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
