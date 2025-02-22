import { Box, Button, Chip, Divider, Grid, IconButton, Modal, Sheet, Typography } from '@mui/joy';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, X, Zap } from 'lucide-react';
import { BattlePokemon } from '@/apps/Pokeverse/helpers/battle.types';
import { TYPE_COLORS } from '@/apps/Pokeverse/helpers/constant';
import { getOfficialImage } from '@/apps/Pokeverse/helpers/utilities';

interface SwitchPokemonModalProps {
    open: boolean;
    onClose: () => void;
    activePokemonIndex: number;
    team: BattlePokemon[];
    onSwitch: (index: number) => void;
}

export const SwitchPokemonModal = ({
    open,
    onClose,
    activePokemonIndex,
    team,
    onSwitch
}: SwitchPokemonModalProps) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Sheet
                component={motion.div}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                variant="outlined"
                sx={{
                    maxWidth: 1000,
                    width: 'calc(100% - 64px)',
                    borderRadius: 'lg',
                    p: 3,
                    position: 'relative'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography level="h3" sx={{ flex: 1 }}>
                        Choose Pokemon
                    </Typography>
                    <IconButton
                        variant="plain"
                        onClick={onClose}
                        sx={{
                            ml: 1,
                            '&:hover': {
                                backgroundColor: 'background.level2',
                            }
                        }}
                    >
                        <X />
                    </IconButton>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Grid
                    container
                    spacing={2}
                    sx={{
                        flexGrow: 1,
                        width: '100%'
                    }}
                >
                    <AnimatePresence mode="popLayout">
                        {team.map((pokemon, index) => (
                            <Grid
                                key={pokemon.id}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                component={motion.div}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{
                                    duration: 0.2,
                                    delay: index * 0.05
                                }}
                            >
                                <Sheet
                                    variant="outlined"
                                    sx={{
                                        borderRadius: 'md',
                                        overflow: 'hidden',
                                        opacity: pokemon.currentHP <= 0 ? 0.5 : 1,
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        height: '100%',
                                        position: 'relative',
                                        '&:hover': pokemon.currentHP > 0 && index !== activePokemonIndex ? {
                                            transform: 'translateY(-8px)',
                                            boxShadow: 'md',
                                            borderColor: 'primary.500',
                                            '& .pokemon-image': {
                                                transform: 'scale(1.1)',
                                            }
                                        } : undefined
                                    }}
                                >
                                    <Button
                                        variant="plain"
                                        disabled={index === activePokemonIndex || pokemon.currentHP <= 0}
                                        onClick={() => onSwitch(index)}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: '100%',
                                            height: '100%',
                                            p: 2,
                                            backgroundColor: index === activePokemonIndex ? 'background.level2' : 'transparent',
                                            '&:hover': {
                                                backgroundColor: index === activePokemonIndex ? 'background.level2' : 'background.level1',
                                            }
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                overflow: 'hidden',
                                                borderRadius: 'xs'
                                            }}
                                        >
                                            <img
                                                className="pokemon-image"
                                                src={getOfficialImage(pokemon.id)}
                                                alt={pokemon.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain',
                                                    transition: 'transform 0.3s ease'
                                                }}
                                            />
                                            {index === activePokemonIndex && (
                                                <Chip
                                                    variant="solid" color='warning'
                                                    startDecorator={<Zap size={14} />}
                                                    size="sm"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 0,
                                                    }}
                                                >
                                                    Active
                                                </Chip>
                                            )}
                                        </Box>

                                        <Typography
                                            level="h4"
                                            sx={{
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {pokemon.name}
                                        </Typography>

                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1, mt: 1,
                                        }}>
                                            {pokemon.types.map(type => (
                                                <Chip key={type} size='sm' sx={{
                                                    background: TYPE_COLORS[type],
                                                    textTransform: 'capitalize',
                                                    borderRadius: '4px'
                                                }}>{type}</Chip>
                                            ))}
                                            <Heart size={16} color='red' />
                                            <Typography level="body-sm" sx={{
                                                color: pokemon.currentHP < pokemon.maxHP * 0.3 ? 'danger.500' : 'text.primary'
                                            }}>
                                                {pokemon.currentHP}/{pokemon.maxHP}
                                            </Typography>
                                        </Box>
                                    </Button>
                                </Sheet>
                            </Grid>
                        ))}
                    </AnimatePresence>
                </Grid>
            </Sheet>
        </Modal>
    );
};