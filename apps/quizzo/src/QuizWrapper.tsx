import { Outlet } from 'react-router';
import { useScrollToTop } from '@react-lab/shared';
import { GithubIcon, LinkedinIcon, XIcon } from '@react-lab/ui';

const SOCIALS = [
    { href: 'https://github.com/VasuGarg07', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://linkedin.com/in/vasu-garg-07', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://x.com/_vasugarg_', icon: XIcon, label: 'X (Twitter)' },
];

const iconFilter = 'brightness(0) saturate(100%) invert(14%) sepia(40%) saturate(800%) hue-rotate(170deg) brightness(80%)';

export default function QuizWrapper() {
    useScrollToTop();

    return (
        <div className="h-dvh w-full flex flex-col bg-mist overflow-hidden">

            {/* Header */}
            <header className="shrink-0 border-b border-deep/15">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 h-13 flex items-center justify-between">
                    <h1 className="text-lg font-bold tracking-tight text-deep">
                        Quizzo
                    </h1>
                    <div className="flex items-center gap-1">
                        {SOCIALS.map(({ href, icon, label }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                                className="w-7 h-7 rounded-lg flex items-center justify-center opacity-50 hover:opacity-100 hover:bg-deep/10 transition-all"
                            >
                                <img src={icon} alt={label} className="w-3.5 h-3.5" style={{ filter: iconFilter }} />
                            </a>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main content */}
            <div className="flex-1 min-h-0 flex items-center justify-center p-4 sm:p-6">
                <div className="w-full max-w-4xl h-full max-h-130 flex bg-white rounded-2xl border border-deep/10 shadow-lg shadow-deep/10 overflow-hidden">

                    {/* Cerulean accent stripe */}
                    <div className="hidden sm:block w-1.5 shrink-0 bg-cerulean" />

                    {/* Quiz content */}
                    <div className="flex-1 flex items-center justify-center p-6 sm:p-8 overflow-y-auto">
                        <div className="w-full max-w-md">
                            <Outlet />
                        </div>
                    </div>

                    {/* Right panel */}
                    <div className="hidden sm:flex w-52 shrink-0 flex-col items-center justify-center gap-6 bg-deep p-8">
                        <div className="text-center">
                            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-frost mb-1.5">Powered by</p>
                            <p className="text-sm font-semibold text-white leading-snug">Open Trivia DB</p>
                        </div>
                        <div className="w-8 h-px bg-frost/30" />
                        <div className="text-center">
                            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-frost mb-1.5">Questions</p>
                            <p className="text-3xl font-bold text-white">10</p>
                        </div>
                        <div className="w-8 h-px bg-frost/30" />
                        <div className="text-center">
                            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-frost mb-1.5">Categories</p>
                            <p className="text-3xl font-bold text-white">23</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <footer className="shrink-0 border-t border-deep/15 py-3 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <p className="text-xs text-deep/60">
                        © {new Date().getFullYear()} Vasu Garg
                    </p>
                    <p className="text-xs text-deep/60">
                        Trivia via{' '}
                        <a href="https://opentdb.com" target="_blank" rel="noopener noreferrer"
                            className="font-medium hover:text-cerulean transition-colors underline underline-offset-2"
                        >
                            Open Trivia DB
                        </a>
                    </p>
                </div>
            </footer>

        </div>
    );
}
