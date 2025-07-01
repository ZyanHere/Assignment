// lib/api/axios.js
import axios from 'axios';
import { getSession } from 'next-auth/react';

export const api = axios.create({
  baseURL: 'https://lmd-user-2ky8.onrender.com/lmd/api/v1/retail/cart/me',
  headers: { 'Content-Type': 'application/json' },
});

// Automatically attach Bearer token on every request
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.user?.token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${session.user.token}`,
    };
  }
  return config;
});
