import { useModal } from '../../../components/ModalContext';
import { resetBattle } from '../../../store/battleSlice';
import { useAppDispatch, useAppSelector } from '../../../store/useRedux';
import AlertDialog from '../../../ui/AlertDialog';

interface ContinueBattleDialogProps {
    onContinue: (path: string) => void;
}

export default function ContinueBattleDialog({ onContinue }: ContinueBattleDialogProps) {
    const dispatch = useAppDispatch();
    const { close, open } = useModal();

    const battleState = useAppSelector(state => state.battle);
    const { phase, players } = battleState;

    // Determine where to navigate based on phase
    const getNavigationPath = () => {
        switch (phase) {
            case 'TEAM_SELECTION':
                return '/pokeverse/battle-sim/team-selection';
            case 'LOADING':
                return '/pokeverse/battle-sim/loading';
            case 'BATTLE':
                return '/pokeverse/battle-sim/battle';
            case 'ENDED':
                return '/pokeverse/battle-sim/battle';
            default:
                return '/pokeverse/battle-sim';
        }
    };

    // Get phase display name
    const getPhaseDisplay = () => {
        switch (phase) {
            case 'TEAM_SELECTION':
                return 'Team Selection';
            case 'LOADING':
                return 'Loading Teams';
            case 'BATTLE':
                return 'In Battle';
            case 'ENDED':
                return 'Battle Ended';
            default:
                return 'Setup';
        }
    };

    const handleContinue = () => {
        close();
        onContinue(getNavigationPath());
    };

    const handleNewBattle = () => {
        close();
        // Show confirmation before resetting
        open(
            <AlertDialog
                title="Start New Battle?"
                message="This will discard your current battle progress. Are you sure?"
                cancelText="Go Back"
                confirmText="Start New"
                onConfirm={() => {
                    dispatch(resetBattle());
                    // User stays on BattleSetup page with clean state
                }}
            />
        );
    };

    // Battle info message
    const battleInfo = (
        <div className="space-y-3">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center xs:text-left">
                You have an ongoing battle:
            </p>

            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 space-y-2 text-xs xs:text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-neutral-600 dark:text-neutral-400">Phase:</span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {getPhaseDisplay()}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-neutral-600 dark:text-neutral-400">Player 1:</span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100 truncate ml-2">
                        {players[0].name || 'Not Set'}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-neutral-600 dark:text-neutral-400">Player 2:</span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100 truncate ml-2">
                        {players[1].name || 'Not Set'}
                    </span>
                </div>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center xs:text-left">
                Would you like to continue where you left off?
            </p>
        </div>
    );

    // Override the cancel button to show nested confirmation
    const handleCancel = () => {
        handleNewBattle();
    };

    return (
        <div className="py-2">
            {/* Icon */}
            <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
            </div>

            {/* Title */}
            <h3 className="text-base xs:text-lg font-bold text-neutral-900 dark:text-neutral-100 text-center mb-2 px-2">
                Continue Previous Battle?
            </h3>

            {/* Message */}
            <div className="mb-6">
                {battleInfo}
            </div>

            {/* Actions */}
            <div className="flex flex-col xs:flex-row gap-3">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="w-full xs:flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all duration-200"
                >
                    New Battle
                </button>
                <button
                    type="button"
                    onClick={handleContinue}
                    className="w-full xs:flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition-all duration-200"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}