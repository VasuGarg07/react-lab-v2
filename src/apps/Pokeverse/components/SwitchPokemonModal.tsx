import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, X, Zap } from 'lucide-react';
import { BattlePokemon } from '@/apps/Pokeverse/helpers/battle.types';
import { TYPE_COLORS } from '@/apps/Pokeverse/helpers/constant';
import { getOfficialImage } from '@/apps/Pokeverse/helpers/utilities';

interface SwitchPokemonModalProps {
    open: boolean;
    onClose: () => void;
    activePokemonIndex: number;
    team: BattlePokemon[];
    onSwitch: (index: number) => void;
}

export const SwitchPokemonModal = ({
    open,
    onClose,
    activePokemonIndex,
    team,
    onSwitch,
}: SwitchPokemonModalProps) => {
    return (
        <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />

                <Dialog.Content asChild>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center"
                    >
                        <div className="bg-white dark:bg-zinc-900 rounded-lg max-w-6xl w-[calc(100%-64px)] p-6 relative shadow-xl">
                            {/* Header */}
                            <div className="flex items-center mb-4">
                                <Dialog.Title className="text-xl font-bold flex-1 text-gray-800 dark:text-gray-100">
                                    Choose Pokémon
                                </Dialog.Title>
                                <Dialog.Close asChild>
                                    <button
                                        className="ml-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
                                        aria-label="Close"
                                    >
                                        <X />
                                    </button>
                                </Dialog.Close>
                            </div>

                            <div className="border-b border-gray-300 dark:border-zinc-700 mb-4" />

                            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <AnimatePresence mode="popLayout">
                                    {team.map((pokemon, index) => (
                                        <motion.div
                                            key={pokemon.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.2, delay: index * 0.05 }}
                                            className={
                                                pokemon.currentHP <= 0 ? 'opacity-50' : 'hover:-translate-y-2 transition-transform'
                                            }
                                        >
                                            <button
                                                onClick={() => onSwitch(index)}
                                                disabled={index === activePokemonIndex || pokemon.currentHP <= 0}
                                                className={`w-full h-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl p-3 flex flex-col items-center transition-all duration-300 ${index === activePokemonIndex ? 'bg-zinc-200 dark:bg-zinc-700' : ''
                                                    }`}
                                            >
                                                {/* Image & Status */}
                                                <div className="relative w-full flex justify-center mb-2">
                                                    <img
                                                        src={getOfficialImage(pokemon.id)}
                                                        alt={pokemon.name}
                                                        className="object-contain w-28 h-28 transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    {index === activePokemonIndex && (
                                                        <div className="absolute top-1 right-1 bg-yellow-400 text-white text-xs px-2 py-0.5 rounded shadow flex items-center gap-1">
                                                            <Zap size={14} /> Active
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Name */}
                                                <h4 className="capitalize font-semibold text-gray-800 dark:text-white text-lg mb-1">
                                                    {pokemon.name}
                                                </h4>

                                                {/* Type + HP */}
                                                <div className="flex items-center gap-2 flex-wrap justify-center">
                                                    {pokemon.types.map((type) => (
                                                        <span
                                                            key={type}
                                                            className="text-white text-xs px-2 py-0.5 rounded"
                                                            style={{ backgroundColor: TYPE_COLORS[type] }}
                                                        >
                                                            {type}
                                                        </span>
                                                    ))}
                                                    <Heart size={16} className="text-red-500" />
                                                    <span
                                                        className={`text-sm font-medium ${pokemon.currentHP < pokemon.maxHP * 0.3
                                                            ? 'text-red-600'
                                                            : 'text-gray-800 dark:text-gray-100'
                                                            }`}
                                                    >
                                                        {pokemon.currentHP}/{pokemon.maxHP}
                                                    </span>
                                                </div>
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};