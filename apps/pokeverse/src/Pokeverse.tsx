import { Book, Swords } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useScrollToTop } from '@react-lab/shared';

export default function Pokeverse() {
    useScrollToTop();
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-10 bg-chalk">

            {/* Pokéball */}
            <div className="relative w-44 h-44 shrink-0" aria-hidden="true">
                <div className="absolute inset-0 rounded-full overflow-hidden border-[6px] border-shadow shadow-xl">
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-crimson" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-snow" />
                </div>
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 bg-shadow z-2" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-3
                                w-12 h-12 rounded-full bg-snow border-6 border-shadow" />
            </div>

            {/* Title */}
            <div className="text-center">
                <h1 className="font-black text-shadow leading-none tracking-tight"
                    style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)' }}>
                    <span className="text-crimson">Poké</span>verse
                </h1>
                <p className="text-smoke font-medium text-base mt-3">
                    Explore &amp; Battle in the Pokémon Universe
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                <button
                    onClick={() => navigate('/pokedex')}
                    className="group flex flex-col gap-4 p-6 rounded-2xl bg-white border-2 border-silver/40 text-left
                               hover:border-azure hover:shadow-lg hover:shadow-azure/10 hover:-translate-y-1
                               transition-all duration-200 focus:outline-none"
                >
                    <div className="w-11 h-11 rounded-xl bg-azure flex items-center justify-center shrink-0">
                        <Book className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-black text-shadow text-lg">Pokédex</h2>
                        <p className="text-smoke text-sm mt-1 leading-snug">
                            All regions. Every Pokémon. Full stats &amp; evolutions.
                        </p>
                    </div>
                </button>

                <button
                    onClick={() => navigate('/battle-sim')}
                    className="group flex flex-col gap-4 p-6 rounded-2xl bg-white border-2 border-silver/40 text-left
                               hover:border-crimson hover:shadow-lg hover:shadow-crimson/10 hover:-translate-y-1
                               transition-all duration-200 focus:outline-none"
                >
                    <div className="w-11 h-11 rounded-xl bg-crimson flex items-center justify-center shrink-0">
                        <Swords className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-black text-shadow text-lg">Battle Sim</h2>
                        <p className="text-smoke text-sm mt-1 leading-snug">
                            Draft your team. Fight turn-by-turn. Claim victory.
                        </p>
                    </div>
                </button>
            </div>
        </div>
    );
}
