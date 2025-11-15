import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from "../../store/useRedux";
import { resetQuiz } from '../../store/quizSlice';

export default function QuizResult() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { name, score, quizConfig } = useAppSelector((state) => state.quiz);

    const totalQuestions = quizConfig?.questions?.length || 10;
    const percentage = Math.round((score / totalQuestions) * 100);

    const getScoreMessage = () => {
        if (percentage >= 90) return "Outstanding! 🏆";
        if (percentage >= 80) return "Excellent! 🌟";
        if (percentage >= 70) return "Great job! 👏";
        if (percentage >= 60) return "Good effort! 👍";
        if (percentage >= 50) return "Not bad! 📚";
        return "Keep trying! 💪";
    };

    const getScoreColor = () => {
        if (percentage >= 80) return "bg-emerald-500 dark:bg-emerald-600";
        if (percentage >= 60) return "bg-amber-500 dark:bg-amber-600";
        return "bg-red-500 dark:bg-red-600";
    };

    const handlePlayAgain = () => {
        dispatch(resetQuiz());
        navigate('/quizzo');
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-4 space-y-4">
            <div className="text-center">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    Quiz Complete!
                </h2>

                <div className="text-base text-neutral-600 dark:text-neutral-400 mb-4">
                    {getScoreMessage()}
                </div>

                <div className={`inline-block ${getScoreColor()} rounded-xl px-6 py-3 shadow-md`}>
                    <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-white mb-1">
                            {score}/{totalQuestions}
                        </div>
                        <div className="text-xs text-white/90 mb-1">
                            Final Score
                        </div>
                        <div className="text-lg font-semibold text-white">
                            {percentage}%
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-xs bg-neutral-200 dark:bg-neutral-700 h-2 rounded-full overflow-hidden">
                <div
                    className={`h-full ${getScoreColor()} transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            <button
                onClick={handlePlayAgain}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-lg shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0"
            >
                {name ? `Try Again, ${name}` : 'Play Again'}
            </button>
        </div>
    );
}