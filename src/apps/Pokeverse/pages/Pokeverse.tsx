import { Book, Swords } from 'lucide-react';
import { useNavigate } from 'react-router';
import PokeverseBG from '/pokeverse.png'

export default function Pokeverse() {
    const navigate = useNavigate();

    return (
        <div
            className="relative w-full bg-cover bg-center flex items-center justify-center overflow-hidden"
            style={{
                backgroundImage: `url(${PokeverseBG})`
            }}
        >
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 flex flex-col items-center justify-center gap-12 md:gap-16">

                {/* Branding */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
                        <span className="bg-linear-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
                            Poké
                        </span>
                        <span className="bg-linear-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent drop-shadow-lg">
                            verse
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl font-medium text-white drop-shadow-md">
                        Explore & Battle in the Pokémon Universe
                    </p>
                </div>

                {/* Navigation Cards */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl">

                    {/* Pokédex Card */}
                    <button
                        onClick={() => navigate('pokedex')}
                        className="group relative overflow-hidden rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-2 border-white/50 dark:border-neutral-700/50 p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                    >
                        {/* Gradient Background */}
                        <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Icon */}
                        <div className="relative mb-6 flex justify-center">
                            <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-shadow duration-300">
                                <Book className="w-10 h-10 text-white" />
                            </div>
                        </div>

                        {/* Text */}
                        <div className="relative space-y-2">
                            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                                Pokédex
                            </h2>
                            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                                Discover and explore detailed information about all Pokémon across all regions
                            </p>
                        </div>
                    </button>

                    {/* Battle Simulator Card */}
                    <button
                        onClick={() => navigate('battle-sim')}
                        className="group relative overflow-hidden rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-2 border-white/50 dark:border-neutral-700/50 p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30 focus:outline-none focus:ring-4 focus:ring-red-500/50"
                    >
                        {/* Gradient Background */}
                        <div className="absolute inset-0 bg-linear-to-br from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Icon */}
                        <div className="relative mb-6 flex justify-center">
                            <div className="w-20 h-20 rounded-full bg-linear-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:shadow-red-500/50 transition-shadow duration-300">
                                <Swords className="w-10 h-10 text-white" />
                            </div>
                        </div>

                        {/* Text */}
                        <div className="relative space-y-2">
                            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                                Battle Simulator
                            </h2>
                            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                                Challenge your friends in epic turn-based Pokémon battles with strategic gameplay
                            </p>
                        </div>
                    </button>

                </div>

                {/* Footer Badge */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-white/50 dark:border-neutral-700/50 shadow-lg">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            All Region's Pokémon Available
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}