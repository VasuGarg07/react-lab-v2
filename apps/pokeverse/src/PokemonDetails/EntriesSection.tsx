import { BookOpen } from 'lucide-react';
import type { Pokemon } from '../helpers/types';

export default function EntriesSection({ pokemon }: { pokemon: Pokemon }) {
    if (!pokemon.flavorTexts || pokemon.flavorTexts.length === 0) {
        return (
            <div className="p-8 bg-white rounded-xl border border-silver/40 text-center">
                <BookOpen className="w-10 h-10 mx-auto mb-3 text-silver" />
                <p className="text-sm text-smoke">No Pokédex entries available</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {pokemon.flavorTexts.map((entry, index) => (
                <div
                    key={index}
                    className="p-4 bg-white rounded-xl border border-silver/40 hover:border-silver transition-all duration-200"
                >
                    <div className="flex items-start gap-3">
                        <div className="shrink-0 w-7 h-7 rounded-full bg-crimson/10 flex items-center justify-center">
                            <span className="text-xs font-black text-crimson">{index + 1}</span>
                        </div>
                        <p className="flex-1 text-sm leading-relaxed text-dusk">{entry}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
