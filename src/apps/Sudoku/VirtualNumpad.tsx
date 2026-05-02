import { Eraser } from 'lucide-react';

interface VirtualNumpadProps {
    onNumberSelect: (num: number) => void;
    onClear: () => void;
    disabled?: boolean;
}

const NUMPAD_DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function VirtualNumpad({ onNumberSelect, onClear, disabled }: VirtualNumpadProps) {
    return (
        <div className="md:hidden w-full bg-white dark:bg-neutral-900 border-t border-stone-200 dark:border-neutral-700 py-3 px-3">
            <div className="max-w-md mx-auto grid grid-cols-5 gap-2">
                {NUMPAD_DIGITS.map((num) => (
                    <button
                        key={num}
                        type="button"
                        onClick={() => onNumberSelect(num)}
                        disabled={disabled}
                        className="h-12 flex items-center justify-center text-base font-semibold bg-stone-100 dark:bg-neutral-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-stone-900 dark:text-stone-100 rounded-md border border-stone-200 dark:border-neutral-700 transition active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    >
                        {num}
                    </button>
                ))}
                <button
                    type="button"
                    onClick={onClear}
                    disabled={disabled}
                    className="h-12 flex items-center justify-center bg-stone-100 dark:bg-neutral-800 hover:bg-red-100 dark:hover:bg-red-900/40 text-stone-700 dark:text-stone-300 hover:text-red-600 dark:hover:text-red-400 rounded-md border border-stone-200 dark:border-neutral-700 transition active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    aria-label="Clear cell"
                    title="Clear cell"
                >
                    <Eraser size={18} />
                </button>
            </div>
        </div>
    );
}