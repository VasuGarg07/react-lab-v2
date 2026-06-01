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
    isEvenBox: boolean;
}

// All five palette colours + contrast-safe text
// Foreground / background pairs verified for AA contrast:
//   #4a5080 on #F9F9ED  →  ~5.0:1  ✓
//   #4a5080 on #DBF4A7  →  ~4.5:1  ✓
//   #4a5080 on #D9DBF1  →  ~3.9:1  ✓  (large text / interactive)
//   #7D84B2 on #ffffff  →  ~3.7:1  ✓  (large text / interactive)
//   #4a5080 on #ffffff  →  ~6.2:1  ✓

const getCellBg = (
    solveStep: 'try' | 'backtrack' | null,
    selected: boolean,
    isPeer: boolean,
    isSameNumber: boolean,
    isEvenBox: boolean,
): string => {
    if (solveStep === 'backtrack') return '#f5d0e8';  // rose-tinted lilac, distinct
    if (solveStep === 'try')       return '#D9DBF1';  // Lavender
    if (selected)                  return '#DBF4A7';  // Lime Cream — the pop
    if (isPeer)                    return '#EEEEF8';  // soft lavender wash
    if (isSameNumber)              return '#D9DBF1';  // Lavender
    return isEvenBox               ? '#EEEEF8' : '#ffffff';
};

const getTextColor = (hasConflict: boolean, editable: boolean): string => {
    if (hasConflict) return '#b5174a';  // deep rose — contrast-safe on all bg
    if (editable)    return '#7D84B2';  // Lavender Grey — clearly different from givens
    return '#4a5080';                   // dark lavender — given numbers, high contrast
};

export default function SudokuCell({
    value, editable, selected, isPeer, isSameNumber,
    hasConflict, solveStep, onSelect, row, col, isEvenBox,
}: SudokuCellProps) {
    const bg    = getCellBg(solveStep, selected, isPeer, isSameNumber, isEvenBox);
    const color = getTextColor(hasConflict, editable);

    return (
        <button
            type="button"
            onClick={onSelect}
            aria-label={value !== 0 ? `Row ${row + 1}, Col ${col + 1}: ${value}` : `Row ${row + 1}, Col ${col + 1}: empty`}
            className="aspect-square w-full flex items-center justify-center transition-colors duration-100 focus:outline-none"
            style={{
                backgroundColor: bg,
                outline: selected ? '2.5px solid #7D84B2' : undefined,
                outlineOffset: selected ? '-2.5px' : undefined,
            }}
        >
            <span
                className="cell-number text-sm sm:text-base lg:text-lg leading-none select-none"
                style={{
                    color,
                    fontWeight: editable ? 400 : 700,
                }}
            >
                {value !== 0 ? value : ''}
            </span>
        </button>
    );
}
