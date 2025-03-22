import { motion } from 'framer-motion';
import { BattlePokemon } from '@/apps/Pokeverse/helpers/battle.types';
import { TYPE_COLORS } from '@/apps/Pokeverse/helpers/constant';
import { getOfficialImage } from '@/apps/Pokeverse/helpers/utilities';
import { cn } from '@/shared/cn';

interface PokemonBattleCardProps {
    pokemon: BattlePokemon;
    isOpponent?: boolean;
}

const PokemonBattleCard = ({ pokemon, isOpponent = false }: PokemonBattleCardProps) => {
    const firstColor = TYPE_COLORS[pokemon.types[0]];
    const secondColor = pokemon.types[1] ? TYPE_COLORS[pokemon.types[1]] : firstColor;

    const hpRatio = pokemon.currentHP / pokemon.maxHP;
    const hpColor =
        hpRatio > 0.5
            ? ['#2ECC71', '#27AE60']
            : hpRatio > 0.2
                ? ['#F1C40F', '#F39C12']
                : ['#E74C3C', '#C0392B'];

    return (
        <div
            className={cn(
                'relative overflow-hidden border-2 rounded-xl shadow-md p-4 max-w-xl transition-colors',
                'bg-white dark:bg-black border-black/10 dark:border-white/20',
                isOpponent ? 'ml-auto' : 'mr-auto'
            )}
        >
            {/* Background Gradient */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: `radial-gradient(circle at ${isOpponent ? '0%' : '100%'} 50%, ${firstColor}66, transparent 70%)`,
                    opacity: 0.8,
                }}
            />

            <div className={cn('relative z-10 flex gap-6 items-center', isOpponent && 'flex-row-reverse')}>
                {/* Text Area */}
                <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-center">
                        <h3
                            className="text-xl font-bold uppercase bg-clip-text text-transparent"
                            style={{
                                backgroundImage: `linear-gradient(135deg, ${firstColor}, ${secondColor})`,
                            }}
                        >
                            {pokemon.name}
                        </h3>

                        <div className="flex gap-1">
                            {pokemon.types.map((type) => (
                                <span
                                    key={type}
                                    className="px-2 py-0.5 text-xs font-semibold rounded text-white capitalize"
                                    style={{ backgroundColor: TYPE_COLORS[type] }}
                                >
                                    {type}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* HP Bar */}
                    <div className="relative h-4 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700">
                        <div
                            className="absolute inset-0 transition-all"
                            style={{
                                width: `${Math.max(hpRatio * 100, 0)}%`,
                                background: `linear-gradient(90deg, ${hpColor[0]}, ${hpColor[1]})`,
                            }}
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[0.7rem] font-bold text-gray-800 dark:text-gray-300">
                            {pokemon.currentHP}/{pokemon.maxHP}
                        </div>
                    </div>
                </div>

                {/* Pokémon Image */}
                <div className="relative flex-shrink-0 w-[180px] h-[180px]">
                    <div
                        className="absolute inset-[-20px] z-0"
                        style={{
                            background: `radial-gradient(circle, ${firstColor}20 0%, transparent 70%)`,
                        }}
                    />
                    <motion.img
                        src={getOfficialImage(pokemon.id)}
                        alt={pokemon.name}
                        className="w-full h-full object-contain relative z-10"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default PokemonBattleCard;
