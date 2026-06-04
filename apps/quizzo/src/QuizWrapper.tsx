import { Outlet } from 'react-router';
import { useScrollToTop } from '@react-lab/shared';
import { ThemeToggle } from '@react-lab/ui';
import QuizImage from '/quiz.svg';
import GithubIcon from '../../../packages/ui/icons/github.svg';
import LinkedinIcon from '../../../packages/ui/icons/linkedin.svg';
import XIcon from '../../../packages/ui/icons/x.svg';

const SOCIALS = [
    { href: 'https://github.com/VasuGarg07', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://linkedin.com/in/vasu-garg-07', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://x.com/_vasugarg_', icon: XIcon, label: 'X (Twitter)' },
];

export default function QuizWrapper() {
    useScrollToTop();

    return (
        <div className="h-dvh w-full flex flex-col bg-violet-50 dark:bg-[#0f0e17] overflow-hidden">

            {/* Header */}
            <header className="shrink-0 border-b border-violet-200 dark:border-[#2d2a3e]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 h-13 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-violet-400 dark:text-[#7c7a96] leading-none mb-0.5">
                            React Lab
                        </p>
                        <h1 className="text-base font-bold tracking-tight text-indigo-950 dark:text-violet-100 leading-none">
                            Quizzo
                        </h1>
                    </div>
                    <div className="flex items-center gap-1">
                        {SOCIALS.map(({ href, icon, label }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                className="w-7 h-7 rounded-lg flex items-center justify-center opacity-30 hover:opacity-80 hover:bg-violet-100 dark:hover:bg-[#1a1825]"
                            >
                                <img src={icon} alt={label} className="w-3.5 h-3.5 dark:invert" />
                            </a>
                        ))}
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Main content */}
            <div className="flex-1 min-h-0 flex items-center justify-center p-4">
                <div className="w-full max-w-5xl max-h-120 h-full flex flex-col sm:flex-row bg-white dark:bg-[#1a1825] rounded-2xl border border-violet-200 dark:border-[#2d2a3e] shadow-xl shadow-violet-200/50 dark:shadow-black/40 overflow-hidden">

                    {/* Left: quiz content */}
                    <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
                        <div className="w-full max-w-md">
                            <Outlet />
                        </div>
                    </div>

                    {/* Right: decorative image — no border, blends via gradient */}
                    <div
                        className="hidden sm:flex w-2/5 shrink-0 items-center justify-center p-8"
                        style={{
                            background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.06) 40%, rgba(139,92,246,0.12))',
                        }}
                    >
                        <img src={QuizImage} alt="Quiz" className="w-full max-w-xs object-contain opacity-75 drop-shadow-[0_0_32px_rgba(139,92,246,0.25)]" />
                    </div>

                </div>
            </div>

            {/* Footer */}
            <footer className="shrink-0 border-t border-violet-200 dark:border-[#2d2a3e] py-3 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <p className="text-xs text-violet-400 dark:text-[#7c7a96]">
                        © {new Date().getFullYear()} Vasu Garg · React Lab
                    </p>
                    <p className="text-xs text-violet-400 dark:text-[#7c7a96]">
                        Trivia via{' '}
                        <a href="https://opentdb.com" target="_blank" rel="noopener noreferrer"
                            className="hover:text-game-bright transition-colors underline underline-offset-2"
                        >
                            Open Trivia DB
                        </a>
                    </p>
                </div>
            </footer>

        </div>
    );
}
