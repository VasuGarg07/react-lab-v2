import { GithubIcon, LinkedinIcon, XIcon } from '@react-lab/ui';

const SOCIALS = [
    { href: 'https://github.com/VasuGarg07', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://linkedin.com/in/vasu-garg-07', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://x.com/_vasugarg_', icon: XIcon, label: 'X (Twitter)' },
];

// Recolor the black source SVGs to floral-white (#FFFCF2) for the dark footer.
const iconFilter =
    'brightness(0) saturate(100%) invert(99%) sepia(8%) saturate(420%) hue-rotate(318deg) brightness(104%)';

export default function BlogFooter() {
    return (
        <footer className="bg-onyx text-beige">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
                <p className="text-xs text-beige/60">
                    © {new Date().getFullYear()} <span className="font-semibold text-beige">Vasu Garg</span>
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
