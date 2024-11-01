// src/utils/api.ts
import axios from 'axios';
import { auth } from './firebase-config';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(async (config) => {
    try {
        const user = auth.currentUser;
        if (user) {
            const token = await user.getIdToken(true);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    } catch (error) {
        return Promise.reject(error);
    }
});

// Handle 401s
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Force Firebase to refresh token or sign out
            try {
                await auth.currentUser?.getIdToken(true);
                // Retry the original request
                return api(error.config);
            } catch {
                auth.signOut();
            }
        }
        return Promise.reject(error);
    }
);

export default api;