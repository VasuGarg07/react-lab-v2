export const GRADIENTS = {
    red: { from: '#FF4B4B', to: '#FFB74B' },        // bright red to golden
    purple: { from: '#9747FF', to: '#FF7747' },     // purple to orange
    green: { from: '#47B247', to: '#B2FF47' },      // forest to lime
    blue: { from: '#4B83FF', to: '#4BFFB7' },       // royal blue to aqua
    pink: { from: '#FF47B2', to: '#FFE247' },       // hot pink to yellow
    orange: { from: '#FF8547', to: '#FFE247' },     // orange to light yellow
    teal: { from: '#47D4D4', to: '#47FF8F' },       // teal to mint
    magenta: { from: '#FF4B98', to: '#FFB54B' },    // magenta to gold
    lime: { from: '#7EFF4B', to: '#47D4FF' },       // lime to sky blue
    violet: { from: '#8A4BFF', to: '#FF4B4B' },     // violet to red
    coral: { from: '#FF6B4B', to: '#FFCD4B' },      // coral to amber
    crimson: { from: '#FF2D55', to: '#FF9F4B' },    // deep red to peach
    orchid: { from: '#B94BFF', to: '#FF4B94' },     // orchid to rose
    emerald: { from: '#4BFF8A', to: '#FFE14B' },    // emerald to yellow
    grape: { from: '#9F4BFF', to: '#FF4B77' },      // grape to salmon
    ruby: { from: '#FF1744', to: '#FFC107' },       // ruby to amber
    sunset: { from: '#FF8C00', to: '#FFD700' },     // deep orange to gold
    ocean: { from: '#0277BD', to: '#4FC3F7' }       // deep blue to light blue
};

export const REGION_DATA = [
    {
        name: "Kanto",
        pokemonCount: 151,
        startId: 1,
        endId: 151,
        pokedexUrl: "https://pokeapi.co/api/v2/pokedex/2/",
        regionUrl: "https://pokeapi.co/api/v2/region/1/"
    },
    {
        name: "Johto",
        pokemonCount: 100,
        startId: 152,
        endId: 251,
        pokedexUrl: "https://pokeapi.co/api/v2/pokedex/3/",
        regionUrl: "https://pokeapi.co/api/v2/region/2/"
    },
    {
        name: "Hoenn",
        pokemonCount: 135,
        startId: 252,
        endId: 386,
        pokedexUrl: "https://pokeapi.co/api/v2/pokedex/4/",
        regionUrl: "https://pokeapi.co/api/v2/region/3/"
    },
    {
        name: "Sinnoh",
        pokemonCount: 107,
        startId: 387,
        endId: 493,
        pokedexUrl: "https://pokeapi.co/api/v2/pokedex/5/",
        regionUrl: "https://pokeapi.co/api/v2/region/4/"
    },
    {
        name: "Unova",
        pokemonCount: 156,
        startId: 494,
        endId: 649,
        pokedexUrl: "https://pokeapi.co/api/v2/pokedex/8/",
        regionUrl: "https://pokeapi.co/api/v2/region/5/"
    },
    {
        name: "Kalos",
        pokemonCount: 72,
        startId: 650,
        endId: 721,
        pokedexUrl: "https://pokeapi.co/api/v2/pokedex/12/",
        regionUrl: "https://pokeapi.co/api/v2/region/6/"
    },
    {
        name: "Alola",
        pokemonCount: 88,
        startId: 722,
        endId: 809,
        pokedexUrl: "https://pokeapi.co/api/v2/pokedex/16/",
        regionUrl: "https://pokeapi.co/api/v2/region/7/"
    },
    {
        name: "Galar",
        pokemonCount: 96,
        startId: 810,
        endId: 905,
        pokedexUrl: "https://pokeapi.co/api/v2/pokedex/27/",
        regionUrl: "https://pokeapi.co/api/v2/region/8/"
    },
    {
        name: "Paldea",
        pokemonCount: 110,
        startId: 906,
        endId: 1015,
        pokedexUrl: "https://pokeapi.co/api/v2/pokedex/31/",
        regionUrl: "https://pokeapi.co/api/v2/region/9/"
    },
    // {
    //     name: "Kitakami",
    //     pokemonCount: 7,
    //     startId: 1009,
    //     endId: 1015,
    //     pokedexUrl: "https://pokeapi.co/api/v2/pokedex/32/",
    //     regionUrl: "https://pokeapi.co/api/v2/region/11/"
    // }
];

export const TYPE_COLORS: Record<string, string> = {
    normal: '#A8A878',    // Beige
    fighting: '#C03028',  // Dark red
    flying: '#A890F0',    // Light purple
    poison: '#A040A0',    // Purple
    ground: '#E0C068',    // Tan
    rock: '#B8A038',      // Dark tan
    bug: '#A8B820',       // Light green
    ghost: '#705898',     // Purple-gray
    steel: '#B8B8D0',     // Steel gray
    fire: '#F08030',      // Orange-red
    water: '#6890F0',     // Blue
    grass: '#78C850',     // Green
    electric: '#F8D030',  // Yellow
    psychic: '#F85888',   // Pink
    ice: '#98D8D8',       // Light blue
    dragon: '#7038F8',    // Dark purple
    dark: '#705848',      // Dark gray
    fairy: '#EE99AC'      // Light pink
};

export const BASE_API = 'https://pokeapi.co/api/v2/';

export const END_POINT = {
    details: 'pokemon',
    species: 'pokemon-species',
    forms: 'pokemon-form',
    evolutionChain: 'evolution-chain'
}