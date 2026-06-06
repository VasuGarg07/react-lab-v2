import { KeyRound, KeySquare, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { TextInput } from '@react-lab/ui';
import { changePasswordThunk } from './authSlice';
import { useAuthDispatch } from './useRedux';
import type { ChangePasswordData } from './auth.types';

export function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const dispatch = useAuthDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<ChangePasswordData>({
        defaultValues: { username: '', securityAnswer: '', newPassword: '', confirmPassword: '' },
    });

    const newPassword = watch('newPassword');

    const onSubmit = async (data: ChangePasswordData) => {
        setLoading(true);
        try {
            await (dispatch(changePasswordThunk(data) as any)).unwrap();
            navigate('/auth/login');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1>Reset password</h1>
            <p className="auth-sub">Verify your identity to set a new password.</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="auth-field">
                    <div className="auth-field-head"><label htmlFor="username">Username</label></div>
                    <TextInput id="username" placeholder="Enter your username" icon={<User size={15} />}
                        error={errors.username?.message}
                        {...register('username', { required: 'Username is required' })} />
                </div>

                <div className="auth-field">
                    <div className="auth-field-head"><label htmlFor="securityAnswer">Security Answer</label></div>
                    <TextInput id="securityAnswer" placeholder="Your security answer" icon={<KeySquare size={15} />}
                        error={errors.securityAnswer?.message}
                        {...register('securityAnswer', { required: 'Security answer is required' })} />
                </div>

                <div className="auth-field">
                    <div className="auth-field-head"><label htmlFor="newPassword">New Password</label></div>
                    <TextInput id="newPassword" type="password" placeholder="Enter new password" icon={<KeyRound size={15} />}
                        showPasswordToggle error={errors.newPassword?.message}
                        {...register('newPassword', {
                            required: 'New password is required',
                            minLength: { value: 6, message: 'Password must be at least 6 characters' },
                        })} />
                </div>

                <div className="auth-field">
                    <div className="auth-field-head"><label htmlFor="confirmPassword">Confirm Password</label></div>
                    <TextInput id="confirmPassword" type="password" placeholder="Confirm new password" icon={<KeyRound size={15} />}
                        showPasswordToggle error={errors.confirmPassword?.message}
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) => value === newPassword || "Passwords don't match",
                        })} />
                </div>

                <button type="submit" disabled={loading} className="auth-btn-primary">
                    {loading ? 'Resetting password…' : 'Reset Password'}
                </button>
            </form>

            <p className="auth-signup">
                Remember your password? <Link to="/auth/login">Sign in</Link>
            </p>
        </>
    );
}
