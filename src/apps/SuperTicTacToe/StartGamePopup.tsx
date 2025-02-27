import { Box, Button, List, ListItem, Modal, ModalDialog, Typography, useTheme } from '@mui/joy';
import { Swords } from 'lucide-react';
import React from 'react';
import { INSTRUCTIONS } from '@/apps/SuperTicTacToe/tictactoe.helpers';

interface StartGamePopupProps {
    open: boolean;
    onStart: () => void;
}

const StartGamePopup: React.FC<StartGamePopupProps> = ({ open, onStart }) => {
    const mode = useTheme().palette.mode;

    return (
        <Modal
            open={open}
            aria-labelledby="start-game-title"
            aria-describedby="start-game-description"
        >
            <ModalDialog
                aria-labelledby="start-game-title"
                aria-describedby="start-game-description"
                sx={{
                    maxWidth: 499,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Swords size={40} />
                    <Typography
                        id="start-game-title"
                        level="h4"
                        component="h2"
                        fontWeight="lg"
                    >
                        Super Tic Tac Toe
                    </Typography>
                </Box>

                <Typography
                    id="start-game-description"
                    level="body-md"
                    mb={1}
                >
                    Master the ultimate strategy game! Here's how to play:
                </Typography>

                <Box
                    sx={{
                        mb: 3,
                        background: mode == 'dark'
                            ? 'rgba(236, 240, 241, 0.1)'
                            : 'rgba(44, 62, 80, 0.1)',
                        borderRadius: 'md',
                        p: 2
                    }}
                >
                    <List component="ol" sx={{ pl: 2 }}>
                        {INSTRUCTIONS.map((instruction, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    display: 'list-item',
                                    pl: 1,
                                    color: 'white',
                                    '&::marker': { color: '#e74c3c' }
                                }}
                            >
                                <Typography level="body-sm">
                                    {instruction}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="solid"
                        color="success"
                        onClick={onStart}
                        size="lg"
                        sx={{
                            px: 4,
                            py: 1,
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            background: '#27ae60',
                            '&:hover': { background: '#2ecc71' }
                        }}
                    >
                        Start Game
                    </Button>
                </Box>
            </ModalDialog>
        </Modal >
    );
};

export default StartGamePopup;