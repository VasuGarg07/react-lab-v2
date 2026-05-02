import { ArrowLeft } from 'lucide-react';
import { Link, Outlet } from 'react-router';

const AuthWrapper = () => (
    <div className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-900 flex flex-col p-4">
        <div className="w-full max-w-7xl mx-auto">
            <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors duration-200"
            >
                <ArrowLeft size={16} />
                Back to apps
            </Link>
        </div>

        <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md">
                <Link to="/" className="block text-center mb-6 group">
                    <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                        CODE GARAGE
                    </h1>
                    <div className="h-1 w-32 mx-auto mt-2 bg-linear-to-r from-blue-600 to-violet-500 rounded-full" />
                </Link>

                <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                    <Outlet />
                </div>

                <p className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
                    © {new Date().getFullYear()} • Vasu Garg
                </p>
            </div>
        </div>
    </div>
);

export default AuthWrapper;