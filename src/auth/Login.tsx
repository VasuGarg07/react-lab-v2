import { Lock, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/auth/AuthProvider';
import { LoginData } from '@/auth/auth.types';
import { useForm } from 'react-hook-form';
import { Form as BaseForm } from '@base-ui-components/react/form';
import FormField from './FormField';
import LoadingButton from '@/ui/LoadingButton';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
        defaultValues: { username: '', password: '' }
    });

    const onSubmit = async (data: LoginData) => {
        setLoading(true);
        try {
            await login(data);
            navigate('/');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm p-5 shadow-sm bg-white dark:bg-slate-900 rounded-lg">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    Welcome Back
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Sign in to your account
                </p>
            </div>

            {/* Form */}
            <BaseForm onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <FormField
                        label="Username"
                        controlName="username"
                        type="text"
                        placeholder="Enter username"
                        icon={<User size={18} />}
                        error={errors.username?.message}
                        required
                        {...register("username", { required: "Username is required" })}
                    />

                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Password
                            </span>
                            <Link
                                to="/auth/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Forgot?
                            </Link>
                        </div>
                        <FormField
                            label=""
                            controlName="password"
                            type="password"
                            placeholder="Enter password"
                            icon={<Lock size={18} />}
                            error={errors.password?.message}
                            showPasswordToggle
                            showPassword={showPassword}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                            required
                            {...register("password", { required: "Password is required" })}
                        />
                    </div>

                    <LoadingButton
                        type="submit"
                        isLoading={loading}
                        loadingText="Signing In"
                        variant="primary"
                        fullWidth
                        className="mt-6"
                    >
                        Sign In
                    </LoadingButton>
                </div>
            </BaseForm>

            {/* Footer */}
            <div className="mt-6 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Don't have an account?{' '}
                    <Link
                        to="/auth/register"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;