import { KeyRound, KeySquare, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { Select, TextInput } from '@react-lab/ui';
import { registerThunk } from './authSlice';
import { useAuthDispatch } from './useRedux';
import type { RegisterData } from './auth.types';

const SECURITY_QUESTIONS = [
    { value: "What was your first pet's name?", label: "What was your first pet's name?" },
    { value: 'What city were you born in?', label: 'What city were you born in?' },
    { value: 'What was your childhood nickname?', label: 'What was your childhood nickname?' },
    { value: "What is your mother's maiden name?", label: "What is your mother's maiden name?" },
    { value: 'What high school did you attend?', label: 'What high school did you attend?' },
];

export function Register() {
    const [loading, setLoading] = useState(false);
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<RegisterData>({
        defaultValues: { username: '', email: '', password: '', confirmPassword: '', securityQuestion: '', securityAnswer: '' },
    });

    const password = watch('password');
    const securityQuestion = watch('securityQuestion');

    const onSubmit = async (data: RegisterData) => {
        setLoading(true);
        try {
            await (dispatch(registerThunk(data) as any)).unwrap();
            navigate('/auth/login');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1>Create account</h1>
            <p className="auth-sub">Fill in the details below to get started.</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="auth-field">
                    <div className="auth-field-head"><label htmlFor="username">Username</label></div>
                    <TextInput id="username" placeholder="Choose a username" icon={<User size={15} />}
                        error={errors.username?.message}
                        {...register('username', { required: 'Username is required' })} />
                </div>

                <div className="auth-field">
                    <div className="auth-field-head"><label htmlFor="email">Email</label></div>
                    <TextInput id="email" type="email" placeholder="Enter your email" icon={<Mail size={15} />}
                        error={errors.email?.message}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' },
                        })} />
                </div>

                <div className="auth-field">
                    <div className="auth-field-head"><label htmlFor="password">Password</label></div>
                    <TextInput id="password" type="password" placeholder="Create a password" icon={<KeyRound size={15} />}
                        showPasswordToggle error={errors.password?.message}
                        {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password must be at least 6 characters' },
                        })} />
                </div>

                <div className="auth-field">
                    <div className="auth-field-head"><label htmlFor="confirmPassword">Confirm Password</label></div>
                    <TextInput id="confirmPassword" type="password" placeholder="Confirm your password" icon={<KeyRound size={15} />}
                        showPasswordToggle error={errors.confirmPassword?.message}
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) => value === password || "Passwords don't match",
                        })} />
                </div>

                <div className="auth-field">
                    <div className="auth-field-head"><label>Security Question</label></div>
                    <Select
                        options={SECURITY_QUESTIONS}
                        value={securityQuestion}
                        onChange={(value) => value && setValue('securityQuestion', value, { shouldValidate: true })}
                        placeholder="Choose a security question"
                        error={errors.securityQuestion?.message}
                        required
                    />
                </div>

                <div className="auth-field">
                    <div className="auth-field-head"><label htmlFor="securityAnswer">Security Answer</label></div>
                    <TextInput id="securityAnswer" placeholder="Your answer" icon={<KeySquare size={15} />}
                        error={errors.securityAnswer?.message}
                        {...register('securityAnswer', { required: 'Security answer is required' })} />
                </div>

                <button type="submit" disabled={loading} className="auth-btn-primary">
                    {loading ? 'Creating account…' : 'Create Account'}
                </button>
            </form>

            <p className="auth-signup">
                Already have an account? <Link to="/auth/login">Sign in</Link>
            </p>
        </>
    );
}
