import axios from 'axios';

let apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
// Corrige si alguien puso 'ttps://'
apiUrl = apiUrl.replace(/^ttps:\/\//i, 'https://');

export const api = axios.create({ baseURL: apiUrl });

export function authHeader() {
  const t = localStorage.getItem('token') || '';
  return { headers: { Authorization: `Bearer ${t}` } };
}
