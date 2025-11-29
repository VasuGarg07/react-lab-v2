import { Link, Outlet } from 'react-router';

const AuthWrapper = () => (
    <div className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center p-4">
        {/* Content */}
        <div className="w-full max-w-md">
            {/* Card */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                {/* Accent border top */}
                <div className="h-2 bg-linear-to-r from-blue-600 to-violet-500" />

                <Outlet />
            </div>

            {/* Branding */}
            <div className="mt-6 text-center">
                <Link
                    to="/"
                    className="text-sm hover:underline text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors duration-200"
                >
                    React Lab • © {new Date().getFullYear()}
                </Link>
            </div>
        </div>
    </div>
);

export default AuthWrapper;