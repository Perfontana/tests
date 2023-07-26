import axios, { AxiosInstance } from 'axios';
import { getToken } from '../../storage/token';

const api: AxiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

api.interceptors.request.use(
  (config) => {
    const { headers = {} } = config;
    const token = getToken();
    if (token) {
      headers.Authorization = token;
    }
    return config;
  },
  async (error) => { await Promise.reject(error); },
);

export default api;
