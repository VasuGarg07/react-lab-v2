import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/auth/AuthProvider';
import { LoginData } from '@/auth/auth.types';
import { useForm } from 'react-hook-form';
import * as Label from '@radix-ui/react-label';
import LoadingButton from '@/ui/LoadingButton';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    // Set up react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
        defaultValues: { username: '', password: '' }
    });

    // Form submission handler
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
        <motion.div
            className="w-full max-w-md mx-auto bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
            <div className="p-5 sm:p-6 space-y-4">
                <div className="mb-2">
                    <h1 className="text-xl font-semibold text-neutral-900 dark:text-white mb-1">
                        Welcome Back
                    </h1>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Sign in to continue to your account
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Username/Email Field */}
                    <div className="h-[76px]">
                        <Label.Root className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Username or Email
                        </Label.Root>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User size={18} className="text-neutral-400" />
                            </div>
                            <input
                                {...register("username", { required: "Username is required" })}
                                type="text"
                                placeholder="Enter username or email"
                                className={`w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border transition-all 
                                ${errors.username
                                        ? "border-red-500 ring-1 ring-red-500/30"
                                        : "border-neutral-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                                    }`}
                            />
                        </div>
                        <p className="h-5 text-xs text-red-500 mt-1">
                            {errors.username?.message}
                        </p>
                    </div>

                    {/* Password Field */}
                    <div className="h-[76px]">
                        <div className="flex justify-between items-center mb-2">
                            <Label.Root className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                Password
                            </Label.Root>
                            <Link
                                to="/auth/forgot-password"
                                className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock size={18} className="text-neutral-400" />
                            </div>
                            <input
                                {...register("password", { required: "Password is required" })}
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border transition-all 
                                ${errors.password
                                        ? "border-red-500 ring-1 ring-red-500/30"
                                        : "border-neutral-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        <p className="h-5 text-xs text-red-500 mt-1">
                            {errors.password?.message}
                        </p>
                    </div>

                    {/* Submit Button */}
                    <LoadingButton
                        type="submit"
                        isLoading={loading}
                        loadingText="Signing In"
                        variant="primary"
                        fullWidth
                        className="py-2 text-xs shadow-md hover:shadow-lg"
                    >
                        Sign In
                    </LoadingButton>

                    {/* Divider */}
                    <div className="relative flex items-center py-1">
                        <div className="flex-grow border-t border-neutral-300 dark:border-neutral-700"></div>
                        <span className="flex-shrink mx-3 text-[10px] text-neutral-400 dark:text-neutral-500">
                            New to our platform?
                        </span>
                        <div className="flex-grow border-t border-neutral-300 dark:border-neutral-700"></div>
                    </div>

                    {/* Create Account Button */}
                    <Link
                        to="/auth/register"
                        className="w-full block text-center py-2 text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400 
                        bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 
                        rounded-lg transition-colors duration-300 ease-in-out"
                    >
                        Create New Account
                    </Link>
                </form>
            </div>
        </motion.div>
    );
};

export default Login;