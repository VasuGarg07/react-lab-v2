import { Box, Button, CircularProgress, List, Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy';
import { useColorScheme } from '@mui/joy/styles';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowLeft,
    Binary,
    Dices,
    FileSpreadsheet,
    Sparkles,
    Swords, Wand2
} from 'lucide-react';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    AnimatedTypeBadge,
    FormCard,
    MoveItem,
    SpriteGallery
} from '../components/PokemonUI';
import { BASE_API, TYPE_COLORS } from '../helpers/constant';
import { PokemonDetail } from '../helpers/types';
import useCacheApi from '../helpers/useCacheApi';

const PokemonDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { mode } = useColorScheme();
    const isDarkMode = mode === 'dark';
    const [activeTab, setActiveTab] = useState(0);
    const [selectedMoveIndex, setSelectedMoveIndex] = useState<number | null>(null);

    const { data: pokemon, loading, error } = useCacheApi<PokemonDetail>(
        `${BASE_API}pokemon/${id}`
    );

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: 'calc(100vh - 52px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isDarkMode
                        ? 'linear-gradient(135deg, #13151a 0%, #1a1d24 50%, #22252d 100%)'
                        : 'linear-gradient(135deg, #f8f9fc 0%, #eef1f8 50%, #e4e8f4 100%)'
                }}
            >
                <CircularProgress size="lg" />
            </Box>
        );
    }

    if (error || !pokemon) {
        return (
            <Box sx={{
                minHeight: 'calc(100vh - 52px)',
                p: 4,
                background: isDarkMode
                    ? 'linear-gradient(135deg, #13151a 0%, #1a1d24 50%, #22252d 100%)'
                    : 'linear-gradient(135deg, #f8f9fc 0%, #eef1f8 50%, #e4e8f4 100%)'
            }}>
                <Button
                    onClick={() => navigate(-1)}
                    startDecorator={<ArrowLeft size={16} />}
                    sx={{ mb: 2 }}
                >
                    Back
                </Button>
                <Typography level="h3">Pokemon not found</Typography>
            </Box>
        );
    }

    return (
        <AnimatePresence mode="wait">
            <Box
                component={motion.div}
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                sx={{
                    minHeight: 'calc(100vh - 52px)',
                    background: isDarkMode
                        ? 'linear-gradient(135deg, #13151a 0%, #1a1d24 50%, #22252d 100%)'
                        : 'linear-gradient(135deg, #f8f9fc 0%, #eef1f8 50%, #e4e8f4 100%)',
                    p: { xs: 2, md: 4 }
                }}
            >
                {/* Top Navigation */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 4
                }}>
                    <Button
                        onClick={() => navigate(-1)}
                        startDecorator={<ArrowLeft size={16} />}
                        variant="soft"
                    >
                        Back to Pokédex
                    </Button>
                </Box>

                {/* Main Content Grid */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: '400px 1fr' },
                    gap: 4
                }}>
                    {/* Left Column - Pokemon Image and Basic Info */}
                    <Box>
                        {/* Pokemon Image Card */}
                        <Box sx={{
                            position: 'relative',
                            aspectRatio: '1',
                            mb: 3,
                            borderRadius: '30px',
                            overflow: 'hidden',
                            bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                            border: '1px solid',
                            borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
                        }}>
                            {/* Background Gradient */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: `
                            radial-gradient(circle at 50% 50%, ${TYPE_COLORS[pokemon.types[0].type.name]}40, transparent 100%)
                        `,
                                    opacity: 1,
                                    transition: 'opacity 0.3s ease',
                                }}
                            />
                            {/* Pokemon Number */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '16px',
                                    right: '16px',
                                    zIndex: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                }}
                            >
                                <Sparkles
                                    size={18}
                                    fill={TYPE_COLORS[pokemon.types[0].type.name]}
                                    color={TYPE_COLORS[pokemon.types[0].type.name]}
                                />
                                <Typography
                                    level="title-lg"
                                    sx={{
                                        color: TYPE_COLORS[pokemon.types[0].type.name],
                                        fontFamily: 'monospace',
                                        fontWeight: 'bold',
                                        fontSize: '1.2rem',
                                    }}
                                >
                                    #{pokemon.id.toString().padStart(3, '0')}
                                </Typography>
                            </Box>

                            <motion.img
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                src={pokemon.sprites.other['official-artwork'].front_default}
                                alt={pokemon.name}
                                style={{
                                    position: 'absolute',
                                    width: '90%',
                                    height: '90%',
                                    left: '5%',
                                    top: '5%',
                                    objectFit: 'contain'
                                }}
                            />
                        </Box>

                        {/* Name and Types */}
                        <Typography
                            level="h1"
                            sx={{
                                textTransform: 'capitalize',
                                textAlign: 'center',
                                mb: 2
                            }}
                        >
                            {pokemon.name}
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 2,
                            mb: 3
                        }}>
                            {pokemon.types.map(({ type }) => (
                                <AnimatedTypeBadge
                                    key={type.name}
                                    type={type.name}
                                    color={TYPE_COLORS[type.name]}
                                />
                            ))}
                        </Box>

                        {/* Cries */}
                        {/* {pokemon.cries && (
                            <Box sx={{
                                display: 'flex',
                                gap: 2,
                                mb: 3
                            }}>
                                <AudioPlayer src={pokemon.cries.latest} label="Latest Cry" />
                                {pokemon.cries.legacy && (
                                    <AudioPlayer src={pokemon.cries.legacy} label="Legacy Cry" />
                                )}
                            </Box>
                        )} */}

                    </Box>

                    {/* Right Column - Details Tabs */}
                    <Box sx={{
                        bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '24px',
                        p: 2,
                        height: 'fit-content'
                    }}>
                        <Tabs value={activeTab} onChange={(_, value) => value !== null && setActiveTab(+value)}>
                            <TabList>
                                <Tab><Binary size={16} />Info</Tab>
                                <Tab><Swords size={16} />Moves</Tab>
                                <Tab><FileSpreadsheet size={16} />Base Stats</Tab>
                                <Tab><Dices size={16} />Forms</Tab>
                            </TabList>

                            {/* Info Tab */}
                            <TabPanel value={0}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    <Box>
                                        <Typography level="title-lg" sx={{ mb: 2 }}>Characteristics</Typography>
                                        <Box sx={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                            gap: 2
                                        }}>
                                            <Box sx={{
                                                p: 2,
                                                borderRadius: '12px',
                                                bgcolor: 'background.backdrop'
                                            }}>
                                                <Typography level="body-xs">Height</Typography>
                                                <Typography level="h4">{pokemon.height / 10}m</Typography>
                                            </Box>
                                            <Box sx={{
                                                p: 2,
                                                borderRadius: '12px',
                                                bgcolor: 'background.backdrop'
                                            }}>
                                                <Typography level="body-xs">Weight</Typography>
                                                <Typography level="h4">{pokemon.weight / 10}kg</Typography>
                                            </Box>
                                            <Box sx={{
                                                p: 2,
                                                borderRadius: '12px',
                                                bgcolor: 'background.backdrop'
                                            }}>
                                                <Typography level="body-xs">Base Experience</Typography>
                                                <Typography level="h4">{pokemon.base_experience}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box>
                                        <Typography level="title-lg" sx={{ mb: 2 }}>Abilities</Typography>
                                        <Box sx={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                            gap: 2
                                        }}>
                                            {pokemon.abilities.map(({ ability, is_hidden }) => (
                                                <Box
                                                    key={ability.name}
                                                    sx={{
                                                        p: 2,
                                                        borderRadius: '12px',
                                                        bgcolor: 'background.backdrop',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1
                                                    }}
                                                >
                                                    <Wand2 size={16} />
                                                    <Box>
                                                        <Typography sx={{ textTransform: 'capitalize' }}>
                                                            {ability.name.replace('-', ' ')}
                                                        </Typography>
                                                        {is_hidden && (
                                                            <Typography level="body-xs" sx={{ color: 'warning.500' }}>
                                                                Hidden Ability
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>

                                    <Box>
                                        <Typography level="title-lg" sx={{ mb: 2 }}>Sprites</Typography>
                                        <SpriteGallery sprites={pokemon.sprites} />
                                    </Box>
                                </Box>
                            </TabPanel>

                            {/* Moves Tab */}
                            <TabPanel value={1}>
                                <List
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                        gap: 2
                                    }}
                                >
                                    {pokemon.moves.map((move, index) => (
                                        <MoveItem
                                            key={move.move.name}
                                            name={move.move.name}
                                            expanded={selectedMoveIndex === index}
                                            onToggle={() => setSelectedMoveIndex(
                                                selectedMoveIndex === index ? null : index
                                            )}
                                        />
                                    ))}
                                </List>
                            </TabPanel>

                            {/* Stats Tab */}
                            <TabPanel value={2}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    {pokemon.stats.map((stat) => (
                                        <Box key={stat.stat.name}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography sx={{ textTransform: 'capitalize' }}>
                                                    {stat.stat.name.replace('-', ' ')}
                                                </Typography>
                                                <Typography>{stat.base_stat}</Typography>
                                            </Box>
                                            <Box sx={{
                                                height: '12px',
                                                bgcolor: 'background.backdrop',
                                                borderRadius: '6px',
                                                overflow: 'hidden'
                                            }}>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(stat.base_stat / 255) * 100}%` }}
                                                    transition={{ duration: 1 }}
                                                    style={{
                                                        height: '100%',
                                                        background: TYPE_COLORS[pokemon.types[0].type.name]
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </TabPanel>

                            {/* Forms Tab */}
                            <TabPanel value={3}>
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: 2
                                }}>
                                    {pokemon.forms.map((form) => (
                                        <FormCard
                                            key={form.name}
                                            name={form.name}
                                            url={form.url}
                                        />
                                    ))}
                                </Box>
                            </TabPanel>
                        </Tabs>
                    </Box>
                </Box>
            </Box>
        </AnimatePresence>
    );
};

export default PokemonDetails;