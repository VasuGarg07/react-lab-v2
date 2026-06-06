import { useState } from 'react';
import { Search, Zap } from 'lucide-react';
import type { Pokemon } from '../helpers/types';
import { formatString } from '../helpers/utilities';

export default function MovesGrid({ pokemon }: { pokemon: Pokemon }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMoves = pokemon.moves.filter((move) =>
        move.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (pokemon.moves.length === 0) {
        return (
            <div className="p-8 bg-white rounded-xl border border-silver/40 text-center">
                <Zap className="w-10 h-10 mx-auto mb-3 text-silver" />
                <p className="text-sm text-smoke">No moves available</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver" />
                <input
                    type="text"
                    placeholder="Search moves..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white text-shadow border border-silver/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-crimson/20 focus:border-crimson transition-all duration-200 placeholder:text-silver"
                />
            </div>

            <div className="flex items-center justify-between px-1">
                <p className="text-xs text-smoke font-medium">
                    {filteredMoves.length} {filteredMoves.length === 1 ? 'move' : 'moves'}
                </p>
                {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="text-xs text-crimson hover:text-ruby font-semibold">
                        Clear
                    </button>
                )}
            </div>

            {filteredMoves.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredMoves.map((move, index) => (
                        <div
                            key={index}
                            className="p-3 bg-white rounded-lg border border-silver/40 hover:border-silver transition-all duration-200"
                        >
                            <div className="flex items-center gap-2">
                                <div className="shrink-0 w-6 h-6 rounded-full bg-chalk flex items-center justify-center">
                                    <Zap className="w-3 h-3 text-smoke" />
                                </div>
                                <span className="text-sm font-medium text-shadow capitalize">
                                    {formatString(move.name)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-6 bg-white rounded-xl border border-silver/40 text-center">
                    <p className="text-sm text-smoke">No moves match "{searchTerm}"</p>
                </div>
            )}
        </div>
    );
}
