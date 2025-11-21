import { BookOpen } from 'lucide-react';
import type { Pokemon } from '../helpers/types';

interface EntriesSectionProps {
    pokemon: Pokemon;
}

export default function EntriesSection({ pokemon }: EntriesSectionProps) {
    if (!pokemon.flavorTexts || pokemon.flavorTexts.length === 0) {
        return (
            <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-neutral-400 dark:text-neutral-600" />
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    No Pokédex entries available
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {pokemon.flavorTexts.map((entry, index) => (
                <div
                    key={index}
                    className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-200"
                >
                    <div className="flex items-start gap-3">
                        <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                                {index + 1}
                            </span>
                        </div>
                        <p className="flex-1 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                            {entry}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}