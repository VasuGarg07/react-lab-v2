import React from 'react';
import { motion } from 'framer-motion';
import { Home, RotateCcw, Trophy } from 'lucide-react';
import Dialog from '@/ui/Dialog';

interface GameOverModalProps {
    open: boolean;
    winner: string;
    onRestart?: () => void;
    onReturnHome: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
    open,
    winner,
    onRestart,
    onReturnHome
}) => {
    return (
        <Dialog
            open={open}
            onClose={(_) => { }}
            size="lg"
            showCloseButton={false}
            className="p-0 overflow-hidden w-md mx-auto"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    type: "spring",
                    duration: 0.5
                }}
                className="flex flex-col"
            >
                {/* Top celebration banner */}
                <div
                    className="bg-gradient-to-br from-yellow-400 to-orange-400 p-6 relative overflow-hidden flex flex-col items-center gap-1"
                >
                    <motion.div
                        initial={{ rotate: -180, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{
                            type: "spring",
                            delay: 0.2,
                            duration: 0.7
                        }}
                    >
                        <Trophy size={40} className="text-white" />
                    </motion.div>

                    <h2 className="text-2xl font-extrabold text-white drop-shadow-md">
                        Game Over!
                    </h2>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h4 className="text-xl font-semibold text-white drop-shadow">
                            {winner === 'Draw' ? "It's a draw!" : `${winner} wins!`}
                        </h4>
                    </motion.div>

                    {/* Celebration Pikachu */}
                    <motion.img
                        src="/game-won.png"
                        alt="Celebrating Pikachu"
                        className="w-[140px] h-[140px] mt-2 drop-shadow-lg"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            type: "spring",
                            delay: 0.4,
                            duration: 0.6
                        }}
                    />

                    {/* Decorative circles in background */}
                    <div className="absolute inset-0 overflow-hidden z-0 opacity-10">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full bg-white w-[100px] h-[100px]"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.8 }}
                                transition={{
                                    delay: i * 0.1,
                                    duration: 0.5
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Action buttons */}
                <div className="p-6 bg-white dark:bg-neutral-800">
                    <div className="flex flex-col gap-3">
                        {onRestart && (
                            <button
                                onClick={onRestart}
                                className="flex items-center justify-center gap-3 px-4 py-3 border-2 border-neutral-300 dark:border-neutral-600 text-neutral-800 dark:text-neutral-200 rounded-lg font-medium transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600"
                            >
                                <RotateCcw size={20} />
                                Play Again
                            </button>
                        )}
                        <button
                            onClick={onReturnHome}
                            className="flex items-center justify-center gap-3 px-4 py-3 bg-amber-500 text-white rounded-lg font-medium transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        >
                            <Home size={20} />
                            Return to Home
                        </button>
                    </div>
                </div>
            </motion.div>
        </Dialog>
    );
};