interface MiniBoardProps {
    board: string[][];
    onPlay: (boardIndex: string, rowIndex: number, colIndex: number) => void;
    boardIndex: string;
    isPlayable: boolean;
    currentPlayer: 'X' | 'O';
}

const MiniBoard = ({ board, onPlay, boardIndex, isPlayable, currentPlayer }: MiniBoardProps) => {
    return (
        <div
            className="mini-board-grid w-full h-full"
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
                gridTemplateRows: '1fr 1px 1fr 1px 1fr',
            }}
        >
            {board.map((row, rIndex) =>
                row.map((cell, cIndex) => {
                    const isX = cell === 'X';
                    const isO = cell === 'O';
                    const isEmpty = cell === ' ';

                    const cellNode = (
                        <button
                            key={`${rIndex}-${cIndex}`}
                            onClick={() => isPlayable && isEmpty && onPlay(boardIndex, rIndex, cIndex)}
                            disabled={!isEmpty || !isPlayable}
                            className={`
                                w-full h-full flex items-center justify-center
                                select-none transition-colors duration-150
                                focus:outline-none
                                ${isEmpty && isPlayable
                                    ? currentPlayer === 'X'
                                        ? 'hover:bg-x-400/15 cursor-pointer'
                                        : 'hover:bg-o-500/12 cursor-pointer'
                                    : 'cursor-default'
                                }
                            `}
                        >
                            {isX && (
                                <span className="text-[clamp(0.6rem,2.2vw,1.25rem)] font-bold text-x-500 leading-none">
                                    X
                                </span>
                            )}
                            {isO && (
                                <span className="text-[clamp(0.6rem,2.2vw,1.25rem)] font-bold text-o-500 leading-none">
                                    O
                                </span>
                            )}
                        </button>
                    );

                    const nodes: React.ReactNode[] = [cellNode];

                    // Vertical divider after col 0 and col 1
                    if (cIndex < 2) {
                        nodes.push(
                            <div key={`v-${rIndex}-${cIndex}`} className="mini-board-line-v" />
                        );
                    }

                    return nodes;
                })
            )}
            {/* Horizontal dividers after row 0 and row 1 */}
            {[0, 1].map(rowIdx => (
                Array.from({ length: 5 }, (_, k) => (
                    <div
                        key={`h-${rowIdx}-${k}`}
                        className={k % 2 === 0 ? 'mini-board-line-h' : ''}
                        style={{ gridRow: rowIdx === 0 ? 2 : 4 }}
                    />
                ))
            ))}
        </div>
    );
};

export default MiniBoard;
