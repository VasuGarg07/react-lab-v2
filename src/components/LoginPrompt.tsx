import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router';

export interface LoginPromptProps {
    title: string;
    caption: string;
    image: string;
}

const LoginPrompt = ({ title, caption, image }: LoginPromptProps) => {
    const navigate = useNavigate();

    return (
        <div className="relative flex flex-col items-center justify-center p-12 h-[calc(100vh-54px)]">
            <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12 my-auto">
                {/* Left Content */}
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-indigo-500 via-purple-400 to-blue-300 dark:from-indigo-800 dark:via-violet-600 dark:to-pink-400 text-transparent bg-clip-text"
                    >
                        {title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-gray-600 dark:text-gray-300 max-w-md mb-6"
                    >
                        {caption}
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        onClick={() => navigate('/auth/login')}
                        className="px-6 py-3 text-white font-semibold text-lg rounded-xl shadow-sm dark:shadow-lg bg-gradient-to-r from-indigo-500 via-purple-400 to-blue-300 dark:from-indigo-800 dark:via-violet-600 dark:to-pink-400 hover:shadow-xl hover:-translate-y-1 transition"
                    >
                        <div className="flex items-center gap-2">
                            <LogIn size={20} />
                            Log In to Continue
                        </div>
                    </motion.button>
                </div>

                {/* Right Illustration */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex-1"
                >
                    <img
                        src={image}
                        alt="Illustration"
                        className="w-full max-w-md h-auto object-contain"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default LoginPrompt;
