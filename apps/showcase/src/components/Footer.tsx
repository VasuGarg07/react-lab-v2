import { GithubIcon, LinkedinIcon, XIcon } from '@react-lab/ui';

const SOCIALS = [
    { href: 'https://github.com/VasuGarg07', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://linkedin.com/in/vasu-garg-07', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://x.com/_vasugarg_', icon: XIcon, label: 'X (Twitter)' },
];

// Recolor the black source SVGs to warm paper (#FAF8F3) for the dark footer.
const iconFilter =
    'brightness(0) saturate(100%) invert(97%) sepia(6%) saturate(360%) hue-rotate(350deg) brightness(103%)';

export default function Footer() {
    return (
        <footer className="bg-ink text-paper">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
                <p className="text-xs text-paper/55">
                    © {new Date().getFullYear()} <span className="font-semibold text-paper">Vasu Garg Labs</span>
                </p>
                <div className="flex items-center gap-1">
                    {SOCIALS.map(({ href, icon, label }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="w-8 h-8 rounded-lg flex items-center justify-center opacity-55 hover:opacity-100 hover:bg-white/10 transition-all"
                        >
                            <img src={icon} alt={label} className="w-3.5 h-3.5" style={{ filter: iconFilter }} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
