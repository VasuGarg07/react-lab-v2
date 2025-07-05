import { KeyRound, KeySquare, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { navigate } from '@/shared/Router';
import { useAuth } from '@/auth/AuthProvider';
import { ChangePasswordData } from '@/auth/auth.types';
import { useForm } from 'react-hook-form';
import { Form as BaseForm } from '@base-ui-components/react/form';
import FormField from './FormField';
import LoadingButton from '@/ui/LoadingButton';

const ForgotPassword = () => {
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirm: false
    });
    const [loading, setLoading] = useState(false);
    const { changePassword } = useAuth();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<ChangePasswordData>({
        defaultValues: {
            username: '',
            securityAnswer: '',
            newPassword: '',
            confirmPassword: '',
        }
    });

    const newPassword = watch('newPassword');

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
        <div className="w-full max-w-sm p-5 shadow-sm bg-white dark:bg-slate-900 rounded-lg">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    Reset Password
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Enter your details to reset password
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

                    <FormField
                        label="Security Answer"
                        controlName="securityAnswer"
                        type="text"
                        placeholder="Enter security answer"
                        icon={<KeySquare size={18} />}
                        error={errors.securityAnswer?.message}
                        required
                        {...register("securityAnswer", { required: "Security answer is required" })}
                    />

                    <FormField
                        label="New Password"
                        controlName="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        icon={<KeyRound size={18} />}
                        error={errors.newPassword?.message}
                        showPasswordToggle
                        showPassword={showPassword.password}
                        onTogglePassword={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
                        required
                        {...register("newPassword", {
                            required: "New password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                    />

                    <FormField
                        label="Confirm Password"
                        controlName="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        icon={<KeyRound size={18} />}
                        error={errors.confirmPassword?.message}
                        showPasswordToggle
                        showPassword={showPassword.confirm}
                        onTogglePassword={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                        required
                        {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: value => value === newPassword || "Passwords don't match"
                        })}
                    />

                    <LoadingButton
                        type="submit"
                        isLoading={loading}
                        loadingText="Resetting Password"
                        variant="primary"
                        fullWidth
                        className="mt-6"
                    >
                        Reset Password
                    </LoadingButton>
                </div>
            </BaseForm>

            {/* Footer */}
            <div className="mt-6 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Remember your password?{' '}
                    <Link
                        to="/auth/login"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;