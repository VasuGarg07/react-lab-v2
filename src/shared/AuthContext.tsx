// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase-config';
import { onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

interface AuthContextType {
    user: User | null;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

interface AuthProviderProps {
    children: React.ReactNode
}

const provider = new GoogleAuthProvider();

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            console.log(result.user, token);
            setUser(result.user);
        } catch (error) {
            console.error(error);
        }
    };

    const signOut = async () => {
        try {
            await auth.signOut();
            console.log("Logged out successfully!");
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
