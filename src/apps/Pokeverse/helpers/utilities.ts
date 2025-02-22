import { BattlePlayer, BattlePokemon, GamePhase, Move } from "@/apps/Pokeverse/helpers/battle.types";
import { DAMAGE_MULTIPLIERS, END_POINT } from "@/apps/Pokeverse/helpers/constant";
import { EvolutionDetails, Pokemon } from "@/apps/Pokeverse/helpers/model.types";
import { PokemonDetail, PokemonSpecies, PokemonSprite } from "@/apps/Pokeverse/helpers/response.types";

export namespace DexUtils {
    export const createPokemon = (id: number, name: string): Pokemon => ({
        id,
        name,
        baseExp: 0,
        height: "",
        weight: "",
        types: [],
        abilities: [],
        sprites: {} as PokemonSprite,
        moves: [],
        stats: [],
        fetchedApis: new Set(),
        baseHappiness: 0,
        captureRate: "",
        flavorTexts: [],
        generation: 0,
        genre: "",
        habitat: "",
        romanjiName: "",
        varieties: [],
        evolutionChain: {
            name: "",
            id: 0,
            evolvesTo: []
        }
    });

    export const updateDetails = (pokemon: Pokemon, details: PokemonDetail): void => {
        if (pokemon.fetchedApis.has(END_POINT.details)) return;
        pokemon.name = details.name;
        pokemon.baseExp = details.base_experience;
        pokemon.height = `${(details.height / 10).toFixed(1)} m`;
        pokemon.weight = `${(details.weight / 10).toFixed(1)} kg`;
        pokemon.sprites = details.sprites;
        pokemon.types = details.types.map(t => t.type.name);
        pokemon.abilities = details.abilities.map(ab => ({
            name: ab.ability.name,
            isHidden: Boolean(ab.is_hidden),
        }));
        pokemon.stats = details.stats.map(st => ({
            name: st.stat.name,
            value: st.base_stat,
        }));
        pokemon.moves = details.moves.map(move => ({
            name: move.move.name,
            url: move.move.url
        }))

        pokemon.speciesId = getIdFromUrl(details.species.url);
        pokemon.fetchedApis.add(END_POINT.details);
    };

    export const updateSpecies = (pokemon: Pokemon, species: PokemonSpecies) => {
        if (pokemon.fetchedApis.has(END_POINT.species)) return;
        pokemon.baseHappiness = species.base_happiness;
        pokemon.captureRate = species.capture_rate + "%";
        pokemon.flavorTexts = Array.from(
            new Set(
                species.flavor_text_entries
                    .filter((text) => text.language.name === 'en') // Filter for English entries
                    .map((text) => text.flavor_text.replace(/[\n\f]/g, ' ').trim()) // Remove special characters and trim
            )
        );
        pokemon.generation = getIdFromUrl(species.generation.url)
        pokemon.genre = species.genera.find(gnr => gnr.language.name === 'en')!.genus;
        pokemon.habitat = species.habitat?.name || "--";
        pokemon.romanjiName = species.names.find(name => name.language.name === 'roomaji')?.name;
        pokemon.varieties = species.varieties.map(variety => ({
            name: variety.pokemon.name,
            id: getIdFromUrl(variety.pokemon.url)
        }))

        pokemon.evoChainId = getIdFromUrl(species.evolution_chain.url);
        pokemon.fetchedApis.add(END_POINT.species);
    }

    export const updateEvolutionChain = (pokemon: Pokemon, chainData: any) => {
        if (pokemon.fetchedApis.has(END_POINT.evolutionChain)) return;

        pokemon.evolutionChain = extractEvolutionChain(chainData);
        pokemon.fetchedApis.add(END_POINT.evolutionChain);
    }

    const extractEvolutionChain = (chain: any): EvolutionDetails => {
        // Recursive traversal of the chain
        return {
            name: chain.species.name,
            id: getIdFromUrl(chain.species.url),
            evolvesTo: chain.evolves_to.map((evolution: any) => extractEvolutionChain(evolution)),
        };
    }
}


export namespace BattleSimUtils {
    export const calculateStat = (
        baseStat: number,
        ev: number = 0,
        level: number = 50,
        isHP: boolean = false,
        iv: number = 15
    ): number => {
        if (isHP) {
            return Math.floor((((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + level + 10);
        } else {
            return Math.floor((((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + 5);
        }
    };

    export const calculateDamage = (
        attacker: BattlePokemon,
        defender: BattlePokemon,
        move: Move
    ): number => {
        const typeMultiplier = DAMAGE_MULTIPLIERS[move.type]?.[defender.types[0]] || 1;

        const attackStat = move.category === 'Physical' ? attacker.calculatedStats.attack : attacker.calculatedStats.specialAttack;
        const defenseStat = move.category === 'Physical' ? defender.calculatedStats.defense : defender.calculatedStats.specialDefense;

        const isCritical = Math.random() < 1 / 16;
        const criticalMultiplier = isCritical ? 1.5 : 1;

        // Add STAB (Same Type Attack Bonus)
        const stab = attacker.types.includes(move.type) ? 1.5 : 1;
        // Random factor between 0.85 and 1
        const randomFactor = 0.85 + (Math.random() * 0.15);

        const baseDamage = ((2 * 50 / 5 + 2) * (move.power || 50) * (attackStat / defenseStat) / 50 + 2);
        const finalDamage = Math.floor(baseDamage * typeMultiplier * criticalMultiplier * stab * randomFactor);

        return Math.max(1, finalDamage); // Minimum 1 damage
    };

    export const getNextPokemon = (team: BattlePokemon[]): number | undefined => {
        const index = team.findIndex(pokemon => pokemon.currentHP > 0);
        return index === -1 ? undefined : index;
    };

    export const canSwitchTo = (pokemonIndex: number, team: BattlePokemon[]): boolean => {
        return pokemonIndex >= 0 &&
            pokemonIndex < team.length &&
            team[pokemonIndex].currentHP > 0;
    };

    export const isValidGamePhaseTransition = (
        currentPhase: GamePhase,
        nextPhase: GamePhase
    ): boolean => {
        const validTransitions: Record<GamePhase, GamePhase[]> = {
            'SETUP': ['PLAYER_NAMING'],
            'PLAYER_NAMING': ['TEAM_SELECTION'],
            'TEAM_SELECTION': ['BATTLE'],
            'BATTLE': ['ENDED'],
            'ENDED': ['SETUP'] // If you want to allow restarting
        };

        return validTransitions[currentPhase]?.includes(nextPhase) || false;
    };

    // Helper to check if both teams are valid to start battle
    export const areTeamsValid = (
        team1: BattlePokemon[],
        team2: BattlePokemon[],
        maxTeamSize: number
    ): boolean => {
        return team1.length > 0 &&
            team1.length <= maxTeamSize &&
            team2.length > 0 &&
            team2.length <= maxTeamSize;
    };

    // Helper to format pokemon data from PokeAPI to BattlePokemon
    export const formatPokemonData = (
        pokemonData: Pokemon,
        selectedMoves: Move[]
    ): BattlePokemon => {
        const stats = {
            hp: calculateStat(pokemonData.stats[0].value, 0, 50, true),
            attack: calculateStat(pokemonData.stats[1].value),
            defense: calculateStat(pokemonData.stats[2].value),
            specialAttack: calculateStat(pokemonData.stats[3].value),
            specialDefense: calculateStat(pokemonData.stats[4].value),
            speed: calculateStat(pokemonData.stats[5].value)
        };

        return {
            id: pokemonData.id,
            name: pokemonData.name,
            types: pokemonData.types,
            currentHP: stats.hp,
            maxHP: stats.hp,
            selectedMoves,
            frontSprite: pokemonData.sprites.front_default,
            backSprite: pokemonData.sprites.back_default || pokemonData.sprites.front_default,
            calculatedStats: stats
        };
    };

    // Add helper function to check if a team has any playable Pokemon
    export const hasPlayablePokemon = (team: BattlePokemon[]): boolean => {
        return team.some(pokemon => pokemon.currentHP > 0);
    };

    // Add helper function to check game over conditions
    export const checkGameOver = (players: [BattlePlayer, BattlePlayer]): { isGameOver: boolean; winner?: string } => {
        const player1HasPokemon = hasPlayablePokemon(players[0].team);
        const player2HasPokemon = hasPlayablePokemon(players[1].team);

        if (!player1HasPokemon && !player2HasPokemon) {
            return { isGameOver: true, winner: 'Draw' }; // Extremely rare case where both teams faint simultaneously
        } else if (!player1HasPokemon) {
            return { isGameOver: true, winner: players[1].name };
        } else if (!player2HasPokemon) {
            return { isGameOver: true, winner: players[0].name };
        }
        return { isGameOver: false };
    };
}

export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Helper function to convert hex to RGB
const hexToRGB = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
};

// Helper function to convert RGB to hex
const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b]
        .map(x => Math.round(x).toString(16).padStart(2, '0'))
        .join('');
};

// Function to get complementary color
export const getComplementaryColor = (hex: string) => {
    const { r, g, b } = hexToRGB(hex);
    return rgbToHex(255 - r, 255 - g, 255 - b);
};

// Function to get a softer version of the complementary color
export const getSoftComplementaryColor = (hex: string) => {
    const { r, g, b } = hexToRGB(hex);
    // Mix with white to soften
    const softenFactor = 0.7; // Adjust this to control how soft the complement is
    return rgbToHex(
        255 - (255 - r) * softenFactor,
        255 - (255 - g) * softenFactor,
        255 - (255 - b) * softenFactor
    );
};

export const getIdFromUrl = (url: string) => parseInt(url.split("/").slice(-2)[0]);

export const getOfficialImage = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
export const get3dImage = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;

export const backSprite = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
export const frontSprite = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`;
};