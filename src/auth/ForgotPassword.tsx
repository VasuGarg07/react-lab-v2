import { Button, Card, CardContent, Divider, FormControl, FormLabel, Input, Stack, Typography } from '@mui/joy';
import { motion } from 'framer-motion';
import { Eye, EyeOff, KeyRound, KeySquare, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { navigate } from '@/shared/Router';
import { useAuth } from '@/auth/AuthProvider';
import { ChangePasswordData } from '@/auth/auth.types';

const ForgotPassword = () => {
    const [formData, setFormData] = useState<ChangePasswordData>({
        username: '',
        securityAnswer: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirm: false
    });

    const { changePassword } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await changePassword(formData);
            navigate('/auth/login');
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
                    Reset Password
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={1}>
                        <FormControl>
                            <FormLabel>Username or Email</FormLabel>
                            <Input
                                startDecorator={<User />}
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
                            <FormLabel>Security Answer</FormLabel>
                            <Input
                                placeholder="Enter answer to the Security Question"
                                startDecorator={<KeySquare size={16} />}
                                required size='sm'
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    securityAnswer: e.target.value
                                }))}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>New Password</FormLabel>
                            <Input
                                startDecorator={<KeyRound size={16} />}
                                endDecorator={
                                    <Button
                                        variant="plain"
                                        color="neutral"
                                        onClick={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
                                        sx={{ minWidth: 'unset', p: 0.5 }}
                                    >
                                        {showPassword.password ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </Button>
                                }
                                type={showPassword.password ? "text" : "password"}
                                required size='sm'
                                placeholder="Create password"
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    newPassword: e.target.value
                                }))}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input
                                startDecorator={<KeyRound size={16} />}
                                endDecorator={
                                    <Button
                                        variant="plain"
                                        color="neutral"
                                        onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                                        sx={{ minWidth: 'unset', p: 0.5 }}
                                    >
                                        {showPassword.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </Button>
                                }
                                type={showPassword.confirm ? "text" : "password"}
                                required size='sm'
                                placeholder="Confirm password"
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    confirmPassword: e.target.value
                                }))}
                            />
                        </FormControl>

                        <Button loading={loading} type="submit" fullWidth size='sm'>
                            Reset Password
                        </Button>

                        <Divider>or</Divider>

                        <Typography
                            level="title-sm"
                            component={Link}
                            to="/auth/login"
                            sx={{ textDecoration: 'none', textAlign: 'center' }}
                        >
                            Back to Sign In
                        </Typography>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    );
};

export default ForgotPassword;
