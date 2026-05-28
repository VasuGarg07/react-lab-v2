import { useEffect } from 'react';
import { useModal } from '@react-lab/ui';
import { Instructions } from './ttt.helpers';

interface StartGamePopupProps {
    isOpen: boolean;
    onStart: () => void;
}

const StartGamePopup = ({ isOpen, onStart }: StartGamePopupProps) => {
    const { open, close } = useModal();

    useEffect(() => {
        if (!isOpen) {
            close();
            return;
        }
        open(
                <div className="space-y-4">
                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        How to Play
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Master the ultimate strategy game! Win three mini-boards in a row to win the game.
                    </p>

                    {/* Instructions list */}
                    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                        <ol className="list-decimal pl-5 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                            {Instructions.map((instruction, index) => (
                                <li key={index} className="leading-relaxed">
                                    {instruction}
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Action button */}
                    <div className="flex justify-center pt-2">
                        <button
                            onClick={() => {
                                close();
                                onStart();
                            }}
                            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium text-sm rounded-lg transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0"
                        >
                            Start Game
                        </button>
                    </div>
                </div>
            , false);
    }, [isOpen, open, close]);

    return null;
};

export default StartGamePopup;