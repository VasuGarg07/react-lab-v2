import { RotateCcw } from 'lucide-react';
import { Instructions } from './ttt.helpers';
import { GithubIcon, LinkedinIcon, XIcon } from '@react-lab/ui';

interface SidebarProps {
    gameWinner: string | null;
    currentPlayer: 'X' | 'O';
    timer: number;
    handleRestartGame: () => void;
}

const SOCIALS = [
    { href: 'https://github.com/VasuGarg07', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://linkedin.com/in/vasu-garg-07', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://x.com/_vasugarg_', icon: XIcon, label: 'X (Twitter)' },
];

const TimerArc = ({ timer }: { timer: number }) => {
    const size = 64;
    const r = 26;
    const cx = size / 2;
    const cy = size / 2;
    const circumference = 2 * Math.PI * r;
    const progress = timer / 10;
    const dashOffset = circumference * (1 - progress);
    const isUrgent = timer <= 3;
    const isMid = timer <= 6;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="absolute inset-0 -rotate-90">
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                <circle
                    cx={cx} cy={cy} r={r}
                    fill="none"
                    stroke={isUrgent ? '#312180' : isMid ? '#E07E12' : '#1F1F1F'}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    style={{ transition: 'stroke-dashoffset 0.8s linear, stroke 0.3s ease' }}
                />
            </svg>
            <span className={`text-base font-bold tabular-nums z-10 leading-none
                ${isUrgent ? 'text-o-500' : isMid ? 'text-x-500' : 'text-ink'}`}>
                {timer}
            </span>
        </div>
    );
};

const GameInstructions = ({ gameWinner, currentPlayer, timer, handleRestartGame }: SidebarProps) => {
    const isX = currentPlayer === 'X';

    return (
        <div className="flex flex-col gap-4 h-full py-1">

            {/* Brand */}
            <div>
                <h1 className="text-xl font-bold tracking-tight text-ink leading-snug">
                    Super Tic-Tac-Toe
                </h1>
            </div>

            {/* Divider */}
            <div className="h-px bg-linear-to-r from-transparent via-slate-400/70 to-transparent" />

            {/* Turn + timer */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                        ${isX
                            ? 'bg-x-400/15 text-x-500 ring-1 ring-x-400/55'
                            : 'bg-o-500/12 text-o-500 ring-1 ring-o-500/45'
                        }`}
                    >
                        {currentPlayer}
                    </div>
                    <div>
                        <p className="text-[11px] font-medium text-slate-600 leading-none mb-1">Playing</p>
                        <p className={`text-sm font-bold leading-none ${isX ? 'text-x-500' : 'text-o-500'}`}>
                            Player {currentPlayer}
                        </p>
                    </div>
                </div>
                <TimerArc timer={timer} />
            </div>

            {/* Winner banner */}
            {gameWinner && (
                <div className={`rounded-md px-3 py-2.5 text-center text-sm font-bold tracking-wide
                    ${gameWinner === 'X'
                        ? 'bg-x-400/15 text-x-500 ring-1 ring-x-400/45'
                        : 'bg-o-500/12 text-o-500 ring-1 ring-o-500/40'
                    }`}
                >
                    Player {gameWinner} wins!
                </div>
            )}

            {/* Restart */}
            <button
                onClick={handleRestartGame}
                className="flex items-center justify-center gap-2 py-2 px-4 text-sm font-semibold text-slate-700 hover:text-white rounded-md border border-slate-300 hover:border-slate-900 hover:bg-slate-900 transition-all duration-200 group"
            >
                <RotateCcw size={13} className="group-hover:rotate-180 transition-transform duration-300" />
                Restart Game
            </button>

            {/* Divider */}
            <div className="h-px bg-linear-to-r from-transparent via-slate-400/70 to-transparent" />

            {/* How to play */}
            <div className="flex-1 overflow-y-auto">
                <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-500 mb-3">How to Play</p>
                <ol className="space-y-2.5">
                    {Instructions.map((instruction, i) => (
                        <li key={i} className="flex gap-2.5 items-start">
                            <span className="shrink-0 w-5 h-5 rounded text-[11px] font-bold flex items-center justify-center bg-slate-900 text-white mt-px">
                                {i + 1}
                            </span>
                            <span className="text-xs text-slate-700 leading-relaxed">
                                {instruction}
                            </span>
                        </li>
                    ))}
                </ol>
            </div>

            {/* Divider */}
            <div className="h-px bg-linear-to-r from-transparent via-slate-400/70 to-transparent" />

            {/* Social + credit */}
            <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-semibold">Vasu Garg</span>
                <div className="flex items-center gap-1">
                    {SOCIALS.map(({ href, icon, label }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="w-7 h-7 rounded flex items-center justify-center opacity-70 hover:opacity-100 hover:bg-slate-200 transition-all duration-150"
                        >
                            <img src={icon} alt={label} className="w-3.5 h-3.5" />
                        </a>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default GameInstructions;
