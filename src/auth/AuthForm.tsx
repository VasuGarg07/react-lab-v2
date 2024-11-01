import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, FormControl, FormLabel, Input, Button, Stack, Divider, Alert, Typography, Link, useColorScheme, IconButton } from '@mui/joy';
import { Mail, Lock, Loader2, LogIn, UserPlus, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from './AuthContext';
import GoogleIcon from '/google-icon-logo.svg';

const AuthForm = () => {
    const navigate = useNavigate();
    const { signInWithGoogle, signInWithEmail, register } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLogin, setIsLogin] = useState(true);
    const { mode } = useColorScheme();

    const [passwordType, setPasswordType] = useState<"text" | "password">("text");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            if (isLogin) {
                await signInWithEmail(email, password);
            } else {
                const displayName = formData.get('displayName') as string;
                await register(email, password, displayName);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : `Failed to ${isLogin ? 'sign in' : 'register'}`);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        setLoading(true);
        setError(null);

        try {
            await signInWithGoogle();
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to authenticate with Google');
        } finally {
            setLoading(false);
        }
    };

    const toggleVisibility = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
        } else {
            setPasswordType('password');
        }
    }

    return (
        <Sheet
            sx={{
                minHeight: 'calc(100vh - 56px)',
                background: mode === 'light'
                    ? 'linear-gradient(45deg, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)'
                    : 'linear-gradient(45deg, #2c3e50 0%, #1a2a3d 99%, #1a2a3d 100%)',
                p: 4,
            }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    maxWidth: 400,
                    mx: 'auto',
                    p: 3,
                    borderRadius: 'lg',
                    boxShadow: 'md'
                }}
            >
                <Typography
                    level="h4"
                    component="h1"
                    sx={{ mb: 2, textAlign: 'center' }}
                >
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </Typography>

                {error && (
                    <Alert color="danger" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        {!isLogin && (
                            <FormControl required>
                                <FormLabel>Full Name</FormLabel>
                                <Input
                                    name="displayName"
                                    placeholder="John Doe"
                                    startDecorator={<User size={18} />}
                                />
                            </FormControl>
                        )}

                        <FormControl required>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                startDecorator={<Mail size={18} />}
                            />
                        </FormControl>

                        <FormControl required>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type={passwordType}
                                name="password"
                                placeholder="••••••••"
                                startDecorator={<Lock size={18} />}
                                endDecorator={
                                    <IconButton onClick={toggleVisibility}>
                                        {passwordType === 'password' ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </IconButton>
                                }
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            loading={loading}
                            loadingPosition="start"
                            startDecorator={loading ?
                                <Loader2 size={18} /> :
                                isLogin ? <LogIn size={18} /> : <UserPlus size={18} />
                            }
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </Button>
                    </Stack>
                </form>

                <Divider sx={{ my: 2 }}>or</Divider>

                <Button
                    variant="outlined"
                    color="neutral"
                    fullWidth
                    loading={loading}
                    onClick={handleGoogleAuth}
                    startDecorator={<img src={GoogleIcon} alt="Google" width={20} height={20} />}
                >
                    Continue with Google
                </Button>

                <Typography
                    level="body-sm"
                    sx={{
                        mt: 2,
                        textAlign: 'center',
                        display: 'flex',
                        gap: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <Link
                        component="button"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError(null);
                        }}
                        fontWeight="lg"
                    >
                        {isLogin ? 'Sign up' : 'Sign in'}
                    </Link>
                </Typography>
            </Sheet>
        </Sheet>
    );
};

export default AuthForm;