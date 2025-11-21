import { useState } from 'react';
import { Search, Zap } from 'lucide-react';
import type { Pokemon } from '../helpers/types';
import { formatString } from '../helpers/utilities';

interface MovesGridProps {
    pokemon: Pokemon;
}

export default function MovesGrid({ pokemon }: MovesGridProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMoves = pokemon.moves.filter((move) =>
        move.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (pokemon.moves.length === 0) {
        return (
            <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 text-center">
                <Zap className="w-12 h-12 mx-auto mb-3 text-neutral-400 dark:text-neutral-600" />
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    No moves available
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                <input
                    type="text"
                    placeholder="Search moves..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-neutral-800 dark:text-neutral-50 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200"
                />
            </div>

            {/* Moves Count */}
            <div className="flex items-center justify-between px-2">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {filteredMoves.length} {filteredMoves.length === 1 ? 'move' : 'moves'}
                </p>
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm('')}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Clear search
                    </button>
                )}
            </div>

            {/* Moves Grid */}
            {filteredMoves.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredMoves.map((move, index) => (
                        <div
                            key={index}
                            className="p-3 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-200"
                        >
                            <div className="flex items-center gap-2">
                                <div className="shrink-0 w-6 h-6 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center">
                                    <Zap className="w-3 h-3 text-neutral-600 dark:text-neutral-400" />
                                </div>
                                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 capitalize">
                                    {formatString(move.name)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 text-center">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        No moves match "{searchTerm}"
                    </p>
                </div>
            )}
        </div>
    );
}