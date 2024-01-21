import axios from 'axios';
import { BASE_URL } from '../../utils/constants.ts';

const appAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

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

export default appAxios;
