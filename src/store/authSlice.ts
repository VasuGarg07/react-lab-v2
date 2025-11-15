
import {
    login as loginService,
    register as registerService,
    changePassword as changePasswordService,
    refreshAccessToken,
    saveAuthData,
} from "../auth/auth.service";
import { jwtDecode } from "jwt-decode";
import type { User, LoginData, RegisterData, ChangePasswordData } from "../auth/auth.types";
import { toastService } from "../shared/toastr";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearAuth } from "../shared/apiClient";

interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
    loading: boolean;
    initializing: boolean;
}

const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    loading: false,
    initializing: true,
};

type DecodedToken = User & { exp: number };

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (credentials: LoginData, { rejectWithValue }) => {
        try {
            const { accessToken, refreshToken } = await loginService(credentials);
            saveAuthData(accessToken, refreshToken);

            const decoded = jwtDecode<DecodedToken>(accessToken);
            return { user: decoded };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || "Login failed");
        }
    }
);

export const registerThunk = createAsyncThunk(
    "auth/register",
    async (data: RegisterData, { rejectWithValue }) => {
        try {
            await registerService(data);
            return true;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || "Registration failed");
        }
    }
);

export const changePasswordThunk = createAsyncThunk(
    "auth/changePassword",
    async (data: ChangePasswordData, { rejectWithValue }) => {
        try {
            await changePasswordService(data);
            return true;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || "Password change failed");
        }
    }
);

export const initializeAuthThunk = createAsyncThunk(
    "auth/initialize",
    async (_) => {
        const token = localStorage.getItem("accessToken");
        if (!token) return null;

        try {
            const decoded = jwtDecode<DecodedToken>(token);
            const now = Math.floor(Date.now() / 1000);

            // Refresh early if expired
            if (decoded.exp <= now) {
                const newToken = await refreshAccessToken();
                if (!newToken) return null;

                const newUser = jwtDecode<DecodedToken>(newToken);
                return { user: newUser };
            }

            return { user: decoded };
        } catch (err) {
            clearAuth();
            return null;
        }
    }
);

export const refreshTokenThunk = createAsyncThunk(
    "auth/refresh",
    async (_, { rejectWithValue }) => {
        try {
            const newToken = await refreshAccessToken();
            if (!newToken) return rejectWithValue("Refresh failed");

            const decoded = jwtDecode<DecodedToken>(newToken);
            return { user: decoded };
        } catch {
            return rejectWithValue("Refresh failed");
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            clearAuth();
            state.isLoggedIn = false;
            state.user = null;
            toastService.info("Logged out");
        },
    },
    extraReducers: (builder) => {
        builder
            // Initialize
            .addCase(initializeAuthThunk.fulfilled, (state, action) => {
                state.initializing = false;
                if (action.payload?.user) {
                    state.isLoggedIn = true;
                    state.user = action.payload.user;
                }
            })
            .addCase(initializeAuthThunk.rejected, (state) => {
                state.initializing = false;
            })

            // Login
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload.user;
                toastService.success("Login successful");
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                toastService.error(String(action.payload));
            })

            // Register
            .addCase(registerThunk.fulfilled, () => {
                toastService.success("Registration successful");
            })
            .addCase(registerThunk.rejected, (_, action) => {
                toastService.error(String(action.payload));
            })

            // Change Password
            .addCase(changePasswordThunk.fulfilled, () => {
                toastService.success("Password changed successfully");
            })
            .addCase(changePasswordThunk.rejected, (_, action) => {
                toastService.error(String(action.payload));
            })

            // Token Refresh
            .addCase(refreshTokenThunk.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })
            .addCase(refreshTokenThunk.rejected, (state) => {
                clearAuth();
                state.isLoggedIn = false;
                state.user = null;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
