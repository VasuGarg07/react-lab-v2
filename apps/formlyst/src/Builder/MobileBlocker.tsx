import { Monitor, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function MobileBlocker() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-6">
            <div className="text-center max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-6">
                    <Monitor className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Larger Screen Required</h1>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                    The Form Builder works best on tablets and desktops. Please switch to a larger screen for the best experience.
                </p>
                <button
                    onClick={() => navigate('/formlyst')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />Back to Dashboard
                </button>
            </div>
        </div>
    );
}
