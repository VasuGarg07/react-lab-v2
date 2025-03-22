import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, X, Zap } from 'lucide-react';
import { BattlePokemon } from '@/apps/Pokeverse/helpers/battle.types';
import { TYPE_COLORS } from '@/apps/Pokeverse/helpers/constant';
import { getOfficialImage } from '@/apps/Pokeverse/helpers/utilities';
import Dialog from '@/ui/Dialog';

interface SwitchPokemonModalProps {
    open: boolean;
    onClose: () => void;
    activePokemonIndex: number;
    team: BattlePokemon[];
    onSwitch: (index: number) => void;
}

export const SwitchPokemonModal: React.FC<SwitchPokemonModalProps> = ({
    open,
    onClose,
    activePokemonIndex,
    team,
    onSwitch
}) => {
    return (
        <Dialog
            isOpen={open}
            onClose={onClose}
            position="center"
            size="xl"
            showCloseButton={false}
            contentClassName="p-0"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6 relative w-full overflow-hidden text-neutral-900 dark:text-neutral-100"
            >
                <div className="flex items-center mb-1">
                    <h3 className="text-xl font-bold flex-1">Choose Pokemon</h3>
                    <button
                        onClick={onClose}
                        className="ml-1 p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="h-px w-full bg-neutral-200 dark:bg-neutral-700 mb-4" />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                    <AnimatePresence mode="popLayout">
                        {team.map((pokemon, index) => (
                            <motion.div
                                key={pokemon.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{
                                    duration: 0.2,
                                    delay: index * 0.05
                                }}
                            >
                                <div
                                    className={`border rounded-md overflow-hidden h-full transition-all duration-300 relative ${pokemon.currentHP <= 0 ? 'opacity-50' : 'opacity-100'
                                        } ${pokemon.currentHP > 0 && index !== activePokemonIndex
                                            ? 'hover:translate-y-[-8px] hover:shadow-md hover:border-blue-500'
                                            : ''
                                        } ${index === activePokemonIndex
                                            ? 'bg-neutral-100 dark:bg-neutral-700'
                                            : 'bg-white dark:bg-neutral-800'
                                        }`}
                                >
                                    <button
                                        disabled={index === activePokemonIndex || pokemon.currentHP <= 0}
                                        onClick={() => onSwitch(index)}
                                        className="flex flex-col w-full h-full p-2 text-left disabled:cursor-not-allowed hover:bg-neutral-50 dark:hover:bg-neutral-700/50 disabled:hover:bg-transparent transition-colors"
                                    >
                                        <div className="relative flex justify-center overflow-hidden rounded-sm">
                                            <img
                                                className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                                                src={getOfficialImage(pokemon.id)}
                                                alt={pokemon.name}
                                            />
                                            {index === activePokemonIndex && (
                                                <div
                                                    className="absolute top-0 right-0 px-2 py-1 bg-yellow-500 text-white text-xs rounded flex items-center gap-1"
                                                >
                                                    <Zap size={14} />
                                                    Active
                                                </div>
                                            )}
                                        </div>

                                        <h4 className="text-lg font-semibold capitalize mt-2">
                                            {pokemon.name}
                                        </h4>

                                        <div className="flex items-center gap-1 mt-1">
                                            {pokemon.types.map(type => (
                                                <span
                                                    key={type}
                                                    className="px-2 py-0.5 text-xs text-white rounded capitalize"
                                                    style={{ backgroundColor: TYPE_COLORS[type] }}
                                                >
                                                    {type}
                                                </span>
                                            ))}
                                            <Heart size={16} className="text-red-500 ml-1" />
                                            <span className={`text-sm ${pokemon.currentHP < pokemon.maxHP * 0.3
                                                ? 'text-red-500 dark:text-red-400'
                                                : ''
                                                }`}>
                                                {pokemon.currentHP}/{pokemon.maxHP}
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>
        </Dialog>
    );
};