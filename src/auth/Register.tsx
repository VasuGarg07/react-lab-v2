import { motion } from 'framer-motion';
import { Eye, EyeOff, KeyRound, KeySquare, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/auth/AuthProvider';
import { RegisterData } from '@/auth/auth.types';
import { useForm } from 'react-hook-form';
import * as Label from '@radix-ui/react-label';
import Select from '@/ui/Select';
import LoadingButton from '@/ui/LoadingButton';

const Register = () => {
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirm: false
    });

    const { register: registerUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const securityQuestions = [
        { value: "What was your first pet's name?", label: "What was your first pet's name?" },
        { value: "What city were you born in?", label: "What city were you born in?" },
        { value: "What was your childhood nickname?", label: "What was your childhood nickname?" },
        { value: "What is your mother's maiden name?", label: "What is your mother's maiden name?" },
        { value: "What high school did you attend?", label: "What high school did you attend?" },
    ];

    // Set up react-hook-form
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<RegisterData>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            securityQuestion: '',
            securityAnswer: '',
        }
    });

    // Watch password for confirmation validation
    const password = watch('password');
    const securityQuestion = watch('securityQuestion');

    // Form submission handler
    const onSubmit = async (data: RegisterData) => {
        setLoading(true);
        try {
            await registerUser(data);
            navigate('/auth/login');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="w-full max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
            <div className="p-5 sm:p-6 space-y-4">
                <div className="mb-2">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        Create Account
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Sign up to get started with your new account
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Username Field */}
                    <div className="h-[76px]">
                        <Label.Root className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Username
                        </Label.Root>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User size={18} className="text-gray-400" />
                            </div>
                            <input
                                {...register("username", { required: "Username is required" })}
                                type="text"
                                placeholder="Enter username"
                                className={`w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border transition-all 
                                ${errors.username
                                        ? "border-red-500 ring-1 ring-red-500/30"
                                        : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                                    }`}
                            />
                        </div>
                        <p className="h-5 text-xs text-red-500 mt-1">
                            {errors.username?.message}
                        </p>
                    </div>

                    {/* Email Field */}
                    <div className="h-[76px]">
                        <Label.Root className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email
                        </Label.Root>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail size={18} className="text-gray-400" />
                            </div>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Please enter a valid email"
                                    }
                                })}
                                type="email"
                                placeholder="Enter email address"
                                className={`w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border transition-all 
                                ${errors.email
                                        ? "border-red-500 ring-1 ring-red-500/30"
                                        : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                                    }`}
                            />
                        </div>
                        <p className="h-5 text-xs text-red-500 mt-1">
                            {errors.email?.message}
                        </p>
                    </div>

                    {/* Password Field */}
                    <div className="h-[76px]">
                        <Label.Root className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Password
                        </Label.Root>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <KeyRound size={18} className="text-gray-400" />
                            </div>
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                                type={showPassword.password ? "text" : "password"}
                                placeholder="Create password"
                                className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border transition-all 
                                ${errors.password
                                        ? "border-red-500 ring-1 ring-red-500/30"
                                        : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                aria-label={showPassword.password ? "Hide password" : "Show password"}
                            >
                                {showPassword.password ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        <p className="h-5 text-xs text-red-500 mt-1">
                            {errors.password?.message}
                        </p>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="h-[76px]">
                        <Label.Root className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirm Password
                        </Label.Root>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <KeyRound size={18} className="text-gray-400" />
                            </div>
                            <input
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: value => value === password || "Passwords don't match"
                                })}
                                type={showPassword.confirm ? "text" : "password"}
                                placeholder="Confirm password"
                                className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border transition-all 
                                ${errors.confirmPassword
                                        ? "border-red-500 ring-1 ring-red-500/30"
                                        : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                aria-label={showPassword.confirm ? "Hide password" : "Show password"}
                            >
                                {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        <p className="h-5 text-xs text-red-500 mt-1">
                            {errors.confirmPassword?.message}
                        </p>
                    </div>

                    {/* Security Question Select Field */}
                    <div className="h-[76px]">
                        <Select
                            label="Security Question"
                            options={securityQuestions}
                            value={securityQuestion}
                            onValueChange={(value) => setValue('securityQuestion', value, { shouldValidate: true })}
                            placeholder="Choose a security question"
                            icon={<Lock size={18} className="text-gray-400" />}
                            error={errors.securityQuestion?.message}
                            required
                        />
                    </div>

                    {/* Security Answer Field */}
                    <div className="h-[76px]">
                        <Label.Root className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Security Answer
                        </Label.Root>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <KeySquare size={18} className="text-gray-400" />
                            </div>
                            <input
                                {...register("securityAnswer", { required: "Security answer is required" })}
                                type="text"
                                placeholder="Enter your answer"
                                className={`w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border transition-all 
                                ${errors.securityAnswer
                                        ? "border-red-500 ring-1 ring-red-500/30"
                                        : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                                    }`}
                            />
                        </div>
                        <p className="h-5 text-xs text-red-500 mt-1">
                            {errors.securityAnswer?.message}
                        </p>
                    </div>

                    {/* Submit Button */}
                    <LoadingButton
                        type="submit"
                        isLoading={loading}
                        loadingText="Creating Account"
                        variant="primary"
                        fullWidth
                        className="py-2 text-xs"
                    >
                        Create Account
                    </LoadingButton>

                    {/* Divider */}
                    <div className="relative flex items-center py-1">
                        <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                        <span className="flex-shrink mx-3 text-[10px] text-gray-400 dark:text-gray-500">
                            Already have an account?
                        </span>
                        <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                    </div>

                    {/* Sign In Link Button */}
                    <Link
                        to="/auth/login"
                        className="w-full block text-center py-2 text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-500 dark:hover:text-primary-400 
                        bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 
                        rounded-lg transition-colors duration-300 ease-in-out"
                    >
                        Sign In
                    </Link>
                </form>
            </div>
        </motion.div>
    );
};

export default Register;