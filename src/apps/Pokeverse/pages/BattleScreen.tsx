import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Flag, Sword } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BgCenteredBox } from '@/components/BgCenteredBox';
import { GameOverModal } from '@/apps/Pokeverse/components/GameOverModal';
import PokemonBattleCard from '@/apps/Pokeverse/components/PokemonBattleCard';
import { SwitchPokemonModal } from '@/apps/Pokeverse/components/SwitchPokemonModal';
import { useBattle, useBattleActions } from '@/apps/Pokeverse/context/BattleSimContext';
import { TYPE_COLORS } from '@/apps/Pokeverse/helpers/constant';
import Dark from '/backgrounds/bg-poke-dark.webp';
import Light from '/backgrounds/bg-poke.png';

export const BattleScreen = () => {
    const [showSwitchModal, setShowSwitchModal] = useState(false);
    const { state } = useBattle();
    const { selectMove, switchPokemon, forfeit, endTurn } = useBattleActions();
    const navigate = useNavigate();

    const currentPlayer = state.players[state.currentPlayerTurn];
    const opposingPlayer = state.players[1 - state.currentPlayerTurn];
    const activePokemon = currentPlayer.team[currentPlayer.activePokemon];
    const opposingPokemon = opposingPlayer.team[opposingPlayer.activePokemon];

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const handleMoveSelect = (moveIndex: number) => {
        selectMove(state.currentPlayerTurn, moveIndex);
        endTurn();
    };

    const handleSwitch = (pokemonIndex: number) => {
        switchPokemon(state.currentPlayerTurn, pokemonIndex);
        setShowSwitchModal(false);
        endTurn();
    };

    if (!activePokemon || !opposingPokemon) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <BgCenteredBox bg={isDark ? Dark : Light}>
            <div className="w-full space-y-4 py-4 px-2">
                <div className="flex flex-col gap-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`opponent-${opposingPokemon.id}`}
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ type: 'spring', duration: 0.5 }}
                        >
                            <PokemonBattleCard pokemon={opposingPokemon} isOpponent />
                        </motion.div>

                        <motion.div
                            key={`player-${activePokemon.id}`}
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 100, opacity: 0 }}
                            transition={{ type: 'spring', duration: 0.5 }}
                        >
                            <PokemonBattleCard pokemon={activePokemon} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="rounded-xl border border-gray-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-800/70 p-4 backdrop-blur">
                    <div className="flex gap-4">
                        {/* Move buttons */}
                        <div className="grid grid-cols-2 gap-3 flex-1">
                            {activePokemon.selectedMoves.map((move, index) => (
                                <button
                                    key={move.id}
                                    onClick={() => handleMoveSelect(index)}
                                    disabled={currentPlayer.hasActed || state.phase === 'ENDED'}
                                    className="relative p-3 h-20 rounded-lg border text-white font-bold flex items-center gap-3 transition-all hover:-translate-y-1 disabled:opacity-50"
                                    style={{
                                        background: `linear-gradient(135deg, ${TYPE_COLORS[move.type]}40, ${TYPE_COLORS[move.type]}60)`,
                                        borderColor: `${TYPE_COLORS[move.type]}70`,
                                    }}
                                >
                                    <div className="absolute right-[-15px] top-[-15px] opacity-20">
                                        <Sword size={80} className="move-icon transition-transform" />
                                    </div>
                                    <div className="bg-white/20 rounded-full p-2">
                                        <Sword size={20} />
                                    </div>
                                    <div className="text-left">
                                        <div className="capitalize text-base leading-tight text-white drop-shadow">{move.name}</div>
                                        <div className="text-xs bg-black/30 rounded px-2 py-0.5 mt-1 inline-block text-white font-semibold">
                                            PWR {move.power}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col justify-between w-[110px] gap-2">
                            <button
                                onClick={() => setShowSwitchModal(true)}
                                disabled={state.phase === 'ENDED'}
                                className="h-20 px-2 py-2 border-2 rounded-lg text-sm flex flex-col items-center justify-center font-medium hover:-translate-y-1 transition-all"
                            >
                                <ChevronRight size={22} />
                                Switch
                            </button>
                            <button
                                onClick={() => forfeit(state.currentPlayerTurn)}
                                disabled={state.phase === 'ENDED'}
                                className="h-20 px-2 py-2 rounded-lg text-sm flex flex-col items-center justify-center font-medium bg-red-600 hover:bg-red-700 text-white transition-all"
                            >
                                <Flag size={22} />
                                Forfeit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <SwitchPokemonModal
                open={showSwitchModal}
                onClose={() => setShowSwitchModal(false)}
                activePokemonIndex={currentPlayer.activePokemon}
                team={currentPlayer.team}
                onSwitch={handleSwitch}
            />

            <GameOverModal
                open={state.phase === 'ENDED'}
                winner={state.winner || ''}
                onReturnHome={() => navigate('/pokeverse')}
                onRestart={() => navigate('/pokeverse/battle-sim')}
            />
        </BgCenteredBox>
    );
};
