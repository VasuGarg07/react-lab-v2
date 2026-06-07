import { useEffect, useState } from 'react';
import { FlaskConical } from 'lucide-react';
import { GithubIcon } from '@react-lab/ui';

interface HeaderProps {
    count: number;
}

// Recolor the black GitHub SVG to warm paper for the dark button.
const ghFilter =
    'brightness(0) saturate(100%) invert(97%) sepia(6%) saturate(360%) hue-rotate(350deg) brightness(103%)';

export default function Header({ count }: HeaderProps) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-30 transition-all duration-300 ${
                scrolled ? 'border-b border-neutral-200 bg-paper/85 backdrop-blur-xl' : 'border-b border-transparent bg-paper/60 backdrop-blur-sm'
            }`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                    <span className="grid place-items-center w-9 h-9 rounded-xl bg-ink text-paper">
                        <FlaskConical className="w-4 h-4" strokeWidth={2.25} />
                    </span>
                    <span className="font-display text-lg font-semibold tracking-tight text-ink">
                        Vasu Garg <span className="text-neutral-400">Labs</span>
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="hidden xs:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-bold text-neutral-500">
                        <span className="tabular-nums text-ink">{count}</span> projects
                    </span>
                    <a
                        href="https://github.com/VasuGarg07"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-ink text-paper hover:bg-neutral-800 transition-colors"
                    >
                        <img src={GithubIcon} alt="" className="w-4 h-4" style={{ filter: ghFilter }} />
                        <span className="hidden sm:inline">GitHub</span>
                    </a>
                </div>
            </div>
        </header>
    );
}
