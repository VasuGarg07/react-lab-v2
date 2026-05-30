import { Ruler, Weight, Sparkles, Heart, Target, Home } from 'lucide-react';
import type { Pokemon } from '../helpers/types';

export default function InfoSection({ pokemon }: { pokemon: Pokemon }) {
    const infoItems = [
        { icon: Ruler, label: 'Height', value: pokemon.height },
        { icon: Weight, label: 'Weight', value: pokemon.weight },
        { icon: Sparkles, label: 'Base Experience', value: pokemon.baseExp.toString() },
        { icon: Heart, label: 'Base Happiness', value: pokemon.baseHappiness.toString() },
        { icon: Target, label: 'Capture Rate', value: pokemon.captureRate },
        { icon: Home, label: 'Habitat', value: pokemon.habitat || 'Unknown' },
    ];

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3">
                {infoItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.label}
                            className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-200"
                        >
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700">
                                    <Icon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">{item.label}</p>
                                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 capitalize truncate">{item.value}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Abilities</h3>
                <div className="flex flex-wrap gap-2">
                    {pokemon.abilities.map((ability, index) => (
                        <div
                            key={index}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${ability.isHidden
                                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700'
                                : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                                }`}
                        >
                            <span className="capitalize">{ability.name}</span>
                            {ability.isHidden && <span className="ml-1 text-xs opacity-75">(Hidden)</span>}
                        </div>
                    ))}
                </div>
            </div>

            {pokemon.generation && (
                <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">Generation</span>
                        <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Gen {pokemon.generation}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
