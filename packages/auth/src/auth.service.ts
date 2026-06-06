import { apiClient } from '@react-lab/shared';
import type { AccessTokens, ChangePasswordData, LoginData, RegisterData } from './auth.types';

export const register = async (data: RegisterData): Promise<void> => {
    await apiClient.post('/auth/register', data);
};

export const login = async (data: LoginData): Promise<AccessTokens> => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
};

export const changePassword = async (data: ChangePasswordData): Promise<void> => {
    await apiClient.post('/auth/change-password', data);
};

export const logout = async (refreshToken: string): Promise<void> => {
    await apiClient.post('/auth/logout', { refreshToken });
};
