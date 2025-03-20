import { Outlet } from 'react-router';
import { motion } from 'framer-motion';

const AuthWrapper = () => {
    return (
        <div className="relative min-h-[calc(100vh-53px)] flex items-center justify-center overflow-hidden">
            {/* Base background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black z-0" />

            {/* Large colorful decorative elements - much more visible now */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl z-0" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl z-0" />

            {/* Additional decorative elements for visual interest */}
            <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-pink-400/20 dark:bg-pink-600/15 rounded-full blur-3xl z-0" />
            <div className="absolute bottom-1/4 right-1/6 w-60 h-60 bg-indigo-400/20 dark:bg-indigo-600/15 rounded-full blur-3xl z-0" />

            {/* Animated gradient overlay */}
            <motion.div
                className="absolute inset-0 opacity-30 dark:opacity-40 z-0"
                style={{
                    background: 'linear-gradient(120deg, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(236, 72, 153, 0.3) 100%)',
                }}
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: 'reverse',
                }}
            />

            {/* Content container with Apple-style design */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="relative z-10 w-full max-w-md mx-auto p-6"
            >
                <div className="overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] rounded-3xl border border-white/50 dark:border-gray-800/50">
                    <Outlet />
                </div>

                {/* Branding element at bottom */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        React Lab • {new Date().getFullYear()}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthWrapper;