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
        if (pct >= 90) return 'Outstanding performance';
        if (pct >= 80) return 'Excellent work';
        if (pct >= 70) return 'Great job';
        if (pct >= 60) return 'Good effort';
        if (pct >= 50) return 'Not bad';
        return 'Keep practising';
    };

    const getAccent = () => {
        if (pct >= 70) return { bar: 'bg-emerald-500', border: 'border-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' };
        if (pct >= 50) return { bar: 'bg-amber-500',   border: 'border-amber-500',   text: 'text-amber-600 dark:text-amber-400'   };
        return         { bar: 'bg-red-500',             border: 'border-red-500',     text: 'text-red-600 dark:text-red-400'       };
    };

    const accent = getAccent();

    return (
        <div className="flex flex-col items-center gap-5 py-2 w-full">
            <div className={`w-28 h-28 rounded-full border-4 ${accent.border} flex flex-col items-center justify-center bg-violet-50 dark:bg-[#0f0e17]`}>
                <span className={`text-3xl font-bold ${accent.text}`}>{pct}<span className="text-base">%</span></span>
                <span className="text-[10px] text-violet-400 dark:text-[#7c7a96] uppercase tracking-wide">score</span>
            </div>

            <div className="text-center">
                <p className="text-[11px] uppercase tracking-[0.18em] text-violet-400 dark:text-[#7c7a96] mb-1">{getMessage()}</p>
                <p className="text-xl font-bold text-indigo-950 dark:text-violet-100">{score} / {total} correct</p>
            </div>

            <div className="w-full bg-violet-100 dark:bg-[#2d2a3e] h-1.5 rounded-full overflow-hidden">
                <div className={`h-full ${accent.bar} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${pct}%` }} />
            </div>

            <button
                onClick={() => { dispatch({ type: 'RESET' }); navigate('/quizzo'); }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-game-accent hover:bg-violet-600 text-white transition-colors"
            >
                <RotateCcw size={15} />
                {name ? `Play again, ${name}` : 'Play again'}
            </button>
        </div>
    );
}
