import { Eraser } from 'lucide-react';

interface VirtualNumpadProps {
    onNumberSelect: (num: number) => void;
    onClear: () => void;
    disabled?: boolean;
}

export default function VirtualNumpad({ onNumberSelect, onClear, disabled }: VirtualNumpadProps) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className="w-full bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 py-2 px-3">
            <div className="max-w-md mx-auto">
                <div className="grid grid-cols-5 gap-1.5">
                    {numbers.map((num) => (
                        <button
                            key={num}
                            onClick={() => onNumberSelect(num)}
                            disabled={disabled}
                            className="h-12 flex items-center justify-center text-base font-semibold bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-neutral-900 dark:text-neutral-100 rounded-lg border border-neutral-300 dark:border-neutral-700 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0"
                        >
                            {num}
                        </button>
                    ))}
                    <button
                        onClick={onClear}
                        disabled={disabled}
                        className="h-12 flex items-center justify-center bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg border border-red-300 dark:border-red-800 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:ring-offset-0"
                        title="Clear cell"
                    >
                        <Eraser size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}