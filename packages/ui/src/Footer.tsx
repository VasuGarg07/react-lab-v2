import { ThemeToggle } from "./ThemeToggle";
import Github from "../icons/github.svg";
import LinkedIn from "../icons/linkedin.svg";
import X from "../icons/x.svg"

const SOCIALS = [
    { href: 'https://github.com/VasuGarg07', icon: Github, label: 'GitHub' },
    { href: 'https://linkedin.com/in/vasu-garg-07', icon: LinkedIn, label: 'LinkedIn' },
    { href: 'https://x.com/_vasugarg_', icon: X, label: 'X (Twitter)' },
];

export function Footer() {
    return (
        <footer className="w-full border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
            <div className="container mx-auto px-4 py-3">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        © {new Date().getFullYear()} React Lab • Vasu Garg
                    </p>
                    <div className="flex items-center gap-2">
                        {SOCIALS.map(({ href, icon, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="group p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                            >
                                <img
                                    src={icon}
                                    alt={label}
                                    className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity dark:invert"
                                />
                            </a>
                        ))}
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </footer>
    );
}