import React from 'react';
import { Box, Typography, Button, Stack, List, ListItem, useTheme } from '@mui/joy';
import { Gamepad2 } from 'lucide-react';

interface SidebarComponentProps {
    gameWinner: string | null;
    currentPlayer: 'X' | 'O';
    timer: number;
    handleRestartGame: () => void;
    Instructions: string[];
    COLOR_X: string;
    COLOR_O: string;
}

const Sidebar: React.FC<SidebarComponentProps> = ({
    gameWinner,
    currentPlayer,
    timer,
    handleRestartGame,
    Instructions,
    COLOR_X,
    COLOR_O
}) => {
    const theme = useTheme();
    const isDarkTheme = theme.palette.mode === 'dark';

    return (
        <Stack
            sx={{
                height: 1,
                p: 4,
                borderRadius: 'lg',
                bgcolor: 'background.surface',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '& > *:not(:last-child)': {
                    mb: 3
                }
            }}
        >
            <Typography
                level="h2"
                fontSize={32}
                textAlign="center"
                fontWeight="bold"
                sx={{
                    background: isDarkTheme
                        ? 'linear-gradient(45deg, #bc4e9c, #f80759)'
                        : 'linear-gradient(45deg, #4e54c8, #8f94fb)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                }}
            >
                SUPER TIC TAC TOE
            </Typography>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    p: 2,
                    borderRadius: 'md',
                    bgcolor: isDarkTheme ? 'background.level1' : 'background.level2',
                }}
            >
                <Box>
                    <Typography level="body-sm" mb={1}>
                        Current Player
                    </Typography>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: currentPlayer === 'X' ? '#000' : '#fff',
                            bgcolor: currentPlayer === 'X' ? COLOR_X : COLOR_O,
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                        }}
                    >
                        {currentPlayer}
                    </Box>
                </Box>
                <Box>
                    <Typography level="body-sm" mb={1}>
                        Time Left
                    </Typography>
                    <Typography
                        level="h4"
                        sx={{
                            color: timer <= 5 ? 'danger.500' : 'success.500',
                        }}
                    >
                        {timer}s
                    </Typography>
                </Box>
            </Stack>

            <Button
                variant="soft"
                color="primary"
                startDecorator={<Gamepad2 />}
                onClick={handleRestartGame}
                sx={{
                    width: '100%',
                    py: 1.5,
                    fontWeight: 'bold',
                    transition: 'all 0.2s',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    }
                }}
            >
                Restart Game
            </Button>

            {gameWinner && (
                <Typography
                    level="h4"
                    textAlign="center"
                    sx={{
                        color: gameWinner === 'X' ? COLOR_X : COLOR_O,
                        fontWeight: 'bold',
                        p: 2,
                        borderRadius: 'md',
                        bgcolor: isDarkTheme ? 'background.level1' : 'background.level2',
                    }}
                >
                    Player {gameWinner} wins the game!
                </Typography>
            )}

            <Typography level="title-lg" fontWeight="bold" mb={2}>
                How to Play:
            </Typography>
            <List
                component="ol"
                marker="decimal"
                sx={{
                    pl: 2,
                    '& li': {
                        pl: 1,
                        pb: 1,
                    }
                }}
            >
                {Instructions.map((str, i) => (
                    <ListItem key={i}>
                        <Typography level="body-sm">{str}</Typography>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
};

export default Sidebar;