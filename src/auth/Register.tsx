import { KeyRound, KeySquare, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { registerThunk } from "../store/authSlice";
import { useAppDispatch } from "../store/useRedux";
import LoadingButton from "../ui/LoadingButton";
import Select from "../ui/Select";
import TextInput from "../ui/TextInput";
import type { RegisterData } from "./auth.types";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const securityQuestions = [
        { value: "What was your first pet's name?", label: "What was your first pet's name?" },
        { value: "What city were you born in?", label: "What city were you born in?" },
        { value: "What was your childhood nickname?", label: "What was your childhood nickname?" },
        { value: "What is your mother's maiden name?", label: "What is your mother's maiden name?" },
        { value: "What high school did you attend?", label: "What high school did you attend?" },
    ];

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<RegisterData>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            securityQuestion: "",
            securityAnswer: "",
        },
    });

    const password = watch("password");
    const securityQuestion = watch("securityQuestion");

    const onSubmit = async (data: RegisterData) => {
        setLoading(true);
        try {
            await dispatch(registerThunk(data)).unwrap();
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
                    Create Account
                </h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Sign up to join Code Garage
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
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    icon={<Mail size={18} />}
                    error={errors.email?.message}
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email address",
                        },
                    })}
                />

                <TextInput
                    label="Password"
                    type="password"
                    placeholder="Create password"
                    icon={<KeyRound size={18} />}
                    error={errors.password?.message}
                    showPasswordToggle
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                />

                <TextInput
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm password"
                    icon={<KeyRound size={18} />}
                    error={errors.confirmPassword?.message}
                    showPasswordToggle
                    {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                            value === password || "Passwords don't match",
                    })}
                />

                <Select
                    label="Security Question"
                    options={securityQuestions}
                    value={securityQuestion}
                    onChange={(value) =>
                        value &&
                        setValue("securityQuestion", value, { shouldValidate: true })
                    }
                    placeholder="Choose a security question"
                    error={errors.securityQuestion?.message}
                    required
                />

                <TextInput
                    label="Security Answer"
                    placeholder="Enter your answer"
                    icon={<KeySquare size={18} />}
                    error={errors.securityAnswer?.message}
                    {...register("securityAnswer", {
                        required: "Security answer is required",
                    })}
                />

                <LoadingButton
                    type="submit"
                    isLoading={loading}
                    loadingText="Creating Account..."
                    fullWidth
                    className="mt-6"
                >
                    Create Account
                </LoadingButton>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Already have an account?{" "}
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

export default Register;