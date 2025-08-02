// lib/api/axios.js
import axios from 'axios';
import { getSession } from 'next-auth/react';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000', 
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false, // Important for CSRF tokens
});

// Automatically attach Bearer token on every request
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.user?.token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${session.user.token}`,
    };
  } else if (session?.user?.accessToken) {
    // Fallback for different token property names
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${session.user.accessToken}`,
    };
  }
  return config;
});
