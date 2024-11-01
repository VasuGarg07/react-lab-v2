import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithCustomToken,
    onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../shared/firebase-config';
import axios from 'axios';
import { AuthContextType, AuthUser, AuthResponse, UpdateProfileData } from './auth.types';
import api from '../shared/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const authApi = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const googleProvider = new GoogleAuthProvider();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const token = await firebaseUser.getIdToken();
                localStorage.setItem('authToken', token);
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    emailVerified: firebaseUser.emailVerified,
                });
            } else {
                localStorage.removeItem('authToken');
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const register = async (email: string, password: string, displayName: string): Promise<AuthUser> => {
        try {
            setError(null);
            const { data } = await authApi.post<{ data: AuthResponse }>('/auth/register', {
                email,
                password,
                displayName,
            });
            const { token, user } = data.data;

            // Sign in with Firebase using custom token
            await signInWithCustomToken(auth, token);
            setUser(user);
            return user;
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to register');
            setError(error);
            throw error;
        }
    };

    const signInWithEmail = async (email: string, password: string): Promise<AuthUser> => {
        try {
            setError(null);
            const { data } = await authApi.post<{ data: AuthResponse }>('/auth/login', {
                email,
                password
            });
            const { token, user } = data.data;
            // Sign in with Firebase using custom token
            await signInWithCustomToken(auth, token);
            setUser(user);
            return user;
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to sign in');
            setError(error);
            throw error;
        }
    };

    const signInWithGoogle = async (): Promise<AuthUser> => {
        try {
            setError(null);
            const result = await signInWithPopup(auth, googleProvider);
            const idToken = await result.user.getIdToken();

            const { data } = await authApi.post<{ data: AuthResponse }>('/auth/google', {
                idToken
            });
            const { token, user } = data.data;
            // Sign in with Firebase using custom token
            await signInWithCustomToken(auth, token);
            setUser(user);
            return user;
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to sign in with Google');
            setError(error);
            throw error;
        }
    };

    const updateProfile = async (body: UpdateProfileData): Promise<AuthUser> => {
        try {
            setError(null);
            const { data } = await api.put<{ user: AuthUser }>('/auth/profile', body);
            setUser(data.user);
            return data.user;
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to update profile');
            setError(error);
            throw error;
        }
    };

    const signOut = async (): Promise<void> => {
        try {
            await auth.signOut();
            localStorage.removeItem('authToken');
            setUser(null);
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to sign out');
            setError(error);
            throw error;
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        error,
        register,
        signInWithGoogle,
        signInWithEmail,
        signOut,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};