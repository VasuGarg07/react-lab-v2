import React from 'react';
import { Grid, Stack, Sheet } from '@mui/joy';
import { GridCell } from './GridCell';

type Board = number[][];

type GameBoardProps = {
    board: Board;
    initialBoard: Board;
    onCellChange: (row: number, col: number, value: string) => void;
};

const boardStyles = {
    container: {
        borderRadius: 'md',
        boxShadow: 'lg',
        p: 2,
    },
    row: {
        mb: 1
    }
};

export const GameBoard: React.FC<GameBoardProps> = ({ board, initialBoard, onCellChange }) => (
    <Sheet
        color='neutral'
        variant='outlined'
        sx={boardStyles.container}
    >
        {board.map((row, rowIndex) => (
            <Stack
                key={rowIndex}
                spacing={1}
                sx={boardStyles.row}
                direction='row'
                alignItems='center'
                justifyContent='center'
            >
                {row.map((_, colIndex) => (
                    <Grid key={`${rowIndex}-${colIndex}`}>
                        <GridCell
                            cell={board[rowIndex][colIndex]}
                            onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
                            editable={!initialBoard[rowIndex][colIndex]}
                        />
                    </Grid>
                ))}
            </Stack>
        ))}
    </Sheet>
);