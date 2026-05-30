import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { clearAuth, saveAuthTokens, toastService } from '@react-lab/shared';
import {
    changePassword as changePasswordService,
    login as loginService,
    logout as logoutService,
    register as registerService,
} from './auth.service';
import type { ChangePasswordData, LoginData, RegisterData, User } from './auth.types';

export interface AuthState {
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
    'auth/login',
    async (credentials: LoginData, { rejectWithValue }) => {
        try {
            const { accessToken, refreshToken } = await loginService(credentials);
            saveAuthTokens(accessToken, refreshToken);
            const decoded = jwtDecode<DecodedToken>(accessToken);
            return { user: decoded };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || 'Login failed');
        }
    }
);

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (data: RegisterData, { rejectWithValue }) => {
        try {
            await registerService(data);
            return true;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || 'Registration failed');
        }
    }
);

export const changePasswordThunk = createAsyncThunk(
    'auth/changePassword',
    async (data: ChangePasswordData, { rejectWithValue }) => {
        try {
            await changePasswordService(data);
            return true;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.error || 'Password change failed');
        }
    }
);

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            logoutService(refreshToken).catch((err) => {
                console.error('Backend logout failed:', err);
            });
        }
        clearAuth();
    }
);

export const initializeAuthThunk = createAsyncThunk(
    'auth/initialize',
    async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) return null;

        try {
            const decoded = jwtDecode<DecodedToken>(token);
            return { user: decoded };
        } catch {
            clearAuth();
            return null;
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        forceLogout(state) {
            clearAuth();
            state.isLoggedIn = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
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

            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload.user;
                toastService.success('Login successful');
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                toastService.error(String(action.payload));
            })

            .addCase(logoutThunk.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                toastService.info('Logged out');
            })

            .addCase(registerThunk.fulfilled, () => {
                toastService.success('Registration successful');
            })
            .addCase(registerThunk.rejected, (_, action) => {
                toastService.error(String(action.payload));
            })

            .addCase(changePasswordThunk.fulfilled, () => {
                toastService.success('Password changed successfully');
            })
            .addCase(changePasswordThunk.rejected, (_, action) => {
                toastService.error(String(action.payload));
            });
    },
});

export const { forceLogout } = authSlice.actions;
export default authSlice.reducer;
