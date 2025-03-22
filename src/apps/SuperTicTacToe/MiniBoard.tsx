import React from 'react';
import { COLOR_O, COLOR_X, MiniBoardProps } from '@/apps/SuperTicTacToe/tictactoe.helpers';

const getCellStyle = (cell: string | null) => {
    return {
        backgroundColor: cell === 'X' ? COLOR_X : cell === 'O' ? COLOR_O : 'white',
        color: cell === 'X' ? 'white' : 'black',
    };
};


const MiniBoard: React.FC<MiniBoardProps> = ({ board, onPlay, boardIndex }) => {
    return (
        <div className="grid grid-cols-3 gap-1.5 aspect-square w-full min-w-[120px] md:min-w-[150px] lg:min-w-[180px]">
            {board.map((row, rIndex) =>
                row.map((cell, cIndex) => (
                    <button
                        key={`${rIndex}-${cIndex}`}
                        onClick={() => onPlay(boardIndex, rIndex, cIndex)}
                        className="aspect-square flex items-center justify-center text-xl md:text-2xl font-medium select-none rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        style={getCellStyle(cell)}
                    >
                        {cell}
                    </button>
                ))
            )}
        </div>
    );
};

export default MiniBoard;