import axios from 'axios';
import { BASE_API_URL } from '@/shared/config/api';

const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
