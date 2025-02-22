import { Box, Button, CircularProgress, Container, Grid, Sheet, Stack, Typography, useColorScheme } from '@mui/joy';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader, Swords, Users } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PokemonSelectionCard } from '@/apps/Pokeverse/components/PokemonSelectionCard';
import { useBattle, useBattleActions } from '@/apps/Pokeverse/context/BattleSimContext';
import { usePokedex } from '@/apps/Pokeverse/context/PokedexContext';
import { Move } from '@/apps/Pokeverse/helpers/battle.types';
import { BASE_API, END_POINT, REGION_DATA } from '@/apps/Pokeverse/helpers/constant';
import { PokemonDetail } from '@/apps/Pokeverse/helpers/response.types';
import { BattleSimUtils, DexUtils, getIdFromUrl, scrollToTop } from '@/apps/Pokeverse/helpers/utilities';
import useCacheApi from '@/apps/Pokeverse/hooks/useCacheApi';

interface PokemonListItem {
    name: string;
    url: string;
}

interface PokemonListResponse {
    results: PokemonListItem[];
}

interface MoveApiResponse {
    id: number;
    name: string;
    type: { name: string };
    power: number | null;
    accuracy: number | null;
    damage_class: { name: string };
}

export const TeamSelectionScreen = () => {
    const [selectedPokemon1, setSelectedPokemon1] = useState<number[]>([]);
    const [selectedPokemon2, setSelectedPokemon2] = useState<number[]>([]);
    const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
    const [selectedRegion, setSelectedRegion] = useState(REGION_DATA[0]);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);

    const { state } = useBattle();
    const { addPokemonToTeam, startBattle } = useBattleActions();
    const { getPokemonById } = usePokedex();
    const navigate = useNavigate();
    const { mode } = useColorScheme();

    const { data, loading, error } = useCacheApi<PokemonListResponse>(
        `${BASE_API}pokemon?limit=1015`,
        { cacheTime: 15 * 60 * 1000 }
    );

    const fetchMoveDetails = async (moveUrl: string): Promise<Move> => {
        const moveData: MoveApiResponse = (await axios(moveUrl)).data;

        return {
            id: moveData.id,
            name: moveData.name,
            type: moveData.type.name,
            power: moveData.power || 50,
            accuracy: moveData.accuracy || 100,
            category: moveData.damage_class.name === 'physical' ? 'Physical' : 'Special'
        };
    };

    const fetchPokemonDetails = async (id: number) => {
        let cachedPokemon = getPokemonById(Number(id)) || DexUtils.createPokemon(Number(id), `Pokemon-${id}`);

        if (!cachedPokemon.fetchedApis.has(END_POINT.details)) {
            const { data: details } = await axios.get<PokemonDetail>(`${BASE_API}pokemon/${id}`);
            DexUtils.updateDetails(cachedPokemon, details);
        }

        // Get the first 4 moves and fetch their details
        const movePromises = cachedPokemon.moves
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map(m => fetchMoveDetails(m.url));
        const moves = await Promise.all(movePromises);

        return BattleSimUtils.formatPokemonData(cachedPokemon, moves);
    };

    const handlePokemonSelect = (id: number) => {
        if (currentPlayer === 1) {
            if (selectedPokemon1.includes(id)) {
                setSelectedPokemon1(prev => prev.filter(p => p !== id));
            } else if (selectedPokemon1.length < 6) {
                setSelectedPokemon1(prev => [...prev, id]);
            }
        } else {
            if (selectedPokemon2.includes(id)) {
                setSelectedPokemon2(prev => prev.filter(p => p !== id));
            } else if (selectedPokemon2.length < 6) {
                setSelectedPokemon2(prev => [...prev, id]);
            }
        }
    };

    const handleConfirmTeam = async () => {
        if (currentPlayer === 1 && selectedPokemon1.length > 0) {
            setCurrentPlayer(2);
            scrollToTop();
        } else if (currentPlayer === 2 && selectedPokemon2.length > 0) {
            setIsLoadingDetails(true);
            try {
                // Fetch details for Player 1's Pokemon
                for (const id of selectedPokemon1) {
                    const pokemon = data?.results[id - 1];
                    if (pokemon) {
                        const battlePokemon = await fetchPokemonDetails(id);
                        addPokemonToTeam(0, battlePokemon);
                    }
                }

                // Fetch details for Player 2's Pokemon
                for (const id of selectedPokemon2) {
                    const pokemon = data?.results[id - 1];
                    if (pokemon) {
                        const battlePokemon = await fetchPokemonDetails(id);
                        addPokemonToTeam(1, battlePokemon);
                    }
                }

                startBattle();
                navigate('/pokeverse/battle-sim/battle');
            } catch (error) {
                console.error('Error fetching Pokemon details:', error);
            } finally {
                setIsLoadingDetails(false);
            }
        }
    };

    const filteredPokemon = data?.results.filter((_, index) => {
        const id = index + 1;
        return id >= selectedRegion.startId && id <= selectedRegion.endId;
    });

    if (error) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 'calc(100vh - 52px)',
                    gap: 2,
                    p: 4,
                    background: 'linear-gradient(135deg, #ff4b4b, #ffa64b)',
                }}
            >
                <Typography level="h4">
                    Error loading Pokémon
                </Typography>
                <Typography>{error.message}</Typography>
            </Box>
        );
    }

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
                minHeight: 'calc(100vh - 52px)',
                p: 2,
                background: mode === 'dark'
                    ? 'linear-gradient(135deg, #323232 0%, #121212 100%)'
                    : 'linear-gradient(to top, #eef1f5 0%, #f5f7fa 100%)',
                position: 'relative',
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={4}>
                    <Sheet
                        variant="outlined"
                        sx={{
                            p: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderRadius: 'lg',
                            background: (theme) => `linear-gradient(145deg, ${theme.palette.background.surface}, ${theme.palette.background.level1})`,
                            boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
                        }}
                    >
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Users size={24} />
                            <Typography
                                level="h4"
                                sx={{ color: currentPlayer === 1 ? 'primary' : 'danger' }}
                            >
                                {currentPlayer === 1 ? state.players[0].name : state.players[1].name}'s Team
                                Selection
                            </Typography>
                        </Stack>
                        <Typography level="body-lg">
                            Selected: {currentPlayer === 1 ? selectedPokemon1.length : selectedPokemon2.length}/6
                        </Typography>
                    </Sheet>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {REGION_DATA.map((region) => (
                            <Button
                                key={region.name}
                                size="md"
                                variant={selectedRegion.name === region.name ? 'solid' : 'soft'}
                                color={currentPlayer === 1 ? 'primary' : 'danger'}
                                onClick={() => setSelectedRegion(region)}
                                sx={{
                                    textTransform: 'uppercase',
                                    borderRadius: 'md',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                {region.name}
                            </Button>
                        ))}
                    </Box>

                    {(loading || isLoadingDetails) ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                            <Stack spacing={2} alignItems="center">
                                <CircularProgress size="lg" />
                                {isLoadingDetails && (
                                    <Typography level="body-sm">
                                        Loading Pokémon details and moves...
                                    </Typography>
                                )}
                            </Stack>
                        </Box>
                    ) : (
                        <Grid container spacing={2}>
                            {filteredPokemon?.map((pokemon) => {
                                const id = getIdFromUrl(pokemon.url);
                                return (
                                    <Grid xs={6} sm={4} md={3} lg={2} key={id}>
                                        <PokemonSelectionCard
                                            id={id}
                                            name={pokemon.name}
                                            isSelected={
                                                currentPlayer === 1
                                                    ? selectedPokemon1.includes(id)
                                                    : selectedPokemon2.includes(id)
                                            }
                                            isPlayer1={currentPlayer === 1}
                                            onClick={() => handlePokemonSelect(id)}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                </Stack>
            </Container>

            <Box
                sx={{
                    width: '100%',
                    p: 2,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button
                    size="lg"
                    color={currentPlayer === 1 ? 'primary' : 'danger'}
                    onClick={handleConfirmTeam}
                    disabled={
                        (currentPlayer === 1 && selectedPokemon1.length === 0) ||
                        (currentPlayer === 2 && selectedPokemon2.length === 0) ||
                        isLoadingDetails
                    }
                    endDecorator={isLoadingDetails ? <Loader className="animate-spin" /> : <Swords />}
                    sx={{
                        minWidth: '200px',
                        padding: '12px 24px',
                        boxShadow: '0px 6px 20px rgba(0,0,0,0.2)',
                        '&:hover': {
                            boxShadow: '0px 8px 25px rgba(0,0,0,0.3)',
                        },
                    }}
                >
                    {currentPlayer === 1 ? 'Confirm Player 1 Team' : 'Start Battle'}
                </Button>
            </Box>
        </Box>
    );
};