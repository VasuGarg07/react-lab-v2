import { KeyRound, KeySquare, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/auth/AuthProvider';
import { RegisterData } from '@/auth/auth.types';
import { useForm } from 'react-hook-form';
import { Form as BaseForm } from '@base-ui-components/react/form';
import FormField from './FormField';
import Select from '@/ui/Select';
import LoadingButton from '@/ui/LoadingButton';

const Register = () => {
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirm: false
    });
    const [loading, setLoading] = useState(false);
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();

    const securityQuestions = [
        { value: "What was your first pet's name?", label: "What was your first pet's name?" },
        { value: "What city were you born in?", label: "What city were you born in?" },
        { value: "What was your childhood nickname?", label: "What was your childhood nickname?" },
        { value: "What is your mother's maiden name?", label: "What is your mother's maiden name?" },
        { value: "What high school did you attend?", label: "What high school did you attend?" },
    ];

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

    const password = watch('password');
    const securityQuestion = watch('securityQuestion');

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
        <div className="miw-full max-w-sm p-5 shadow-sm bg-white dark:bg-slate-900 rounded-lg">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    Create Account
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Sign up to get started
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
                        label="Email"
                        controlName="email"
                        type="email"
                        placeholder="Enter email"
                        icon={<Mail size={18} />}
                        error={errors.email?.message}
                        required
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email address"
                            }
                        })}
                    />

                    <FormField
                        label="Password"
                        controlName="password"
                        type="password"
                        placeholder="Create password"
                        icon={<KeyRound size={18} />}
                        error={errors.password?.message}
                        showPasswordToggle
                        showPassword={showPassword.password}
                        onTogglePassword={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
                        required
                        {...register("password", {
                            required: "Password is required",
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
                        placeholder="Confirm password"
                        icon={<KeyRound size={18} />}
                        error={errors.confirmPassword?.message}
                        showPasswordToggle
                        showPassword={showPassword.confirm}
                        onTogglePassword={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                        required
                        {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: value => value === password || "Passwords don't match"
                        })}
                    />

                    <div className="space-y-1">
                        <Select
                            label="Security Question"
                            options={securityQuestions}
                            value={securityQuestion}
                            onValueChange={(value) => value && setValue('securityQuestion', value, { shouldValidate: true })}
                            placeholder="Choose a security question"
                            error={errors.securityQuestion?.message}
                            required
                        />
                    </div>

                    <FormField
                        label="Security Answer"
                        controlName="securityAnswer"
                        type="text"
                        placeholder="Enter your answer"
                        icon={<KeySquare size={18} />}
                        error={errors.securityAnswer?.message}
                        required
                        {...register("securityAnswer", { required: "Security answer is required" })}
                    />

                    <LoadingButton
                        type="submit"
                        isLoading={loading}
                        loadingText="Creating Account"
                        variant="primary"
                        fullWidth
                        className="mt-6"
                    >
                        Create Account
                    </LoadingButton>
                </div>
            </BaseForm>

            {/* Footer */}
            <div className="mt-6 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Already have an account?{' '}
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

export default Register;