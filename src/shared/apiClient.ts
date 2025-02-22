import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { CONFIG } from "@/shared/config";


const apiClient = axios.create({
    baseURL: CONFIG.API_URL,
});

// Intercept requests to add Authorization header
apiClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor to handle 401 errors
apiClient.interceptors.response.use(
    (response) => response, // Pass through successful responses
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                console.error("Refresh token not available. Logging out.");
                clearAuthData();
                return Promise.reject(error);
            }

            try {
                // Decode the refresh token to check expiry
                const decodedToken: { exp: number } = jwtDecode(refreshToken);
                const currentTime = Math.floor(Date.now() / 1000);
                if (decodedToken.exp <= currentTime) {
                    console.error("Refresh token expired. Logging out.");
                    clearAuthData();
                    return Promise.reject(error);
                }

                // Get a new access token using the refresh token
                const { data } = await axios.post(`${CONFIG.API_URL}/auth/refresh-token`, {
                    refreshToken,
                });

                const { accessToken } = data;
                localStorage.setItem("accessToken", accessToken);

                // Update Authorization header for the retried request
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return apiClient(originalRequest); // Retry the original request
            } catch (refreshError) {
                console.error("Failed to refresh access token:", refreshError);
                clearAuthData();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Helper function to clear authentication data
const clearAuthData = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

export default apiClient;
