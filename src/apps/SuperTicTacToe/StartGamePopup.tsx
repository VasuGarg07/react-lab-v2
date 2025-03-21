import { Swords } from 'lucide-react';
import React from 'react';
import { Instructions } from '@/apps/SuperTicTacToe/tictactoe.helpers';
import Dialog from '@/ui/Dialog';

interface StartGamePopupProps {
    isOpen: boolean;
    onStart: () => void;
}

const StartGamePopup: React.FC<StartGamePopupProps> = ({ isOpen, onStart }) => {
    return (
        <Dialog
            isOpen={isOpen}
            onClose={onStart}
            title="Game Instructions"
            size="md"
            position="center"
            contentClassName="p-0 overflow-hidden"
        >
            {/* Header with icon */}
            <div className="flex items-center gap-3 px-6 pt-5 pb-2">
                <Swords size={28} className="text-rose-500 dark:text-rose-400" />
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    Super Tic Tac Toe
                </h2>
            </div>

            {/* Description */}
            <div className="px-6 pb-3">
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    Master the ultimate strategy game! Here's how to play:
                </p>
            </div>

            {/* Instructions list */}
            <div className="px-6 mx-1 mb-5">
                <div className="bg-neutral-200 dark:bg-neutral-800/50 rounded-lg p-4">
                    <ol className="list-decimal pl-5 space-y-2">
                        {Instructions.map((instruction, index) => (
                            <li key={index} className="text-neutral-800 dark:text-neutral-200 marker:text-rose-500 dark:marker:text-rose-400">
                                <span className="text-sm">{instruction}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            {/* Action button */}
            <div className="flex justify-center px-6 pb-6">
                <button
                    onClick={onStart}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
                >
                    Start Game
                </button>
            </div>
        </Dialog>
    );
};

export default StartGamePopup;