import { Button, Card, CardContent, Divider, FormControl, FormLabel, Input, Option, Select, Stack, Typography } from '@mui/joy';
import { motion } from 'framer-motion';
import { Eye, EyeOff, KeyRound, KeySquare, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { RegisterData } from './auth.types';

const Register = () => {
    const [formData, setFormData] = useState<RegisterData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        securityQuestion: '',
        securityAnswer: '',
    });
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirm: false
    });
    const { register } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const securityQuestions = [
        "What was your first pet's name?",
        "What city were you born in?",
        "What was your childhood nickname?",
        "What is your mother's maiden name?",
        "What high school did you attend?",
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(formData);
            navigate('/auth/login');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            sx={{
                mx: 'auto',
                backgroundColor: 'background.surface',
                borderRadius: 'lg',
            }}
        >
            <CardContent>
                <Stack spacing={1}>
                    <Typography
                        level="title-lg"
                        component="h1"
                        sx={{
                            fontWeight: 'lg',
                            textAlign: 'center',
                            fontSize: 'xl'
                        }}
                    >
                        Create Account
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={1}>
                            <FormControl>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    startDecorator={<User size={16} />}
                                    required size='sm'
                                    placeholder="Enter username"
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        username: e.target.value
                                    }))}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    startDecorator={<Mail size={16} />}
                                    type="email"
                                    required size='sm'
                                    placeholder="Enter email address"
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        email: e.target.value
                                    }))}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Password</FormLabel>
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
                                        password: e.target.value
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

                            <FormControl>
                                <FormLabel>Security Question</FormLabel>
                                <Select
                                    startDecorator={<Lock size={16} />}
                                    required size='sm'
                                    placeholder="Choose a security question"
                                    onChange={(_, value) => setFormData(prev => ({
                                        ...prev,
                                        securityQuestion: value as string
                                    }))}
                                >
                                    {securityQuestions.map((question, index) => (
                                        <Option key={index} value={question}>
                                            {question}
                                        </Option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Security Answer</FormLabel>
                                <Input
                                    startDecorator={<KeySquare size={16} />}
                                    required size='sm'
                                    placeholder="Enter your answer"
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        securityAnswer: e.target.value
                                    }))}
                                />
                            </FormControl>

                            <Button loading={loading} type="submit" fullWidth size='sm'>
                                Create Account
                            </Button>

                            <Divider sx={{ my: 1 }}>or</Divider>

                            <Typography
                                level="title-sm"
                                component={Link}
                                to="/auth/login"
                                sx={{ textDecoration: 'none', textAlign: 'center' }}
                            >
                                Already have an account? <Typography color='primary'>Sign In</Typography>
                            </Typography>
                        </Stack>
                    </form>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default Register;