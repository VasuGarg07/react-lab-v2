import { ArrowLeft } from 'lucide-react';
import { Link, Outlet } from 'react-router';

export function AuthWrapper() {
    return (
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
                        <h1 className="text-3xl font-bold text-blue-500 group-hover:opacity-80 transition-opacity">
                            React Lab
                        </h1>
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
}
