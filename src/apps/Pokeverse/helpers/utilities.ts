import { DAMAGE_MULTIPLIERS } from './constants';
import type {
    Pokemon,
    PokemonDetail,
    PokemonSpecies,
    EvolutionChainLink,
    EvolutionDetails,
    BattlePokemon,
    BattleMove,
} from './types';

// URL Helpers
export const getIdFromUrl = (url: string): number => {
    return parseInt(url.split('/').slice(-2)[0]);
};

// String Formatting (used in components)
export const formatString = (str: string): string => {
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const formatPokemonId = (id: number): string => {
    return `#${id.toString().padStart(3, '0')}`;
};

// Color Helpers (used in multiple components)
export const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
};

export const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b]
        .map(x => Math.round(x).toString(16).padStart(2, '0'))
        .join('');
};

export const getComplementaryColor = (hex: string): string => {
    const { r, g, b } = hexToRgb(hex);
    return rgbToHex(255 - r, 255 - g, 255 - b);
};

export const getRandomColor = (): string => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`;
};

// Pokemon Data Transformation (used in hooks/components)
export const createEmptyPokemon = (id: number, name: string): Pokemon => ({
    id,
    name,
    baseExp: 0,
    height: '',
    weight: '',
    types: [],
    abilities: [],
    sprites: {} as any,
    moves: [],
    stats: [],
    baseHappiness: 0,
    captureRate: '',
    flavorTexts: [],
    generation: 0,
    genre: '',
    habitat: '',
    varieties: [],
    evolutionChain: { name: '', id: 0, evolvesTo: [] },
});

export const transformPokemonDetails = (pokemon: Pokemon, details: PokemonDetail): Pokemon => ({
    ...pokemon,
    name: details.name,
    baseExp: details.base_experience,
    height: `${(details.height / 10).toFixed(1)} m`,
    weight: `${(details.weight / 10).toFixed(1)} kg`,
    sprites: details.sprites,
    types: details.types.map(t => t.type.name),
    abilities: details.abilities.map(ab => ({
        name: ab.ability.name,
        isHidden: ab.is_hidden,
    })),
    stats: details.stats.map(st => ({
        name: st.stat.name,
        value: st.base_stat,
    })),
    moves: details.moves.map(m => ({
        name: m.move.name,
        url: m.move.url,
    })),
    speciesId: getIdFromUrl(details.species.url),
});

export const transformPokemonSpecies = (pokemon: Pokemon, species: PokemonSpecies): Pokemon => ({
    ...pokemon,
    baseHappiness: species.base_happiness,
    captureRate: `${species.capture_rate}%`,
    flavorTexts: Array.from(
        new Set(
            species.flavor_text_entries
                .filter(t => t.language.name === 'en')
                .map(t => t.flavor_text.replace(/[\n\f]/g, ' ').trim())
        )
    ),
    generation: getIdFromUrl(species.generation.url),
    genre: species.genera.find(g => g.language.name === 'en')?.genus || '',
    habitat: species.habitat?.name || 'unknown',
    romanjiName: species.names.find(n => n.language.name === 'roomaji')?.name,
    varieties: species.varieties.map(v => ({
        name: v.pokemon.name,
        id: getIdFromUrl(v.pokemon.url),
    })),
    evoChainId: getIdFromUrl(species.evolution_chain.url),
});

export const parseEvolutionChain = (chain: EvolutionChainLink): EvolutionDetails => ({
    name: chain.species.name,
    id: getIdFromUrl(chain.species.url),
    evolvesTo: chain.evolves_to.map(evo => parseEvolutionChain(evo)),
});

export const transformEvolutionChain = (pokemon: Pokemon, chain: EvolutionChainLink): Pokemon => ({
    ...pokemon,
    evolutionChain: parseEvolutionChain(chain),
});

// Battle Stats (used in battle simulator)
export const calculateStat = (
    baseStat: number,
    level: number,      // ← Now dynamic based on difficulty
    isHP: boolean = false,
    ev: number = 0,
    iv: number = 15
): number => {
    if (isHP) {
        return Math.floor((((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + level + 10);
    }
    return Math.floor((((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + 5);
};

export const calculateDamage = (
    defenderType: string,
    movePower: number,
    attackStat: number,
    defenseStat: number,
    moveType: string,
    attackerTypes: string[]
): number => {
    const typeMultiplier = DAMAGE_MULTIPLIERS[moveType]?.[defenderType] || 1;
    const isCritical = Math.random() < 1 / 16;
    const criticalMultiplier = isCritical ? 1.5 : 1;
    const stab = attackerTypes.includes(moveType) ? 1.5 : 1;
    const randomFactor = 0.85 + (Math.random() * 0.15);

    const baseDamage = ((2 * 50 / 5 + 2) * movePower * (attackStat / defenseStat) / 50 + 2);
    const finalDamage = Math.floor(baseDamage * typeMultiplier * criticalMultiplier * stab * randomFactor);

    return Math.max(1, finalDamage);
};

export const formatPokemonForBattle = (
    pokemon: Pokemon,
    selectedMoves: BattleMove[],
    level: number = 50
): BattlePokemon => {
    const stats = {
        hp: calculateStat(pokemon.stats[0].value, level, true),
        attack: calculateStat(pokemon.stats[1].value, level),
        defense: calculateStat(pokemon.stats[2].value, level),
        specialAttack: calculateStat(pokemon.stats[3].value, level),
        specialDefense: calculateStat(pokemon.stats[4].value, level),
        speed: calculateStat(pokemon.stats[5].value, level),
    };

    return {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types,
        level,
        currentHP: stats.hp,
        maxHP: stats.hp,
        selectedMoves,
        frontSprite: pokemon.sprites.front_default,
        backSprite: pokemon.sprites.back_default || pokemon.sprites.front_default,
        calculatedStats: stats,
    };
};

// Battle Helpers (used across battle components)
export const getNextAlivePokemon = (team: BattlePokemon[]): number | undefined => {
    const index = team.findIndex(p => p.currentHP > 0);
    return index === -1 ? undefined : index;
};

export const canSwitchToPokemon = (team: BattlePokemon[], index: number): boolean => {
    return index >= 0 && index < team.length && team[index].currentHP > 0;
};

export const hasAlivePokemon = (team: BattlePokemon[]): boolean => {
    return team.some(p => p.currentHP > 0);
};