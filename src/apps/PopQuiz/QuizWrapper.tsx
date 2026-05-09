import { Outlet } from 'react-router';
import QuizImage from '/quiz.svg';

export default function QuizWrapper() {
    return (
        <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-950">
            {/* Main content card */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-3 md:p-4 w-full max-w-5xl shadow-lg border border-neutral-200 dark:border-neutral-700">
                <h2 className="text-xl md:text-2xl text-center uppercase tracking-wider font-bold text-neutral-900 dark:text-neutral-100">
                    Quizzo
                </h2>

                <div className="relative flex items-center justify-center my-2">
                    <span className="absolute w-full border-t border-neutral-200 dark:border-neutral-700"></span>
                    <span className="relative px-3 py-0.5 text-xs bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400">
                        Test Your Wit, Ace the Trivia!
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row w-full min-h-[380px]">
                    <div className="w-full sm:w-1/2 flex items-center justify-center">
                        <div className="w-full max-w-md">
                            <Outlet />
                        </div>
                    </div>
                    <div className="hidden sm:flex w-1/2 items-center justify-center">
                        <div className="w-full h-full flex items-center justify-center">
                            <img
                                src={QuizImage}
                                alt="Quiz Hero"
                                className="w-full max-w-sm object-contain opacity-90"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}