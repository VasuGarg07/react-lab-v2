import { Trophy, RotateCcw } from 'lucide-react';

interface BattleEndDialogProps {
    winner: string;
    onPlayAgain: () => void;
}

export default function BattleEndDialog({ winner, onPlayAgain }: BattleEndDialogProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl">
                <div className="bg-linear-to-br from-amber-50 via-white to-blue-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 border-2 border-amber-300 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="flex flex-col md:flex-row">
                        {/* Victory Image */}
                        <div className="md:w-1/2 p-6 flex justify-center items-center bg-linear-to-br from-amber-100/50 to-blue-100/50 dark:from-neutral-800/50 dark:to-neutral-900/50">
                            <img
                                src="/pikachu.png"
                                alt="Victory"
                                className="max-w-full h-auto animate-in zoom-in duration-500"
                            />
                        </div>

                        {/* Content */}
                        <div className="md:w-1/2 p-8 flex flex-col justify-center items-center">
                            {/* Trophy Icon */}
                            <div className="mb-4 animate-in zoom-in duration-700 delay-200">
                                <div className="relative">
                                    <Trophy size={56} className="text-amber-500 dark:text-amber-400 drop-shadow-lg" />
                                    <div className="absolute inset-0 animate-ping opacity-20">
                                        <Trophy size={56} className="text-amber-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white text-center mb-4 animate-in slide-in-from-bottom duration-500 delay-300">
                                Victory!
                            </h2>

                            {/* Winner Info */}
                            <div className="text-center mb-4 space-y-2 animate-in fade-in duration-500 delay-400">
                                <p className="text-lg text-neutral-700 dark:text-neutral-300">
                                    <span className="font-bold text-2xl text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-blue-600 dark:from-amber-400 dark:to-blue-400">
                                        {winner}
                                    </span>
                                </p>
                                <p className="text-neutral-600 dark:text-neutral-400">
                                    has won the battle!
                                </p>
                            </div>

                            {/* Flavor Text */}
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center mb-6 animate-in fade-in duration-500 delay-500">
                                An epic battle comes to an end. Ready for another challenge?
                            </p>

                            {/* Play Again Button */}
                            <button
                                onClick={onPlayAgain}
                                className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 animate-in slide-in-from-bottom delay-600 hover:scale-105"
                            >
                                <RotateCcw size={20} />
                                <span>Play Again</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}