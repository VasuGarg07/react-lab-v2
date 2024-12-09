import { Box, Button, Modal, ModalDialog, Sheet, Stack, Typography } from '@mui/joy';
import { motion } from 'framer-motion';
import { Home, RotateCcw, Trophy } from 'lucide-react';

interface GameOverModalProps {
    open: boolean;
    winner: string;
    onRestart?: () => void;
    onReturnHome: () => void;
}

export const GameOverModal = ({
    open,
    winner,
    onRestart,
    onReturnHome
}: GameOverModalProps) => {
    return (
        <Modal
            open={open}
            onClose={() => { }}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2
            }}
        >
            <ModalDialog
                layout="center"
                variant="outlined"
                sx={{
                    minWidth: { xs: '90%', sm: 400 },
                    maxWidth: 450,
                    borderRadius: 'xl',
                    boxShadow: 'lg',
                    p: 0,
                    overflow: 'hidden'
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        type: "spring",
                        duration: 0.5
                    }}
                >
                    <Stack>
                        {/* Top celebration banner */}
                        <Sheet
                            sx={{
                                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                                p: 3,
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            <motion.div
                                initial={{ rotate: -180, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                transition={{
                                    type: "spring",
                                    delay: 0.2,
                                    duration: 0.7
                                }}
                            >
                                <Trophy size={40} style={{ color: '#FFF' }} />
                            </motion.div>

                            <Typography
                                level="h2"
                                sx={{
                                    color: '#FFF',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                    fontWeight: 800
                                }}
                            >
                                Game Over!
                            </Typography>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Typography
                                    level="h4"
                                    sx={{
                                        color: '#FFF',
                                        textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                                    }}
                                >
                                    {winner === 'Draw' ? "It's a draw!" : `${winner} wins!`}
                                </Typography>
                            </motion.div>

                            {/* Celebration Pikachu */}
                            <motion.img
                                src="/game-won.png"
                                alt="Celebrating Pikachu"
                                style={{
                                    width: '140px',
                                    height: '140px',
                                    marginTop: '8px',
                                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                                }}
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    type: "spring",
                                    delay: 0.4,
                                    duration: 0.6
                                }}
                            />

                            {/* Decorative circles in background */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    overflow: 'hidden',
                                    zIndex: 0,
                                    opacity: 0.1,
                                }}
                            >
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        style={{
                                            position: 'absolute',
                                            borderRadius: '50%',
                                            background: '#FFF',
                                            width: '100px',
                                            height: '100px',
                                            top: Math.random() * 100 + '%',
                                            left: Math.random() * 100 + '%',
                                        }}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 0.8 }}
                                        transition={{
                                            delay: i * 0.1,
                                            duration: 0.5
                                        }}
                                    />
                                ))}
                            </Box>
                        </Sheet>

                        {/* Action buttons */}
                        <Sheet sx={{ p: 3 }}>
                            <Stack spacing={2}>
                                {onRestart && (
                                    <Button
                                        variant="outlined"
                                        color="neutral"
                                        size="lg"
                                        startDecorator={<RotateCcw />}
                                        onClick={onRestart}
                                        sx={{
                                            '--Button-gap': '12px',
                                            transition: 'transform 0.2s',
                                            '&:hover': {
                                                transform: 'translateY(-2px)'
                                            }
                                        }}
                                    >
                                        Play Again
                                    </Button>
                                )}
                                <Button
                                    variant="solid"
                                    color="warning"
                                    size="lg"
                                    startDecorator={<Home />}
                                    onClick={onReturnHome}
                                    sx={{
                                        '--Button-gap': '12px',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-2px)'
                                        }
                                    }}
                                >
                                    Return to Home
                                </Button>
                            </Stack>
                        </Sheet>
                    </Stack>
                </motion.div>
            </ModalDialog>
        </Modal>
    );
};