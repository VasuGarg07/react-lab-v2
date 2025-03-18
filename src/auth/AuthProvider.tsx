// AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { saveAuthData, clearAuthData, refreshAccessToken, register, login, changePassword } from "@/auth/auth.service";
import { ChangePasswordData, LoginData, RegisterData, User } from "@/auth/auth.types";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { toastService } from "@/shared/toastr";

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
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
};

const parseUserFromToken = (token: string): User | null => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email
        };
    } catch (error) {
        console.error("Failed to parse user from token:", error);
        return null;
    }
};

const handleAuthError = (error: any, operation: string): never => {
    const errorMessage = error.response?.data?.error || error.message || `${operation} failed`;
    console.error(`Error during ${operation}:`, errorMessage);
    toastService.error(errorMessage);
    throw error;
};

export const AuthProvider: React.FC<ContextProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const handleRegister = async (data: RegisterData): Promise<void> => {
        try {
            await register(data);
            toastService.success("User registered successfully");
        } catch (error: any) {
            handleAuthError(error, "registration");
        }
    };

    const handleLogin = async (data: LoginData): Promise<void> => {
        try {
            const { accessToken, refreshToken } = await login(data);
            saveAuthData(accessToken, refreshToken);

            const userData = parseUserFromToken(accessToken);
            if (!userData) {
                throw new Error("Invalid token data");
            }

            setUser(userData);
            setIsLoggedIn(true);
            toastService.success("Login successful");
        } catch (error: any) {
            handleAuthError(error, "login");
        }
    };

    const handleChangePassword = async (data: ChangePasswordData): Promise<void> => {
        try {
            await changePassword(data);
            toastService.success("Password changed successfully. Please Login");
        } catch (error: any) {
            handleAuthError(error, "password change");
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
        const initializeAuth = async () => {
            setLoading(true);
            const token = localStorage.getItem("accessToken");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const decoded = jwtDecode<DecodedToken>(token);

                if (isTokenExpired(decoded.exp!)) {
                    // Token is expired, try to refresh
                    const newToken = await refreshAccessToken();
                    if (newToken) {
                        const userData = parseUserFromToken(newToken);
                        if (userData) {
                            setUser(userData);
                            setIsLoggedIn(true);
                        } else {
                            handleLogout();
                        }
                    } else {
                        handleLogout();
                    }
                } else {
                    // Token is valid
                    const userData = parseUserFromToken(token);
                    if (userData) {
                        setUser(userData);
                        setIsLoggedIn(true);
                    } else {
                        handleLogout();
                    }
                }
            } catch (error) {
                console.error("Error initializing auth:", error);
                handleLogout();
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    // Set up automatic token refresh before expiration
    useEffect(() => {
        if (!isLoggedIn || !user) return;

        const token = localStorage.getItem("accessToken");
        if (!token) return;

        try {
            const decoded = jwtDecode<DecodedToken>(token);
            const expiresIn = decoded.exp! - Math.floor(Date.now() / 1000);

            // Refresh 5 minutes before expiry
            const refreshTime = Math.max(0, expiresIn - 300) * 1000;

            const refreshTimer = setTimeout(async () => {
                try {
                    const newToken = await refreshAccessToken();
                    if (newToken) {
                        const userData = parseUserFromToken(newToken);
                        if (userData) {
                            setUser(userData);
                        } else {
                            handleLogout();
                        }
                    } else {
                        handleLogout();
                    }
                } catch (error) {
                    console.error("Failed to refresh token automatically:", error);
                    handleLogout();
                }
            }, refreshTime);

            return () => clearTimeout(refreshTimer);
        } catch (error) {
            console.error("Failed to set up token refresh:", error);
            handleLogout();
        }
    }, [isLoggedIn, user]);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                loading,
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