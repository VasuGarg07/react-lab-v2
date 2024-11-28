import React from 'react';
import { Sheet, Typography, Button, Divider, Stack } from '@mui/joy';
import { RotateCcw, Lightbulb, PlayCircle } from 'lucide-react';

interface SudokuHeaderProps {
    onNewGame: () => Promise<void>;
    onHint: () => void;
    onSolve: () => void;
}

const SudokuHeader: React.FC<SudokuHeaderProps> = ({ onNewGame, onHint, onSolve }) => {
    return (
        <Sheet
            variant="outlined"
            sx={{
                borderRadius: 'lg',
                p: 2,
                my: 2,
                background: 'background.surface',
                boxShadow: 'sm',
            }}
        >
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ width: '100%' }}
            >
                <Typography
                    level="h2"
                    sx={{
                        fontSize: 'xl2',
                        fontWeight: 'lg',
                        color: 'primary.plainColor',
                    }}
                >
                    Sudoku Solver
                </Typography>

                <Divider orientation="vertical" />

                <Stack direction="row" spacing={1}>
                    <Button
                        size="sm"
                        variant="outlined"
                        color="neutral"
                        startDecorator={<RotateCcw size={18} />}
                        onClick={onNewGame}
                        sx={{
                            '&:hover': {
                                background: 'neutral.softHoverBg',
                            },
                        }}
                    >
                        New Game
                    </Button>

                    <Button
                        size="sm"
                        variant="outlined"
                        color="warning"
                        startDecorator={<Lightbulb size={18} />}
                        onClick={onHint}
                        sx={{
                            '&:hover': {
                                background: 'warning.softHoverBg',
                            },
                        }}
                    >
                        Hint
                    </Button>

                    <Button
                        size="sm"
                        variant="outlined"
                        color="success"
                        startDecorator={<PlayCircle size={18} />}
                        onClick={onSolve}
                        sx={{
                            '&:hover': {
                                background: 'success.softHoverBg',
                            },
                        }}
                    >
                        Solve
                    </Button>
                </Stack>
            </Stack>
        </Sheet>
    );
};

export default SudokuHeader;