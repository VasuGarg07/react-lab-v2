import { usePoke } from './PokeContext';
import GameBoard from './Gameboard';
import Result from './GameResult';
import Setup from './Setup';
import GithubIcon from '../../../packages/ui/icons/github.svg';
import LinkedinIcon from '../../../packages/ui/icons/linkedin.svg';
import XIcon from '../../../packages/ui/icons/x.svg';

const SOCIALS = [
    { href: 'https://github.com/VasuGarg07', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://linkedin.com/in/vasu-garg-07', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://x.com/_vasugarg_', icon: XIcon, label: 'X (Twitter)' },
];

export default function PokeMemory() {
    const { state } = usePoke();

    return (
        <div className="min-h-dvh flex flex-col bg-snow">

            {/* Header — Garnet */}
            <header className="shrink-0 bg-garnet shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-13 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/50">React Lab</span>
                        <span className="text-white/25">·</span>
                        <h1 className="text-base font-black text-white">Poké Memory</h1>
                    </div>
                    <div className="flex items-center gap-0.5">
                        {SOCIALS.map(({ href, icon, label }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                className="w-7 h-7 rounded-lg flex items-center justify-center opacity-50 hover:opacity-100 hover:bg-white/15 transition-all duration-150"
                            >
                                <img src={icon} alt={label} className="w-3.5 h-3.5 invert" />
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

            {/* Footer — Ink */}
            <footer className="shrink-0 bg-ink py-3 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <p className="text-xs font-bold text-white/70">© {new Date().getFullYear()} Vasu Garg · React Lab</p>
                    <p className="text-xs text-white/35">Pokémon © Nintendo</p>
                </div>
            </footer>

        </div>
    );
}
