import React from 'react';
import { Grid, Card } from '@mui/joy';
import { MiniBoardProps, SQ_SIZE } from './helpers';

const MiniBoard: React.FC<MiniBoardProps> = ({ board, onPlay, boardIndex }) => {
    return (
        <Grid container spacing={2} sx={{ width: 4 * SQ_SIZE, height: 4 * SQ_SIZE }}>
            {board.map((row, rIndex) =>
                row.map((cell, cIndex) => (
                    <Grid xs={4} key={`${rIndex}-${cIndex}`}>
                        <Card
                            onClick={() => onPlay(boardIndex, rIndex, cIndex)}
                            sx={{
                                height: SQ_SIZE,
                                width: SQ_SIZE,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                backgroundColor:
                                    cell === 'X'
                                        ? '#f44336'
                                        : cell === 'O'
                                            ? '#2196f3'
                                            : '#fff',
                                color: cell === 'X' ? '#fff' : '#000',
                                fontSize: '1.5rem',
                                userSelect: 'none'
                            }}
                        >
                            {cell}
                        </Card>
                    </Grid>
                ))
            )}
        </Grid>
    );
};

export default MiniBoard;
