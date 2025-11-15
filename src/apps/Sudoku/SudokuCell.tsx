import { useEffect, useRef } from 'react';

interface SudokuCellProps {
    value: number;
    onChange: (value: string) => void;
    editable: boolean;
    selected: boolean;
    onSelect: () => void;
    row: number;
    col: number;
    useNumpad: boolean;
}

export default function SudokuCell({
    value,
    onChange,
    editable,
    selected,
    onSelect,
    row,
    col,
    useNumpad,
}: SudokuCellProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (selected && !useNumpad && inputRef.current) {
            inputRef.current.focus();
        }
    }, [selected, useNumpad]);

    const getBgClass = () => {
        const isEvenBlock = Math.floor(row / 3) % 2 === Math.floor(col / 3) % 2;

        if (!editable) {
            return isEvenBlock
                ? 'bg-neutral-200 dark:bg-neutral-700'
                : 'bg-neutral-300 dark:bg-neutral-600';
        }

        return isEvenBlock
            ? 'bg-white dark:bg-neutral-800'
            : 'bg-neutral-50 dark:bg-neutral-700';
    };

    const handleChange = (val: string) => {
        // Only allow single digits 1-9 or empty
        if (val === '' || (val.length === 1 && /^[1-9]$/.test(val))) {
            onChange(val);
        }
    };

    return (
        <button
            type="button"
            onClick={onSelect}
            className={`
        aspect-square w-full flex items-center justify-center
        ${getBgClass()}
        ${selected ? 'ring-2 ring-inset ring-blue-500 dark:ring-blue-400' : ''}
        ${editable ? 'border border-neutral-300 dark:border-neutral-600' : 'border border-neutral-400 dark:border-neutral-500'}
        transition-all duration-200
        ${editable && selected ? 'scale-105' : 'scale-100'}
        focus:outline-none
      `}
        >
            {editable && !useNumpad ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={value === 0 ? '' : value}
                    onChange={(e) => handleChange(e.target.value)}
                    className="w-full h-full text-center bg-transparent outline-none text-blue-600 dark:text-blue-400 text-lg font-semibold pointer-events-none"
                    maxLength={1}
                    inputMode="numeric"
                    aria-label={`Row ${row + 1}, Column ${col + 1}`}
                />
            ) : (
                <span className={`text-lg font-semibold ${editable ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-900 dark:text-neutral-100'}`}>
                    {value !== 0 ? value : ''}
                </span>
            )}
        </button>
    );
}