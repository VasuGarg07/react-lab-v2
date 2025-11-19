export const BASE_API = 'https://pokeapi.co/api/v2/';

export const ITEMS_PER_PAGE = 20;

export const CACHE_TIME = 15 * 60 * 1000;
export const STALE_TIME = 5 * 60 * 1000;

export const getOfficialSprite = (id: number) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const getOfficialSpriteShiny = (id: number) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`;

export const getHomeSprite = (id: number) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;

export const getHomeSpriteShiny = (id: number) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${id}.png`;

export const REGIONS = [
    { name: 'Kanto', startId: 1, endId: 151 },
    { name: 'Johto', startId: 152, endId: 251 },
    { name: 'Hoenn', startId: 252, endId: 386 },
    { name: 'Sinnoh', startId: 387, endId: 493 },
    { name: 'Unova', startId: 494, endId: 649 },
    { name: 'Kalos', startId: 650, endId: 721 },
    { name: 'Alola', startId: 722, endId: 809 },
    { name: 'Galar', startId: 810, endId: 905 },
    { name: 'Paldea', startId: 906, endId: 1015 },
] as const;

export const TYPE_COLORS: Record<string, string> = {
    normal: '#A8A878',
    fighting: '#C03028',
    flying: '#A890F0',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0',
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#EE99AC',
};

export const STAT_LABELS: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
};

export const DETAIL_TABS = [
    { id: 'info', label: 'Information' },
    { id: 'entries', label: 'Pokédex Entries' },
    { id: 'moves', label: 'Moves' },
    { id: 'stats', label: 'Base Stats' },
    { id: 'evolution', label: 'Evolution' },
    { id: 'varieties', label: 'Forms' },
    { id: 'gallery', label: 'Gallery' },
] as const;

export const GRADIENTS = {
    blue: { from: '#4B83FF', to: '#4BFFB7' },
    ruby: { from: '#FF1744', to: '#FFC107' },
} as const;

export const DAMAGE_MULTIPLIERS: Record<string, Record<string, number>> = {
    normal: { rock: 0.5, ghost: 0, steel: 0.5 },
    fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
    water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
    electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
    grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
    ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
    fighting: { normal: 2, ice: 2, rock: 2, dark: 2, steel: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, ghost: 0, fairy: 0.5 },
    poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
    ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
    flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
    psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
    bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
    rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
    ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
    dragon: { dragon: 2, steel: 0.5, fairy: 0 },
    dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
    steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
    fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 },
};