interface MiniBoardProps {
    board: string[][];
    onPlay: (boardIndex: string, rowIndex: number, colIndex: number) => void;
    boardIndex: string;
}

const MiniBoard = ({ board, onPlay, boardIndex }: MiniBoardProps) => {
    return (
        <div className="grid grid-cols-3 gap-1 aspect-square w-full">
            {board.map((row, rIndex) =>
                row.map((cell, cIndex) => {
                    const isX = cell === 'X';
                    const isO = cell === 'O';
                    const isEmpty = cell === ' ';

                    return (
                        <button
                            key={`${rIndex}-${cIndex}`}
                            onClick={() => onPlay(boardIndex, rIndex, cIndex)}
                            disabled={!isEmpty}
                            className={`
                                aspect-square flex items-center justify-center 
                                text-lg sm:text-xl font-semibold select-none 
                                rounded-md transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0
                                ${isEmpty
                                    ? 'bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 cursor-pointer shadow-sm'
                                    : 'cursor-not-allowed'
                                }
                                ${isX ? 'bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400' : ''}
                                ${isO ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-500 dark:text-blue-400' : ''}
                            `}
                        >
                            {cell !== ' ' && cell}
                        </button>
                    );
                })
            )}
        </div>
    );
};

export default MiniBoard;
