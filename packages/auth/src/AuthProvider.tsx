import { type ReactNode, useEffect } from 'react';
import { useAuthDispatch } from './useRedux';
import { forceLogout, initializeAuthThunk } from './authSlice';

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const dispatch = useAuthDispatch();

    useEffect(() => {
        dispatch(initializeAuthThunk() as any);

        const handleForcedLogout = () => {
            dispatch(forceLogout());
        };
        window.addEventListener('auth:logout', handleForcedLogout);

        return () => {
            window.removeEventListener('auth:logout', handleForcedLogout);
        };
    }, [dispatch]);

    return <>{children}</>;
}
