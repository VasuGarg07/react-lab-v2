import { Lock, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { TextInput } from '@react-lab/ui';
import { loginThunk } from './authSlice';
import { useAuthDispatch } from './useRedux';
import type { LoginData } from './auth.types';
import { CONFIG } from '@react-lab/shared';

export function Login() {
    const [loading, setLoading] = useState(false);
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/';

    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
        defaultValues: { username: '', password: '' },
    });

    const onSubmit = async (data: LoginData) => {
        setLoading(true);
        try {
            await (dispatch(loginThunk(data) as any)).unwrap();
            navigate(redirectTo, { replace: true });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        const backendUrl = CONFIG.API_URL;
        const origin = window.location.origin;
        window.location.href = `${backendUrl}/auth/google?origin=${encodeURIComponent(origin)}`;
    };

    return (
        <>
            <h1>Welcome back</h1>
            <p className="auth-sub">Sign in to continue to your account.</p>

            <button type="button" className="auth-btn-google" onClick={handleGoogleLogin}>
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
                </svg>
                Continue with Google
            </button>

            <div className="auth-divider">or</div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="auth-field">
                    <div className="auth-field-head">
                        <label htmlFor="username">Username</label>
                    </div>
                    <TextInput
                        id="username"
                        placeholder="Enter your username"
                        icon={<User size={15} />}
                        error={errors.username?.message}
                        {...register('username', { required: 'Username is required' })}
                    />
                </div>

                <div className="auth-field">
                    <div className="auth-field-head">
                        <label htmlFor="password">Password</label>
                        <Link to="/auth/forgot-password">Forgot password?</Link>
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        icon={<Lock size={15} />}
                        showPasswordToggle
                        error={errors.password?.message}
                        {...register('password', { required: 'Password is required' })}
                    />
                </div>

                <button type="submit" disabled={loading} className="auth-btn-primary">
                    {loading ? 'Signing in…' : 'Sign in'}
                </button>
            </form>

            <p className="auth-signup">
                Don't have an account? <Link to="/auth/register">Sign up</Link>
            </p>
        </>
    );
}
