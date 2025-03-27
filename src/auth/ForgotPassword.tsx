import { motion } from 'framer-motion';
import { Eye, EyeOff, KeyRound, KeySquare, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { navigate } from '@/shared/Router';
import { useAuth } from '@/auth/AuthProvider';
import { ChangePasswordData } from '@/auth/auth.types';
import { useForm } from 'react-hook-form';
import * as Label from '@radix-ui/react-label';
import LoadingButton from '@/ui/LoadingButton';

const ForgotPassword = () => {
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirm: false
    });

    const { changePassword } = useAuth();
    const [loading, setLoading] = useState(false);

    // Set up react-hook-form
    const { register, handleSubmit, watch, formState: { errors } } = useForm<ChangePasswordData>({
        defaultValues: {
            username: '',
            securityAnswer: '',
            newPassword: '',
            confirmPassword: '',
        }
    });

    // Watch password for confirmation validation
    const newPassword = watch('newPassword');

    // Form submission handler
    const onSubmit = async (data: ChangePasswordData) => {
        setLoading(true);
        try {
            await changePassword(data);
            navigate('/auth/login');
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
                        Reset Password
                    </h1>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Enter your details to reset your password
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
                                {...register("username", { required: "Username or email is required" })}
                                type="text"
                                placeholder="Enter username or email"
                                className={`w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border transition-all dark:text-white 
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

                    {/* Security Answer Field */}
                    <div className="h-[76px]">
                        <Label.Root className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Security Answer
                        </Label.Root>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <KeySquare size={18} className="text-neutral-400" />
                            </div>
                            <input
                                {...register("securityAnswer", { required: "Security answer is required" })}
                                type="text"
                                placeholder="Enter security answer"
                                className={`w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border transition-all dark:text-white 
                                ${errors.securityAnswer
                                        ? "border-red-500 ring-1 ring-red-500/30"
                                        : "border-neutral-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                                    }`}
                            />
                        </div>
                        <p className="h-5 text-xs text-red-500 mt-1">
                            {errors.securityAnswer?.message}
                        </p>
                    </div>

                    {/* New Password Field */}
                    <div className="h-[76px]">
                        <Label.Root className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            New Password
                        </Label.Root>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <KeyRound size={18} className="text-neutral-400" />
                            </div>
                            <input
                                {...register("newPassword", {
                                    required: "New password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                                type={showPassword.password ? "text" : "password"}
                                placeholder="Enter new password"
                                className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border transition-all dark:text-white 
                                ${errors.newPassword
                                        ? "border-red-500 ring-1 ring-red-500/30"
                                        : "border-neutral-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                                aria-label={showPassword.password ? "Hide password" : "Show password"}
                            >
                                {showPassword.password ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        <p className="h-5 text-xs text-red-500 mt-1">
                            {errors.newPassword?.message}
                        </p>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="h-[76px]">
                        <Label.Root className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Confirm Password
                        </Label.Root>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <KeyRound size={18} className="text-neutral-400" />
                            </div>
                            <input
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: value => value === newPassword || "Passwords don't match"
                                })}
                                type={showPassword.confirm ? "text" : "password"}
                                placeholder="Confirm new password"
                                className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border transition-all dark:text-white 
                                ${errors.confirmPassword
                                        ? "border-red-500 ring-1 ring-red-500/30"
                                        : "border-neutral-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
                                aria-label={showPassword.confirm ? "Hide password" : "Show password"}
                            >
                                {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        <p className="h-5 text-xs text-red-500 mt-1">
                            {errors.confirmPassword?.message}
                        </p>
                    </div>

                    {/* Submit Button */}
                    <LoadingButton
                        type="submit"
                        isLoading={loading}
                        loadingText="Resetting Password"
                        variant="primary"
                        fullWidth
                        className="py-2 text-xs shadow-md hover:shadow-lg"
                    >
                        Reset Password
                    </LoadingButton>

                    {/* Divider */}
                    <div className="relative flex items-center py-1">
                        <div className="flex-grow border-t border-neutral-300 dark:border-neutral-700"></div>
                        <span className="flex-shrink mx-3 text-[10px] text-neutral-400 dark:text-neutral-500">
                            Remember your password?
                        </span>
                        <div className="flex-grow border-t border-neutral-300 dark:border-neutral-700"></div>
                    </div>

                    {/* Back to Sign In Button */}
                    <Link
                        to="/auth/login"
                        className="w-full block text-center py-2 text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400 
                        bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 
                        rounded-lg transition-colors duration-300 ease-in-out"
                    >
                        Back to Sign In
                    </Link>
                </form>
            </div>
        </motion.div>
    );
};

export default ForgotPassword;