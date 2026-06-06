import { RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useQuiz } from './QuizContext';

export default function QuizResult() {
    const navigate = useNavigate();
    const { state, dispatch } = useQuiz();
    const { name, score, quizConfig } = state;

    const total = quizConfig?.questions?.length || 10;
    const pct = Math.round((score / total) * 100);

    const getMessage = () => {
        if (pct >= 90) return 'Outstanding';
        if (pct >= 80) return 'Excellent';
        if (pct >= 70) return 'Well done';
        if (pct >= 60) return 'Good effort';
        if (pct >= 50) return 'Not bad';
        return 'Keep practising';
    };

    const scoreColor = pct >= 70 ? 'text-cerulean' : pct >= 50 ? 'text-sky' : 'text-deep/40';
    const barColor   = pct >= 70 ? 'bg-cerulean'   : pct >= 50 ? 'bg-sky'   : 'bg-frost';

    return (
        <div className="flex flex-col gap-6 w-full">

            {/* Score — typographic, not circular */}
            <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-cerulean/60 mb-2">
                    {name ? `${name}'s result` : 'Your result'}
                </p>
                <div className="flex items-baseline gap-3">
                    <span className={`text-7xl font-bold tabular-nums leading-none ${scoreColor}`}>
                        {pct}
                    </span>
                    <span className="text-2xl font-light text-deep/30">%</span>
                </div>
                <p className="text-base font-semibold text-deep mt-1">{getMessage()}</p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-mist h-1 rounded-full overflow-hidden">
                <div
                    className={`h-full ${barColor} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${pct}%` }}
                />
            </div>

            {/* Score breakdown */}
            <div className="flex items-center justify-between border-t border-frost/40 pt-4">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-deep/40 mb-0.5">Correct</p>
                    <p className="text-xl font-bold text-deep tabular-nums">{score} / {total}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-deep/40 mb-0.5">Difficulty</p>
                    <p className="text-sm font-semibold text-deep capitalize">{quizConfig?.difficulty ?? '—'}</p>
                </div>
            </div>

            <button
                onClick={() => { dispatch({ type: 'RESET' }); navigate('/'); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold bg-cerulean hover:bg-deep text-white transition-colors"
            >
                <RotateCcw size={14} />
                Play again
            </button>
        </div>
    );
}
