import { KeyRound, KeySquare, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { changePasswordThunk } from "../store/authSlice";
import { useAppDispatch } from "../store/useRedux";
import { LoadingButton, TextInput } from '@react-lab/ui';
import type { ChangePasswordData } from "./auth.types";

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ChangePasswordData>({
        defaultValues: {
            username: "",
            securityAnswer: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const newPassword = watch("newPassword");

    const onSubmit = async (data: ChangePasswordData) => {
        setLoading(true);
        try {
            await dispatch(changePasswordThunk(data)).unwrap();
            navigate("/auth/login");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1.5">
                    Reset Password
                </h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Enter your details to reset your password
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <TextInput
                    label="Username"
                    placeholder="Enter username"
                    icon={<User size={18} />}
                    error={errors.username?.message}
                    {...register("username", { required: "Username is required" })}
                />

                <TextInput
                    label="Security Answer"
                    placeholder="Enter security answer"
                    icon={<KeySquare size={18} />}
                    error={errors.securityAnswer?.message}
                    {...register("securityAnswer", {
                        required: "Security answer is required",
                    })}
                />

                <TextInput
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                    icon={<KeyRound size={18} />}
                    error={errors.newPassword?.message}
                    showPasswordToggle
                    {...register("newPassword", {
                        required: "New password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                />

                <TextInput
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm new password"
                    icon={<KeyRound size={18} />}
                    error={errors.confirmPassword?.message}
                    showPasswordToggle
                    {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                            value === newPassword || "Passwords don't match",
                    })}
                />

                <LoadingButton
                    type="submit"
                    isLoading={loading}
                    loadingText="Resetting Password..."
                    fullWidth
                    className="mt-6"
                >
                    Reset Password
                </LoadingButton>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Remember your password?{" "}
                    <Link
                        to="/auth/login"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;