import { Lock, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import { loginThunk } from "../store/authSlice";
import { useAppDispatch } from "../store/useRedux";
import LoadingButton from "../ui/LoadingButton";
import TextInput from "../ui/TextInput";
import type { LoginData } from "./auth.types";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        defaultValues: { username: "", password: "" },
    });

    const onSubmit = async (data: LoginData) => {
        setLoading(true);
        try {
            await dispatch(loginThunk(data)).unwrap();
            navigate(redirectTo, { replace: true });
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
                    Welcome Back
                </h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Sign in to continue to Code Garage
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

                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Password
                        </label>
                        <Link
                            to="/auth/forgot-password"
                            className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400 dark:text-neutral-500 pointer-events-none">
                            <Lock size={18} />
                        </span>
                        <input
                            type="password"
                            placeholder="Enter password"
                            className={`
                                w-full py-2.5 text-sm rounded-lg border transition-all duration-200
                                bg-white dark:bg-neutral-800
                                text-neutral-900 dark:text-neutral-100
                                placeholder:text-neutral-400 dark:placeholder:text-neutral-500
                                focus:outline-none focus:ring-2 focus:ring-offset-0
                                pl-10 pr-3
                                ${errors.password
                                    ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                                    : "border-neutral-300 dark:border-neutral-700 focus:ring-blue-500/20 focus:border-blue-500"
                                }
                            `}
                            {...register("password", { required: "Password is required" })}
                        />
                    </div>
                    {errors.password && (
                        <p className="text-xs text-red-500 flex items-center gap-1 mt-1.5">
                            <span>⚠</span> {errors.password.message}
                        </p>
                    )}
                </div>

                <LoadingButton
                    type="submit"
                    isLoading={loading}
                    loadingText="Signing In..."
                    fullWidth
                    className="mt-6"
                >
                    Sign In
                </LoadingButton>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Don't have an account?{" "}
                    <Link
                        to="/auth/register"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;