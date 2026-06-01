import GithubIcon from '../../../packages/ui/icons/github.svg';
import LinkedinIcon from '../../../packages/ui/icons/linkedin.svg';
import XIcon from '../../../packages/ui/icons/x.svg';

const SOCIALS = [
    { href: 'https://github.com/VasuGarg07', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://linkedin.com/in/vasu-garg-07', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://x.com/_vasugarg_', icon: XIcon, label: 'X (Twitter)' },
];

// Recolour SVGs to #7D84B2 (Lavender Grey)
const lavenderFilter = 'invert(49%) sepia(14%) saturate(800%) hue-rotate(196deg) brightness(88%) contrast(88%)';

export function SudokuFooter() {
    return (
        <footer
            className="w-full border-t py-3 px-5"
            style={{ borderColor: '#D9DBF1', backgroundColor: 'rgba(249,249,237,0.7)' }}
        >
            <div className="max-w-2xl mx-auto flex items-center justify-between">
                <p className="text-xs font-medium" style={{ color: '#8E9DCC' }}>
                    © {new Date().getFullYear()} Vasu Garg
                </p>
                <div className="flex items-center gap-0.5">
                    {SOCIALS.map(({ href, icon, label }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
                            style={{ opacity: 0.5 }}
                            onMouseEnter={e => {
                                e.currentTarget.style.opacity = '1';
                                e.currentTarget.style.backgroundColor = '#EEEEF8';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.opacity = '0.5';
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <img src={icon} alt={label} className="w-4 h-4" style={{ filter: lavenderFilter }} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
