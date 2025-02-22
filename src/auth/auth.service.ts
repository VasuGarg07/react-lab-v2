import apiClient from "@/shared/apiClient";
import { ChangePasswordData, LoginData, RegisterData } from "@/auth/auth.types";

// Save authentication data
export const saveAuthData = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
};

// Clear authentication data
export const clearAuthData = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

// Refresh access token
export const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return null;

    try {
        const response = await apiClient.post("/auth/refresh-token", { refreshToken });
        const { accessToken } = response.data;
        saveAuthData(accessToken, refreshToken);
        return accessToken;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        clearAuthData();
        return null;
    }
};

// Register
export const register = async (data: RegisterData): Promise<void> => {
    await apiClient.post("/auth/register", data);
};

// Login
export const login = async (data: LoginData): Promise<{ accessToken: string; refreshToken: string }> => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
};

// Change Password
export const changePassword = async (data: ChangePasswordData): Promise<void> => {
    await apiClient.post("/auth/change-password", data);
};
