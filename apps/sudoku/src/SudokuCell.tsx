interface SudokuCellProps {
    value: number;
    editable: boolean;
    selected: boolean;
    isPeer: boolean;
    isSameNumber: boolean;
    hasConflict: boolean;
    solveStep: 'try' | 'backtrack' | null;
    onSelect: () => void;
    row: number;
    col: number;
}

const isInEvenBlock = (row: number, col: number): boolean => {
    const blockRow = Math.floor(row / 3);
    const blockCol = Math.floor(col / 3);
    return (blockRow + blockCol) % 2 === 0;
};

interface CellStyleInputs {
    selected: boolean;
    isPeer: boolean;
    isSameNumber: boolean;
    solveStep: 'try' | 'backtrack' | null;
    inEvenBlock: boolean;
}

const getCellBackground = (inputs: CellStyleInputs): string => {
    if (inputs.solveStep === 'backtrack') return 'bg-red-200 dark:bg-red-900/60';
    if (inputs.solveStep === 'try') return 'bg-amber-200 dark:bg-amber-900/60';
    if (inputs.selected) return 'bg-blue-200 dark:bg-blue-900/70';
    if (inputs.isPeer) return 'bg-stone-100 dark:bg-neutral-800/80';
    if (inputs.isSameNumber) return 'bg-blue-100 dark:bg-blue-900/40';
    if (inputs.inEvenBlock) return 'bg-white dark:bg-neutral-900';
    return 'bg-stone-50 dark:bg-neutral-800';
};

const getTextColor = (hasConflict: boolean, editable: boolean): string => {
    if (hasConflict) return 'text-red-600 dark:text-red-400';
    if (editable) return 'text-blue-700 dark:text-blue-400';
    return 'text-stone-900 dark:text-stone-100';
};

export default function SudokuCell({
    value,
    editable,
    selected,
    isPeer,
    isSameNumber,
    hasConflict,
    solveStep,
    onSelect,
    row,
    col,
}: SudokuCellProps) {
    const inEvenBlock = isInEvenBlock(row, col);
    const backgroundClass = getCellBackground({ selected, isPeer, isSameNumber, solveStep, inEvenBlock });
    const textClass = getTextColor(hasConflict, editable);
    const selectionRing = selected ? 'ring-2 ring-inset ring-blue-600 dark:ring-blue-400 z-10' : '';

    const ariaLabel = value !== 0
        ? `Row ${row + 1}, Column ${col + 1}, value ${value}`
        : `Row ${row + 1}, Column ${col + 1}, empty`;

    return (
        <button
            type="button"
            onClick={onSelect}
            aria-label={ariaLabel}
            className={`
                aspect-square w-full flex items-center justify-center
                ${backgroundClass} ${selectionRing}
                transition-colors duration-150
                focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400
            `}
        >
            <span className={`text-base sm:text-lg font-semibold ${textClass}`}>
                {value !== 0 ? value : ''}
            </span>
        </button>
    );
}
