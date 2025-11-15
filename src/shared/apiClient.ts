import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { CONFIG } from "./config";

interface JwtPayload {
    exp: number;
}

interface RetryConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const apiClient = axios.create({
    baseURL: CONFIG.API_URL,
});

// ---- Attach Access Token ----
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// ---- Handle 401 + Refresh Token ----
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryConfig;

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            clearAuth();
            return Promise.reject(error);
        }

        try {
            // Check refresh token expiry
            const decoded = jwtDecode<JwtPayload>(refreshToken);
            const now = Math.floor(Date.now() / 1000);

            if (decoded.exp <= now) {
                clearAuth();
                return Promise.reject(error);
            }

            // Refresh access token (using axios to avoid interceptor recursion)
            const { data } = await axios.post<{ accessToken: string }>(
                `${CONFIG.API_URL}/auth/refresh-token`,
                { refreshToken }
            );

            const newAccessToken = data.accessToken;
            localStorage.setItem("accessToken", newAccessToken);

            // Retry failed request with new token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);
        } catch (err) {
            clearAuth();
            return Promise.reject(err);
        }
    }
);

// ---- Helpers ----
export const clearAuth = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

export default apiClient;
