import axios from "axios";
import { CONFIG } from "../shared/config";
import type { ChangePasswordData, LoginData, RegisterData } from "./auth.types";

const apiClient = axios.create({
    baseURL: CONFIG.AUTH_URL
})

export const register = async (data: RegisterData): Promise<void> => {
    await apiClient.post("/register", data);
};

export const login = async (data: LoginData): Promise<{ accessToken: string; refreshToken: string }> => {
    const response = await apiClient.post("/login", data);
    return response.data;
};

export const changePassword = async (data: ChangePasswordData): Promise<void> => {
    await apiClient.post("/change-password", data);
};

export const logout = async (refreshToken: string): Promise<void> => {
    await apiClient.post("/logout", { refreshToken });
};