import { motion } from 'framer-motion';
import { Outlet } from 'react-router';

const AuthWrapper = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative min-h-[calc(100vh-54px)] w-full max-w-md mx-auto p-6 flex flex-col items-center justify-center"
        >
            <div className="overflow-hidden bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] rounded-3xl border border-white/50 dark:border-neutral-800/50">
                <Outlet />
            </div>

            {/* Branding element at bottom */}
            <div className="mt-6 text-center">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    React Lab • {new Date().getFullYear()}
                </p>
            </div>
        </motion.div>
    );
};

export default AuthWrapper;