import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAlert } from "../shared/AlertProvider";
import { ChangePasswordData, LoginData, RegisterData, User } from "./auth.types";

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    register: (data: RegisterData) => Promise<void>;
    login: (data: LoginData) => Promise<void>;
    changePassword: (data: ChangePasswordData) => Promise<void>;
    logout: () => void;
}

interface ContextProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<ContextProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const { alert } = useAlert();
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

    const axiosInstance = axios.create({ baseURL: `${API_URL}/auth` });

    // Intercept requests to add Authorization header
    axiosInstance.interceptors.request.use(async (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // Save authentication data
    const saveAuthData = (accessToken: string, refreshToken: string) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        const decodedToken = jwtDecode<User>(accessToken);
        setUser({
            id: decodedToken.id,
            username: decodedToken.username,
            email: decodedToken.email
        });
        setIsLoggedIn(true);
    };

    // Clear authentication data
    const clearAuthData = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        setIsLoggedIn(false);
    };

    // Refresh access token
    const refreshAccessToken = async (): Promise<void> => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            clearAuthData();
            return;
        }

        try {
            const response = await axiosInstance.post("/refresh-token", { refreshToken });
            const { accessToken } = response.data;
            localStorage.setItem("accessToken", accessToken);

            const decodedToken = jwtDecode<User>(accessToken);
            setUser({
                id: decodedToken.id,
                username: decodedToken.username,
                email: decodedToken.email
            });
        } catch (error) {
            console.error("Failed to refresh token:", error);
            clearAuthData();
        }
    };

    // Register API
    const register = async (data: RegisterData): Promise<void> => {
        try {
            await axiosInstance.post("/register", data);
            alert("User registered successfully", "success");
        } catch (error: any) {
            console.error("Error during registration:", error.response?.data?.error || error.message);
            throw error;
        }
    };

    // Login API
    const login = async (data: LoginData): Promise<void> => {
        try {
            const response = await axiosInstance.post("/login", data);
            const { accessToken, refreshToken } = response.data;
            saveAuthData(accessToken, refreshToken);
        } catch (error: any) {
            console.error("Error during login:", error.response?.data?.error || error.message);
            throw error;
        }
    };

    // Change Password API
    const changePassword = async (data: ChangePasswordData): Promise<void> => {
        try {
            await axiosInstance.post("/change-password", data);
            alert("Password changed. Please login.", "success");
        } catch (error: any) {
            console.error("Error during password change:", error.response?.data?.error || error.message);
            throw error;
        }
    };

    // Logout Functionality
    const logout = () => {
        clearAuthData();
        alert("User logged out.", "success");
    };

    // Initialize Authentication State on App Load
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decodedToken = jwtDecode<User>(token);
                setUser({
                    id: decodedToken.id,
                    username: decodedToken.username,
                    email: decodedToken.email
                });
                setIsLoggedIn(true);
            } catch {
                // Token is invalid or expired; try refreshing it
                refreshAccessToken();
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, register, login, changePassword, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
