import { usePoke } from './PokeContext';
import GameBoard from './Gameboard';
import Result from './GameResult';
import Setup from './Setup';
import { GithubIcon, LinkedinIcon, XIcon } from '@react-lab/ui';

const SOCIALS = [
    { href: 'https://github.com/VasuGarg07', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://linkedin.com/in/vasu-garg-07', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://x.com/_vasugarg_', icon: XIcon, label: 'X (Twitter)' },
];

const iconFilter = 'brightness(0) saturate(100%) invert(98%) sepia(2%) saturate(200%) hue-rotate(200deg) brightness(120%)';

export default function PokeMemory() {
    const { state } = usePoke();

    return (
        <div className="min-h-dvh flex flex-col">

            {/* Header */}
            <header className="shrink-0 bg-indigo">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-13 flex items-center justify-between">
                    <h1 className="text-sm font-black tracking-tight text-white">Poké Memory</h1>
                    <div className="flex items-center gap-0.5">
                        {SOCIALS.map(({ href, icon, label }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                className="w-7 h-7 rounded-lg flex items-center justify-center opacity-50 hover:opacity-100 hover:bg-white/15 transition-all duration-150"
                            >
                                <img src={icon} alt={label} className="w-3.5 h-3.5" style={{ filter: iconFilter }} />
                            </a>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
                {state.gameState === 'setup'    && <Setup />}
                {state.gameState === 'playing'  && <GameBoard />}
                {state.gameState === 'game_end' && <Result />}
            </main>

            {/* Footer */}
            <footer className="shrink-0 bg-indigo py-3 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <p className="text-xs font-bold text-white/60">© {new Date().getFullYear()} Vasu Garg</p>
                    <p className="text-xs text-white/35">Pokémon © Nintendo</p>
                </div>
            </footer>

        </div>
    );
}
