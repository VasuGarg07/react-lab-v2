import { Label } from '@radix-ui/react-label';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Swords, Trophy } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useBattleActions } from '@/apps/Pokeverse/context/BattleSimContext';
import Dark from '/backgrounds/bg-poke-dark.webp';
import Light from '/backgrounds/bg-poke.png';
import { cn } from '@/shared/cn';

export const PlayerSetupScreen: React.FC = () => {
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    const [focusedPlayer, setFocusedPlayer] = useState<1 | 2 | null>(null);
    const { setPlayerName } = useBattleActions();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPlayerName(0, player1Name);
        setPlayerName(1, player2Name);
        navigate('team-selection');
    };

    const bgImage = `url(${window.matchMedia('(prefers-color-scheme: dark)').matches ? Dark : Light})`;

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4"
            style={{ backgroundImage: bgImage }}
        >
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-2xl p-6"
                >
                    <div className="rounded-3xl border border-white/20 backdrop-blur-xl shadow-xl bg-gradient-to-br from-white/70 to-gray-100/80 dark:from-zinc-800/80 dark:to-zinc-900/80 transition-colors">
                        <div className="flex flex-col items-center space-y-8 px-6 py-8 sm:px-10">
                            <div className="flex items-center space-x-3">
                                <motion.div
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{ duration: 1.8, repeat: Infinity }}
                                >
                                    <Trophy size={48} className="text-yellow-500 dark:text-yellow-400" />
                                </motion.div>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600">
                                    Welcome to Battle Sim
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="w-full space-y-6">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="player1"
                                        className={cn(
                                            'block text-sm font-medium transition-colors',
                                            focusedPlayer === 1
                                                ? 'text-blue-600 dark:text-blue-400'
                                                : 'text-gray-600 dark:text-gray-300'
                                        )}
                                    >
                                        Player 1
                                    </Label>
                                    <div className="relative">
                                        <input
                                            id="player1"
                                            type="text"
                                            placeholder="Enter Player 1 Name"
                                            value={player1Name}
                                            onChange={(e) => setPlayer1Name(e.target.value)}
                                            onFocus={() => setFocusedPlayer(1)}
                                            onBlur={() => setFocusedPlayer(null)}
                                            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-zinc-800 px-4 py-3 pr-10 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-transform transform focus:scale-[1.02]"
                                        />
                                        {player1Name && (
                                            <Sparkles
                                                size={18}
                                                className="absolute top-1/2 right-3 -translate-y-1/2 text-blue-500 dark:text-blue-400"
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="text-center text-sm text-gray-500 dark:text-gray-400">VS</div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="player2"
                                        className={cn(
                                            'block text-sm font-medium transition-colors',
                                            focusedPlayer === 2
                                                ? 'text-red-600 dark:text-red-400'
                                                : 'text-gray-600 dark:text-gray-300'
                                        )}
                                    >
                                        Player 2
                                    </Label>
                                    <div className="relative">
                                        <input
                                            id="player2"
                                            type="text"
                                            placeholder="Enter Player 2 Name"
                                            value={player2Name}
                                            onChange={(e) => setPlayer2Name(e.target.value)}
                                            onFocus={() => setFocusedPlayer(2)}
                                            onBlur={() => setFocusedPlayer(null)}
                                            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-zinc-800 px-4 py-3 pr-10 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white transition-transform transform focus:scale-[1.02]"
                                        />
                                        {player2Name && (
                                            <Sparkles
                                                size={18}
                                                className="absolute top-1/2 right-3 -translate-y-1/2 text-red-500 dark:text-red-400"
                                            />
                                        )}
                                    </div>
                                </div>

                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                    <button
                                        type="submit"
                                        disabled={!player1Name || !player2Name}
                                        className={cn(
                                            'w-full rounded-xl px-6 py-3 text-white font-medium flex items-center justify-center gap-2 transition-all',
                                            !player1Name || !player2Name
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 shadow-lg'
                                        )}
                                    >
                                        <Swords className="h-5 w-5" />
                                        Begin Your Journey
                                    </button>
                                </motion.div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
