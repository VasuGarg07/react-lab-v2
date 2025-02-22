import { Button, Card, CardContent, Divider, FormControl, FormLabel, Input, Stack, Typography } from '@mui/joy';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from './AuthProvider';
import { LoginData } from './auth.types';

const Login = () => {
    const [formData, setFormData] = useState<LoginData>({
        username: '',
        password: '',
    });
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(formData);
            navigate('/');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card component={motion.div} variant="outlined">
            <CardContent>
                <Typography level="h4" component="h1" sx={{ mb: 2 }}>
                    Welcome Back
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={1}>
                        <FormControl>
                            <FormLabel>Username or Email</FormLabel>
                            <Input
                                startDecorator={<User size={16} />}
                                type='text'
                                placeholder='Enter username or e-mail'
                                required size='sm'
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    username: e.target.value
                                }))}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input
                                startDecorator={<Lock size={16} />}
                                placeholder="••••••••"
                                required size='sm'
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    password: e.target.value
                                }))}
                                endDecorator={
                                    <Button
                                        variant="plain"
                                        color="neutral"
                                        onClick={() => setShowPassword(!showPassword)}
                                        sx={{ minWidth: 'unset', p: 0.5 }}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </Button>
                                }
                                type={showPassword ? "text" : "password"}
                            />
                        </FormControl>

                        <Button loading={loading} size='sm' type="submit" fullWidth>
                            Sign In
                        </Button>

                        <Divider>or</Divider>

                        <Stack direction="row" justifyContent="space-between" spacing={2}>
                            <Link to="/auth/register">
                                <Button size='sm' variant="soft" color='neutral' fullWidth>Create Account</Button>
                            </Link>
                            <Link to="/auth/forgot-password">
                                <Button size='sm' variant="soft" color='neutral' fullWidth>Forgot Password?</Button>
                            </Link>
                        </Stack>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    );
};

export default Login;
