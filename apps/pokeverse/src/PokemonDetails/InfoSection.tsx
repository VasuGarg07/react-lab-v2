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
                            className="p-4 bg-white rounded-xl border border-silver/40 hover:border-silver transition-all duration-200"
                        >
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-chalk shrink-0">
                                    <Icon className="w-4 h-4 text-smoke" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-silver mb-1">{item.label}</p>
                                    <p className="text-sm font-bold text-shadow capitalize truncate">{item.value}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="p-4 bg-white rounded-xl border border-silver/40">
                <h3 className="text-xs font-black uppercase tracking-wider text-smoke mb-3">Abilities</h3>
                <div className="flex flex-wrap gap-2">
                    {pokemon.abilities.map((ability, index) => (
                        <div
                            key={index}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${ability.isHidden
                                ? 'bg-chalk border-silver/60 text-smoke'
                                : 'bg-chalk border-silver/40 text-shadow'
                                }`}
                        >
                            <span className="capitalize">{ability.name}</span>
                            {ability.isHidden && <span className="ml-1 text-xs text-silver">(Hidden)</span>}
                        </div>
                    ))}
                </div>
            </div>

            {pokemon.generation && (
                <div className="p-4 bg-white rounded-xl border border-silver/40">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-smoke">Generation</span>
                        <span className="text-sm font-bold text-shadow">Gen {pokemon.generation}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
