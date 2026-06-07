import { Monitor, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function MobileBlocker() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-canvas px-6">
            <div className="text-center max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-plum/10 flex items-center justify-center mx-auto mb-6">
                    <Monitor className="w-8 h-8 text-plum" />
                </div>
                <h1 className="font-display text-xl font-bold text-ink mb-2">Larger Screen Required</h1>
                <p className="text-sm text-neutral-500 mb-6">
                    The Form Builder works best on tablets and desktops. Please switch to a larger screen for the best experience.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-100 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />Back to Dashboard
                </button>
            </div>
        </div>
    );
}
