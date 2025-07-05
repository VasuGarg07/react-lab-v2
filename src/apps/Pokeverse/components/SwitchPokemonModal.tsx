import { Dialog as BaseDialog } from '@base-ui-components/react/dialog';
import { Heart, X, Zap, Shield, Swords } from 'lucide-react';
import { cn } from '@/shared/cn';
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
        <BaseDialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <BaseDialog.Portal>
                <BaseDialog.Backdrop className="fixed inset-0 z-40 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

                <BaseDialog.Popup
                    className={cn(
                        // Base positioning and z-index
                        "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",

                        // Size and layout
                        "w-[calc(100vw-32px)] max-w-6xl max-h-[95vh] flex flex-col rounded-2xl border-2",

                        // Pokemon-themed gradient background
                        "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50",
                        "dark:from-slate-900 dark:via-blue-950 dark:to-purple-950",
                        "border-blue-200 dark:border-blue-800",
                        "shadow-2xl shadow-blue-500/20",

                        // Animations
                        "data-[state=open]:animate-in data-[state=closed]:animate-out",
                        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                        "duration-300",

                        // Mobile responsive
                        "mx-4 sm:mx-0"
                    )}
                >
                    {/* Header with Pokemon theme */}
                    <div className="relative p-3 sm:p-4 lg:p-6 border-b-2 border-blue-200 dark:border-blue-800 flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-t-2xl" />
                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <Swords className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <BaseDialog.Title className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Choose Your Pokémon
                                </BaseDialog.Title>
                            </div>
                            <BaseDialog.Close
                                className="rounded-full p-1.5 sm:p-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 hover:text-red-700 transition-all duration-200 hover:scale-110"
                                aria-label="Close"
                            >
                                <X size={20} className="sm:w-6 sm:h-6" />
                            </BaseDialog.Close>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-auto p-2 sm:p-3 lg:p-4 min-h-0">
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {team.map((pokemon, index) => {
                                const isActive = index === activePokemonIndex;
                                const isFainted = pokemon.currentHP <= 0;
                                const isLowHP = pokemon.currentHP < pokemon.maxHP * 0.3;
                                const hpPercentage = (pokemon.currentHP / pokemon.maxHP) * 100;

                                return (
                                    <button
                                        key={pokemon.id}
                                        onClick={() => onSwitch(index)}
                                        disabled={isActive || isFainted}
                                        className={cn(
                                            // Base card styles
                                            "relative group overflow-hidden rounded-xl lg:rounded-2xl border-2 p-2 sm:p2 lg:p-3 transition-all duration-200",
                                            "bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900",

                                            // Interactive states (grouped by condition)
                                            !isActive && !isFainted && [
                                                "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600",
                                                "hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1"
                                            ],

                                            // Active state (grouped)
                                            isActive && [
                                                "border-yellow-400 dark:border-yellow-500",
                                                "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30",
                                                "shadow-xl shadow-yellow-500/30"
                                            ],

                                            // Fainted state
                                            isFainted && "opacity-50 grayscale border-gray-300 dark:border-gray-600 cursor-not-allowed",

                                            // Disabled cursor
                                            (isActive || isFainted) && "cursor-not-allowed"
                                        )}
                                    >
                                        {/* Background pattern */}
                                        <div className="absolute inset-0 opacity-5">
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
                                            <div className="absolute inset-0" style={{
                                                backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                                backgroundSize: '20px 20px'
                                            }} />
                                        </div>

                                        {/* Active Badge */}
                                        {isActive && (
                                            <div className="absolute top-1 right-1 sm:top-2 sm:right-2 lg:top-3 lg:right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-1 shadow-lg animate-pulse">
                                                <Zap size={10} className="sm:w-3 sm:h-3" />
                                                <span className="font-bold hidden sm:inline">ACTIVE</span>
                                            </div>
                                        )}

                                        {/* Fainted Badge */}
                                        {isFainted && (
                                            <div className="absolute top-1 right-1 sm:top-2 sm:right-2 lg:top-3 lg:right-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white text-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-1">
                                                <X size={10} className="sm:w-3 sm:h-3" />
                                                <span className="font-bold hidden sm:inline">FAINTED</span>
                                            </div>
                                        )}

                                        {/* Pokemon Image with glow effect */}
                                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto mb-2 sm:mb-3 lg:mb-4 group-hover:scale-105 transition-transform duration-200">
                                            <img
                                                src={getOfficialImage(pokemon.id)}
                                                alt={pokemon.name}
                                                className="relative w-full h-full object-contain drop-shadow-lg"
                                            />
                                        </div>

                                        {/* Pokemon Name */}
                                        <h4 className="capitalize font-bold text-base sm:text-lg lg:text-xl mb-2 sm:mb-3 text-center bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                                            {pokemon.name}
                                        </h4>

                                        {/* Types with enhanced styling */}
                                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3 lg:mb-4 justify-center">
                                            {pokemon.types.map((type) => (
                                                <span
                                                    key={type}
                                                    className="text-white text-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded-full font-bold uppercase tracking-wide shadow-lg"
                                                    style={{
                                                        backgroundColor: TYPE_COLORS[type],
                                                        boxShadow: `0 4px 12px ${TYPE_COLORS[type]}40`
                                                    }}
                                                >
                                                    {type}
                                                </span>
                                            ))}
                                        </div>

                                        {/* HP Section */}
                                        <div className="space-y-1 sm:space-y-2">
                                            {/* HP Text */}
                                            <div className="flex items-center justify-center gap-1 sm:gap-2">
                                                <Heart
                                                    size={16}
                                                    className={cn(
                                                        "transition-colors duration-300 sm:w-4 sm:h-4 lg:w-5 lg:h-5",
                                                        isLowHP ? "text-red-500" : "text-pink-500"
                                                    )}
                                                />
                                                <span className={cn(
                                                    "font-bold text-sm sm:text-base lg:text-lg",
                                                    isLowHP
                                                        ? "text-red-600 dark:text-red-400"
                                                        : "text-slate-700 dark:text-slate-300"
                                                )}>
                                                    {pokemon.currentHP}/{pokemon.maxHP}
                                                </span>
                                            </div>

                                            {/* Enhanced HP Bar */}
                                            <div className="relative w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 sm:h-3 overflow-hidden shadow-inner">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full transition-all duration-300",
                                                        hpPercentage <= 25
                                                            ? "bg-gradient-to-r from-red-500 to-red-600"
                                                            : hpPercentage <= 50
                                                                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                                                                : "bg-gradient-to-r from-green-500 to-emerald-500"
                                                    )}
                                                    style={{ width: `${hpPercentage}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Battle readiness indicator */}
                                        {!isActive && !isFainted && (
                                            <div className="absolute bottom-2 left-2 sm:bottom-2 sm:left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-semibold">
                                                    <Shield size={10} className="sm:w-3 sm:h-3" />
                                                    <span className="hidden sm:inline">READY</span>
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </BaseDialog.Popup>
            </BaseDialog.Portal>
        </BaseDialog.Root>
    );
};