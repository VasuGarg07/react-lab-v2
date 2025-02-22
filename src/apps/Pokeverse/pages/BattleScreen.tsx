import { Box, Button, CircularProgress, Sheet, Stack, Typography, useTheme } from '@mui/joy';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Flag, Sword } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BgCenteredBox } from '../../../components/BgCenteredBox';
import { GameOverModal } from '../components/GameOverModal';
import PokemonBattleCard from '../components/PokemonBattleCard';
import { SwitchPokemonModal } from '../components/SwitchPokemonModal';
import { useBattle, useBattleActions } from '../context/BattleSimContext';
import { TYPE_COLORS } from '../helpers/constant';
import Dark from '/backgrounds/bg-poke-dark.webp';
import Light from '/backgrounds/bg-poke.png';

export const BattleScreen = () => {
    const [showSwitchModal, setShowSwitchModal] = useState(false);
    const { state } = useBattle();
    const { selectMove, switchPokemon, forfeit, endTurn } = useBattleActions();
    const navigate = useNavigate();
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const currentPlayer = state.players[state.currentPlayerTurn];
    const opposingPlayer = state.players[1 - state.currentPlayerTurn];
    const activePokemon = currentPlayer.team[currentPlayer.activePokemon];
    const opposingPokemon = opposingPlayer.team[opposingPlayer.activePokemon];

    const handleMoveSelect = (moveIndex: number) => {
        selectMove(state.currentPlayerTurn, moveIndex);
        endTurn();
    };

    const handleSwitch = (pokemonIndex: number) => {
        switchPokemon(state.currentPlayerTurn, pokemonIndex);
        setShowSwitchModal(false);
        endTurn();
    };

    if (!activePokemon || !opposingPokemon) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress size="lg" />
            </Box>
        );
    }

    return (
        <BgCenteredBox bg={isDark ? Dark : Light}>
            <Box width={1}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, my: 2 }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`opponent-${opposingPokemon.id}`}
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ type: 'spring', duration: 0.5 }}
                        >
                            <PokemonBattleCard pokemon={opposingPokemon} isOpponent />
                        </motion.div>

                        <motion.div
                            key={`player-${activePokemon.id}`}
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 100, opacity: 0 }}
                            transition={{ type: 'spring', duration: 0.5 }}
                        >
                            <PokemonBattleCard pokemon={activePokemon} />
                        </motion.div>
                    </AnimatePresence>
                </Box>

                <Sheet
                    variant="outlined"
                    sx={{
                        p: 1.5,
                        borderRadius: 'xl',
                        background: theme.vars.palette.background.surface,
                        borderColor: 'neutral.outlinedBorder',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <Stack direction="row" spacing={1.5}>
                        {/* Moves Section */}
                        <Box sx={{ flex: 1 }}>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: 1
                                }}
                            >
                                {activePokemon.selectedMoves.map((move, index) => (
                                    <Button
                                        key={move.id}
                                        size="md"
                                        variant="soft"
                                        onClick={() => handleMoveSelect(index)}
                                        disabled={currentPlayer.hasActed || state.phase === 'ENDED'}
                                        sx={{
                                            bgcolor: `${TYPE_COLORS[move.type]}40`,
                                            color: theme.vars.palette.background.surface,
                                            borderRadius: 'md',
                                            p: 1.5,
                                            height: '80px',
                                            transition: 'all 0.2s',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            background: `linear-gradient(135deg, ${TYPE_COLORS[move.type]}40, ${TYPE_COLORS[move.type]}60)`,
                                            border: '1px solid',
                                            borderColor: `${TYPE_COLORS[move.type]}70`,
                                            '&:hover': {
                                                bgcolor: `${TYPE_COLORS[move.type]}50`,
                                                transform: 'translateY(-2px)',
                                                '& .move-icon': {
                                                    transform: 'rotate(15deg) scale(1.1)'
                                                }
                                            },
                                            '&:disabled': {
                                                opacity: 0.5,
                                                transform: 'none'
                                            }
                                        }}
                                    >
                                        {/* Background Icon */}
                                        <Box sx={{
                                            position: 'absolute',
                                            right: -15,
                                            top: -15,
                                            opacity: 0.15,
                                            color: 'white'
                                        }}>
                                            <Sword
                                                size={80}
                                                className="move-icon"
                                                style={{
                                                    transition: 'transform 0.3s ease'
                                                }}
                                            />
                                        </Box>

                                        {/* Move Content */}
                                        <Stack
                                            direction="row"
                                            spacing={1.5}
                                            sx={{
                                                width: '100%',
                                                alignItems: 'center',
                                                zIndex: 1
                                            }}
                                        >
                                            {/* Main Move Icon */}
                                            <Box
                                                sx={{
                                                    bgcolor: 'rgba(255,255,255,0.2)',
                                                    borderRadius: '50%',
                                                    p: 0.8,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <Sword size={24} style={{ color: 'white' }} />
                                            </Box>

                                            {/* Move Info */}
                                            <Stack spacing={0.5} alignItems="flex-start" sx={{ flex: 1 }}>
                                                <Typography
                                                    sx={{
                                                        textTransform: 'capitalize',
                                                        fontWeight: 700,
                                                        fontSize: '1rem',
                                                        lineHeight: 1.2,
                                                        color: 'white',
                                                        textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                                                    }}
                                                >
                                                    {move.name}
                                                </Typography>
                                                <Stack
                                                    direction="row"
                                                    spacing={0.5}
                                                    alignItems="center"
                                                    sx={{
                                                        bgcolor: 'rgba(0,0,0,0.2)',
                                                        borderRadius: 'sm',
                                                        px: 1,
                                                        py: 0.2
                                                    }}
                                                >
                                                    <Typography
                                                        level="body-sm"
                                                        sx={{
                                                            fontSize: '0.85rem',
                                                            color: 'white',
                                                            opacity: 0.9,
                                                            fontWeight: 600,
                                                            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                                                        }}
                                                    >
                                                        PWR {move.power}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Button>
                                ))}
                            </Box>
                        </Box>

                        {/* Controls Section */}
                        <Stack spacing={1} sx={{ width: '110px' }}>
                            <Button
                                variant="outlined"
                                color="neutral"
                                onClick={() => setShowSwitchModal(true)}
                                disabled={state.phase === 'ENDED'}
                                sx={{
                                    flexDirection: 'column',
                                    gap: 0.5,
                                    height: '80px',
                                    px: 1,
                                    borderWidth: 2,
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        borderWidth: 2
                                    }
                                }}
                            >
                                <ChevronRight size={22} />
                                <Typography level="body-sm" sx={{ fontSize: '0.9rem' }}>
                                    Switch
                                </Typography>
                            </Button>
                            <Button
                                variant="soft"
                                color="danger"
                                onClick={() => forfeit(state.currentPlayerTurn)}
                                disabled={state.phase === 'ENDED'}
                                sx={{
                                    flexDirection: 'column',
                                    gap: 0.5,
                                    height: '80px',
                                    px: 1,
                                    background: 'linear-gradient(135deg, #ff4d4d, #ff1a1a)',
                                    color: 'white',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        background: 'linear-gradient(135deg, #ff6666, #ff3333)'
                                    }
                                }}
                            >
                                <Flag size={22} />
                                <Typography level="body-sm" sx={{ fontSize: '0.9rem' }}>
                                    Forfeit
                                </Typography>
                            </Button>
                        </Stack>
                    </Stack>
                </Sheet>
            </Box>

            <SwitchPokemonModal
                open={showSwitchModal}
                onClose={() => setShowSwitchModal(false)}
                activePokemonIndex={currentPlayer.activePokemon}
                team={currentPlayer.team}
                onSwitch={handleSwitch}
            />

            <GameOverModal
                open={state.phase === 'ENDED'}
                winner={state.winner || ''}
                onReturnHome={() => navigate('/pokeverse')}
                onRestart={() => navigate('/pokeverse/battle-sim')}
            />
        </BgCenteredBox>
    );
};