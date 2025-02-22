// AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
    saveAuthData,
    clearAuthData,
    refreshAccessToken,
    register,
    login,
    changePassword,
} from "@/auth/auth.service";
import { ChangePasswordData, LoginData, RegisterData, User } from "@/auth/auth.types";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { toastService } from "@/providers/toastr";

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

type DecodedToken = JwtPayload & User;

const AuthContext = createContext<AuthContextType | null>(null);

const isTokenExpired = (exp: number): boolean => {
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > exp;
}

export const AuthProvider: React.FC<ContextProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const handleRegister = async (data: RegisterData): Promise<void> => {
        try {
            await register(data);
            toastService.success("User registered successfully")
        } catch (error: any) {
            console.error("Error during registration:", error.response?.data?.error || error.message);
            toastService.error("Registeration failed")
            throw error;
        }
    };

    const handleLogin = async (data: LoginData): Promise<void> => {
        try {
            const { accessToken, refreshToken } = await login(data);
            saveAuthData(accessToken, refreshToken);
            const decodedToken = jwtDecode<User>(accessToken);
            setUser(decodedToken);
            setIsLoggedIn(true);
            toastService.success("Login successful")
        } catch (error: any) {
            console.error("Error during login:", error.response?.data?.error || error.message);
            toastService.error(error.response?.data?.error || error.message);
            throw error;
        }
    };

    const handleChangePassword = async (data: ChangePasswordData): Promise<void> => {
        try {
            await changePassword(data);
            toastService.success("Password changed successfully. Please Login");
        } catch (error: any) {
            console.error("Error during password change:", error.response?.data?.error || error.message);
            toastService.error(error.response?.data?.error || error.message);
            throw error;
        }
    };

    const handleLogout = () => {
        clearAuthData();
        setUser(null);
        setIsLoggedIn(false);
        toastService.info("User logged out");
    };

    // Initialize Authentication State on App Load
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            const decoded = jwtDecode<DecodedToken>(token);
            try {
                if (isTokenExpired(decoded.exp!)) {
                    refreshAccessToken();
                } else {
                    setUser({
                        id: decoded.id,
                        username: decoded.username,
                        email: decoded.email
                    });
                }
                setIsLoggedIn(true);
            } catch {
                // Token is invalid or expired; try refreshing it
                refreshAccessToken();
            }
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                register: handleRegister,
                login: handleLogin,
                changePassword: handleChangePassword,
                logout: handleLogout,
            }}
        >
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
