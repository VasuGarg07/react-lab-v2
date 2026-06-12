import githubIcon from '../icons/github.svg?url';
import linkedinIcon from '../icons/linkedin.svg?url';
import xIcon from '../icons/x.svg?url';

const SOCIALS = [
    { href: 'https://github.com/VasuGarg07', icon: githubIcon, label: 'GitHub' },
    { href: 'https://linkedin.com/in/vasu-garg-07', icon: linkedinIcon, label: 'LinkedIn' },
    { href: 'https://x.com/_vasugarg_', icon: xIcon, label: 'X (Twitter)' },
];

export const Footer = () => (
    <footer className="border-t border-hairline bg-card">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 sm:flex-row sm:px-6">
            <p className="text-xs text-faint">
                © {new Date().getFullYear()}{' '}
                <span className="font-semibold text-muted">Vasu Garg Labs</span>
                <span className="mx-1.5 text-hairline">·</span>
                PDF rendered server-side with ReportLab
            </p>
            <div className="flex items-center gap-1">
                {SOCIALS.map(({ href, icon, label }) => (
                    <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-faint opacity-70 transition-all hover:bg-panel hover:opacity-100"
                    >
                        <img src={icon} alt={label} className="h-3.5 w-3.5" />
                    </a>
                ))}
            </div>
        </div>
    </footer>
);
