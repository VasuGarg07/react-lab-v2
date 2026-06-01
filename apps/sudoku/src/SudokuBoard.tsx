import { BOX_SIZE } from './sudoku.constants';
import SudokuCell from './SudokuCell';
import { useSudoku } from './useSudoku';

type Sudoku = ReturnType<typeof useSudoku>;

export function SudokuBoard({ sudoku }: { sudoku: Sudoku }) {
    const boxes = Array.from({ length: BOX_SIZE * BOX_SIZE }, (_, i) => i);

    return (
        <div
            className="rounded-2xl p-3 w-full"
            style={{
                backgroundColor: '#ffffff',
                border: '1px solid #D9DBF1',
                boxShadow: '0 8px 32px rgba(125,132,178,0.12)',
            }}
        >
            <div
                className="grid grid-cols-3 aspect-square rounded-xl overflow-hidden"
                style={{ border: '2.5px solid #7D84B2' }}
            >
                {boxes.map(boxIndex => (
                    <BoxOfNine key={boxIndex} boxIndex={boxIndex} sudoku={sudoku} />
                ))}
            </div>
        </div>
    );
}

function BoxOfNine({ boxIndex, sudoku }: { boxIndex: number; sudoku: Sudoku }) {
    const boxRow = Math.floor(boxIndex / BOX_SIZE);
    const boxCol = boxIndex % BOX_SIZE;
    const isEvenBox = (boxRow + boxCol) % 2 === 0;
    const cells = Array.from({ length: BOX_SIZE * BOX_SIZE }, (_, i) => i);

    return (
        <div
            className="grid grid-cols-3"
            style={{
                backgroundColor: isEvenBox ? '#EEEEF8' : '#ffffff',
                border: '1px solid #8E9DCC',
            }}
        >
            {cells.map(cellIndex => {
                const localRow = Math.floor(cellIndex / BOX_SIZE);
                const localCol = cellIndex % BOX_SIZE;
                const row = boxRow * BOX_SIZE + localRow;
                const col = boxCol * BOX_SIZE + localCol;
                return (
                    <CellWithBorder key={`${row},${col}`} row={row} col={col} sudoku={sudoku} isEvenBox={isEvenBox} />
                );
            })}
        </div>
    );
}

function CellWithBorder({ row, col, sudoku, isEvenBox }: { row: number; col: number; sudoku: Sudoku; isEvenBox: boolean }) {
    const key = `${row},${col}`;
    const isSelected = sudoku.selectedCell?.row === row && sudoku.selectedCell?.col === col;
    const solveStep = sudoku.solvingState.currentStep?.row === row && sudoku.solvingState.currentStep?.col === col
        ? sudoku.solvingState.currentStep.kind
        : null;

    return (
        <div style={{ border: '1px solid #D9DBF1' }}>
            <SudokuCell
                value={sudoku.board[row][col]}
                editable={sudoku.isEditable(row, col)}
                selected={isSelected}
                isPeer={sudoku.peerCells.has(key)}
                isSameNumber={sudoku.sameNumberCells.has(key)}
                hasConflict={sudoku.conflictCells.has(key)}
                solveStep={solveStep}
                onSelect={() => sudoku.selectCell(row, col)}
                row={row}
                col={col}
                isEvenBox={isEvenBox}
            />
        </div>
    );
}
