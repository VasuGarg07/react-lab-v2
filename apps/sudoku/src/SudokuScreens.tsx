import { CheckCircle2, X } from 'lucide-react';

export function CompletionBanner() {
    return (
        <div className="w-full border-b py-2.5" style={{ backgroundColor: '#DBF4A7', borderColor: '#c8e890' }}>
            <p className="flex items-center justify-center gap-2 text-sm font-semibold" style={{ color: '#4a5080' }}>
                <CheckCircle2 size={16} />
                Puzzle solved!
            </p>
        </div>
    );
}

export function LoadingScreen() {
    return (
        <div className="min-h-dvh w-full flex items-center justify-center" style={{ backgroundColor: '#F9F9ED' }}>
            <div className="flex flex-col items-center gap-3">
                <div
                    className="w-10 h-10 rounded-full animate-spin"
                    style={{ border: '3px solid #D9DBF1', borderTopColor: '#7D84B2' }}
                />
                <p className="text-sm font-medium" style={{ color: '#8E9DCC' }}>Loading puzzle…</p>
            </div>
        </div>
    );
}

export function ErrorScreen({ message, onRetry }: { message: string; onRetry: () => void }) {
    return (
        <div className="min-h-dvh w-full flex items-center justify-center p-6" style={{ backgroundColor: '#F9F9ED' }}>
            <div className="text-center space-y-4 max-w-sm">
                <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                    style={{ backgroundColor: '#EEEEF8' }}
                >
                    <X size={20} style={{ color: '#7D84B2' }} />
                </div>
                <div>
                    <h2 className="text-base font-bold mb-1" style={{ color: '#4a5080' }}>
                        Couldn't load puzzle
                    </h2>
                    <p className="text-sm" style={{ color: '#8E9DCC' }}>{message}</p>
                </div>
                <button
                    onClick={onRetry}
                    className="px-5 py-2 text-sm font-bold rounded-lg transition focus:outline-none"
                    style={{ backgroundColor: '#DBF4A7', color: '#4a5080', border: '1px solid #c8e890' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#cded95')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#DBF4A7')}
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
