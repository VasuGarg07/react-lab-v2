import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { CONFIG } from "./config";

interface JwtPayload {
    exp: number;
}

interface RetryConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

interface RefreshResponse {
    accessToken: string;
    refreshToken: string;
}

// ---- Token storage helpers (defined first to avoid TDZ issues in interceptors) ----

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const saveAuthTokens = setTokens;

export const clearAuth = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
};

let refreshPromise: Promise<string> | null = null;

const performRefresh = async (): Promise<string> => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        throw new Error("No refresh token");
    }
    try {
        const { exp } = jwtDecode<JwtPayload>(refreshToken);
        if (exp <= Math.floor(Date.now() / 1000)) {
            throw new Error("Refresh token expired");
        }
    } catch {
        throw new Error("Refresh token invalid");
    }

    // Use bare axios to avoid recursing through this interceptor.
    const { data } = await axios.post<RefreshResponse>(
        `${CONFIG.API_URL}/auth/refresh-token`,
        { refreshToken }
    );

    setTokens(data.accessToken, data.refreshToken);
    return data.accessToken;
};

/**
 * Get a fresh access token, deduplicating concurrent calls. The first caller
 * triggers the network request; subsequent callers await the same promise.
 */
const refreshAccessToken = (): Promise<string> => {
    if (!refreshPromise) {
        refreshPromise = performRefresh().finally(() => {
            refreshPromise = null;
        });
    }
    return refreshPromise;
};

const apiClient = axios.create({
    baseURL: CONFIG.API_URL,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryConfig | undefined;
        if (!originalRequest || error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            await refreshAccessToken();
            return apiClient(originalRequest);
        } catch (refreshError) {
            clearAuth();
            window.dispatchEvent(new CustomEvent("auth:logout"));
            return Promise.reject(refreshError);
        }
    }
);

export default apiClient;