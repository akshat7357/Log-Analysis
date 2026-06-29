import axios from 'axios';
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Response] ${response.config.url}`, response.data);
    }
    return response;
  },
  async (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.error('Unauthorized - redirecting to login');
      } else if (status === 403) {
        console.error('Forbidden - insufficient permissions');
      } else if (status === 404) {
        console.error('Resource not found');
      } else if (status >= 500) {
        console.error('Server error - please try again later');
      }
    } else if (error.request) {
      console.error('Network error - please check your connection');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
