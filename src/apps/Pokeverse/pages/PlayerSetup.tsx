import {
    Button,
    Card,
    Divider,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Typography,
    useTheme
} from '@mui/joy';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Swords, Trophy } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { BgCenteredBox } from '../../../components/BgCenteredBox';
import { useBattleActions } from '../context/BattleSimContext';
import Dark from '/backgrounds/bg-poke-dark.webp';
import Light from '/backgrounds/bg-poke.png';

export const PlayerSetupScreen = () => {
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    const [focusedPlayer, setFocusedPlayer] = useState<1 | 2 | null>(null);
    const { setPlayerName } = useBattleActions();
    const navigate = useNavigate();
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPlayerName(0, player1Name);
        setPlayerName(1, player2Name);
        navigate('team-selection');
    };

    return (
        <BgCenteredBox bg={isDark ? Dark : Light}>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                    style={{ width: '100%', maxWidth: '800px', padding: '1.5rem' }}
                >
                    <Card
                        variant="outlined"
                        sx={{
                            width: '100%',
                            padding: { xs: 2, sm: 4 },
                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                            borderRadius: '2rem',
                            backdropFilter: 'blur(12px)',
                            border: '3px solid rgba(255,255,255,0.2)',
                            background: `linear-gradient(145deg, 
                                ${isDark ? 'rgba(30,30,30,0.9)' : 'rgba(250,250,250,0.8)'} 0%, 
                                ${isDark ? 'rgba(10,10,10,0.8)' : 'rgba(230,230,230,0.9)'} 100%)`,
                            overflow: 'hidden',
                            position: 'relative'
                        }}
                    >
                        <Stack spacing={5} alignItems="center">
                            <Stack direction='row' spacing={2}>
                                <motion.div
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{ duration: 1.8, repeat: Infinity }}
                                >
                                    <Trophy size={48} color={isDark ? '#ffd700' : '#ffaa00'} />
                                </motion.div>
                                <Typography
                                    level="h2"
                                    sx={{
                                        background: 'linear-gradient(90deg, #ff8c00, #ff0080)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        fontSize: { xs: '2rem', sm: '2.4rem' },
                                        textAlign: 'center',
                                        fontWeight: 800
                                    }}
                                >
                                    Welcome to Battle Sim
                                </Typography>
                            </Stack>

                            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                                <Stack spacing={4} width="100%">
                                    <FormControl required>
                                        <FormLabel
                                            sx={{
                                                color: focusedPlayer === 1 ? 'primary.500' : 'text.secondary',
                                                transition: 'color 0.4s ease'
                                            }}
                                        >
                                            Player 1
                                        </FormLabel>
                                        <Input
                                            placeholder="Enter Player 1 Name"
                                            value={player1Name}
                                            onChange={(e) => setPlayer1Name(e.target.value)}
                                            onFocus={() => setFocusedPlayer(1)}
                                            onBlur={() => setFocusedPlayer(null)}
                                            sx={{
                                                transition: 'transform 0.3s ease',
                                                '&:focus-within': {
                                                    transform: 'scale(1.03)',
                                                    borderColor: 'primary.500'
                                                }
                                            }}
                                            endDecorator={
                                                player1Name && (
                                                    <Sparkles size={20} color="primary" />
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.4)' }}>VS</Divider>
                                    <FormControl required>
                                        <FormLabel
                                            sx={{
                                                color: focusedPlayer === 2 ? 'danger.500' : 'text.secondary',
                                                transition: 'color 0.4s ease'
                                            }}
                                        >
                                            Player 2
                                        </FormLabel>
                                        <Input
                                            placeholder="Enter Player 2 Name"
                                            value={player2Name}
                                            onChange={(e) => setPlayer2Name(e.target.value)}
                                            onFocus={() => setFocusedPlayer(2)}
                                            onBlur={() => setFocusedPlayer(null)}
                                            sx={{
                                                transition: 'transform 0.3s ease',
                                                '&:focus-within': {
                                                    transform: 'scale(1.03)',
                                                    borderColor: 'danger.500'
                                                }
                                            }}
                                            endDecorator={
                                                player2Name && (
                                                    <Sparkles size={20} color="danger" />
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            type="submit"
                                            fullWidth
                                            size="lg"
                                            disabled={!player1Name || !player2Name}
                                            sx={{
                                                padding: '1rem',
                                                background: !player1Name || !player2Name
                                                    ? 'rgba(150,150,150,0.8)'
                                                    : 'linear-gradient(90deg, #6a11cb, #2575fc)',
                                                color: '#fff',
                                                borderRadius: '1rem',
                                                boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                                                '&:hover': {
                                                    background: 'linear-gradient(90deg, #5e0ac9, #1e68d6)'
                                                },
                                                transition: 'all 0.4s ease'
                                            }}
                                            startDecorator={<Swords />}
                                        >
                                            Begin Your Journey
                                        </Button>
                                    </motion.div>
                                </Stack>
                            </form>
                        </Stack>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </BgCenteredBox>
    );
};