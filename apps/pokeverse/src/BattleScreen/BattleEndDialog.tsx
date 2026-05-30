import { Trophy, RotateCcw } from 'lucide-react';

interface BattleEndDialogProps {
    winner: string;
    onPlayAgain: () => void;
}

export default function BattleEndDialog({ winner, onPlayAgain }: BattleEndDialogProps) {
    return (
        <div className="py-2">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-6 flex justify-center items-center bg-linear-to-br from-amber-100/50 to-blue-100/50 dark:from-neutral-800/50 dark:to-neutral-900/50 rounded-l-xl">
                    <img src="/pikachu.png" alt="Victory" className="max-w-full h-auto" />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center items-center">
                    <div className="mb-4">
                        <div className="relative">
                            <Trophy size={56} className="text-amber-500 dark:text-amber-400 drop-shadow-lg" />
                            <div className="absolute inset-0 animate-ping opacity-20">
                                <Trophy size={56} className="text-amber-500" />
                            </div>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-neutral-900 dark:text-white text-center mb-4">Victory!</h2>
                    <div className="text-center mb-4 space-y-2">
                        <p className="text-lg text-neutral-700 dark:text-neutral-300">
                            <span className="font-bold text-2xl text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-blue-600 dark:from-amber-400 dark:to-blue-400">
                                {winner}
                            </span>
                        </p>
                        <p className="text-neutral-600 dark:text-neutral-400">has won the battle!</p>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center mb-6">
                        An epic battle comes to an end. Ready for another challenge?
                    </p>
                    <button
                        onClick={onPlayAgain}
                        className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:scale-105"
                    >
                        <RotateCcw size={20} />
                        <span>Play Again</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
