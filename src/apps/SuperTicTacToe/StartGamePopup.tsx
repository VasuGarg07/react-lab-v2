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

            {/* Description */}
            <div className="px-4 sm:px-6 pb-2 sm:pb-3">
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                    Master the ultimate strategy game! Here's how to play:
                </p>
            </div>

            {/* Instructions list */}
            <div className="px-4 sm:px-6 mx-0 sm:mx-1 mb-4 sm:mb-5">
                <div className="bg-neutral-200 dark:bg-neutral-800/50 rounded-lg p-3 sm:p-4">
                    <ol className="list-decimal pl-4 sm:pl-5 space-y-1.5 sm:space-y-2">
                        {Instructions.map((instruction, index) => (
                            <li key={index} className="text-neutral-800 dark:text-neutral-200 marker:text-rose-500 dark:marker:text-rose-400">
                                <span className="text-xs sm:text-sm">{instruction}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            {/* Action button */}
            <div className="flex justify-center px-4 sm:px-6 pb-4 sm:pb-6">
                <button
                    onClick={onStart}
                    className="w-full sm:w-auto px-5 sm:px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
                >
                    Start Game
                </button>
            </div>
        </Dialog>
    );
};

export default StartGamePopup;