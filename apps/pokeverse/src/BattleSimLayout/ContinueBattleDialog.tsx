import { useModal } from '@react-lab/ui';
import { resetBattle } from '../store/battleSlice';
import { useAppDispatch, useAppSelector } from '../store/useRedux';

interface ContinueBattleDialogProps {
    onContinue: (path: string) => void;
}

const PHASES = ['SETUP', 'TEAM_SELECTION', 'BATTLE'] as const;
const PHASE_LABELS: Record<string, string> = {
    SETUP: 'Setup',
    TEAM_SELECTION: 'Teams',
    BATTLE: 'Battle',
    ENDED: 'Battle',
};

export default function ContinueBattleDialog({ onContinue }: ContinueBattleDialogProps) {
    const dispatch = useAppDispatch();
    const { close } = useModal();
    const { phase, players } = useAppSelector(state => state.battle);

    const getNavigationPath = () => {
        switch (phase) {
            case 'TEAM_SELECTION': return '/battle-sim/team-selection';
            case 'LOADING': return '/battle-sim/loading';
            case 'BATTLE': return '/battle-sim/battle';
            case 'ENDED': return '/battle-sim';
            default: return '/battle-sim';
        }
    };

    const handleContinue = () => { close(); onContinue(getNavigationPath()); };
    const handleNewBattle = () => { close(); dispatch(resetBattle()); onContinue('/battle-sim'); };

    const phaseMap: Record<string, number> = {
        SETUP: 0, TEAM_SELECTION: 1, LOADING: 1, BATTLE: 2, ENDED: 2,
    };
    const activeIndex = phaseMap[phase] ?? 0;

    return (
        <div className="space-y-5">

            <div className="flex items-center gap-4">
                <img src="/pikachu.png" alt="Pikachu" className="w-20 h-20 object-contain shrink-0" />
                <div>
                    <p className="text-xs font-bold text-crimson uppercase tracking-widest mb-1">Battle in Progress</p>
                    <h3 className="text-xl font-black text-shadow leading-tight">Continue where you left off?</h3>
                    <p className="text-sm text-smoke mt-0.5">Your session is saved and ready</p>
                </div>
            </div>

            <div className="flex items-center">
                {PHASES.map((p, i) => {
                    const isDone = i < activeIndex;
                    const isActive = i === activeIndex;
                    return (
                        <div key={p} className="flex items-center flex-1 last:flex-none">
                            {/* Step */}
                            <div className="flex flex-col items-center gap-1 shrink-0">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${isActive ? 'bg-crimson text-white shadow-sm shadow-crimson/40' : isDone ? 'bg-crimson/20 text-crimson' : 'bg-silver/20 text-silver/40'}`}>
                                    {isDone ? '✓' : i + 1}
                                </div>
                                <span className={`text-[10px] font-bold ${isActive ? 'text-shadow' : isDone ? 'text-smoke' : 'text-silver/40'}`}>
                                    {PHASE_LABELS[p]}
                                </span>
                            </div>
                            {/* Connector — only between steps */}
                            {i < PHASES.length - 1 && (
                                <div className={`flex-1 h-px mx-2 ${isDone ? 'bg-crimson/40' : 'bg-silver/25'}`} />
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="rounded-xl border border-silver/40 bg-chalk overflow-hidden">
                <div className="grid grid-cols-[1fr_auto_1fr]">
                    <div className="p-4 text-left">
                        <p className="text-[10px] font-bold text-azure uppercase tracking-wider mb-1">Player 1</p>
                        <p className="font-black text-shadow text-sm truncate">{players[0].name || '—'}</p>
                    </div>
                    <div className="flex items-center justify-center px-3">
                        <div className="w-9 h-9 rounded-full bg-shadow border-2 border-silver/20 flex items-center justify-center shadow-md">
                            <span className="text-[10px] font-black text-white/70 tracking-widest">VS</span>
                        </div>
                    </div>
                    <div className="p-4 text-right">
                        <p className="text-[10px] font-bold text-crimson uppercase tracking-wider mb-1">Player 2</p>
                        <p className="font-black text-shadow text-sm truncate">{players[1].name || '—'}</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={handleNewBattle}
                    className="flex-1 px-4 py-2.5 text-sm font-bold rounded-xl bg-linear-to-br from-chalk to-silver/20 border border-silver/50 text-smoke hover:to-silver/40 hover:text-shadow transition-all duration-200"
                >
                    New Battle
                </button>
                <button
                    type="button"
                    onClick={handleContinue}
                    className="flex-1 px-4 py-2.5 text-sm font-bold rounded-xl bg-linear-to-br from-crimson to-ruby text-white hover:from-ruby hover:to-crimson transition-all duration-200 shadow-sm shadow-crimson/20"
                >
                    Continue →
                </button>
            </div>
        </div>
    );
}
