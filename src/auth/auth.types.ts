// src/types/auth.types.ts
export interface AuthUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    emailVerified: boolean;
    provider?: string;
    phoneNumber?: string | null;
}

export interface AuthResponse {
    token: string;
    user: AuthUser;
}

export interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    error: Error | null;
    register: (email: string, password: string, displayName: string) => Promise<AuthUser>;
    signInWithEmail: (email: string, password: string) => Promise<AuthUser>;
    signInWithGoogle: () => Promise<AuthUser>;
    signOut: () => Promise<void>;
    updateProfile: (data: UpdateProfileData) => Promise<AuthUser>;
}

export interface UpdateProfileData {
    displayName?: string;
    photoURL?: string;
    phoneNumber?: string;
}
