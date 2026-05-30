import { useDispatch, useSelector } from 'react-redux';
import type { AuthState } from './authSlice';

// These typed hooks work with any store that has `auth: AuthState` in its reducer map.
// Consuming apps pass their own AppDispatch type via the hook, or use these directly
// since dispatch is structurally compatible for auth actions.

export const useAuthSelector = <T>(selector: (state: { auth: AuthState }) => T): T =>
    useSelector(selector);

export const useAuthDispatch = () => useDispatch();
