import axios from 'axios';

const apiUrl =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof process !== 'undefined' ? (process as any).env?.NEXT_PUBLIC_API_URL : '') ||
  'http://localhost:8080';

export const api = axios.create({ baseURL: apiUrl });

export function authHeader() {
  const t = localStorage.getItem('token') || '';
  return { headers: { Authorization: `Bearer ${t}` } };
}

