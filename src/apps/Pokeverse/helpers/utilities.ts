import { END_POINT } from "./constant";
import { EvolutionDetails, Pokemon } from "./model.types";
import { PokemonDetail, PokemonSpecies, PokemonSprite } from "./response.types";

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
        iv: number = 15 // Default average IV
    ): number => {
        if (isHP) {
            // HP formula
            return Math.floor((((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + level + 10);
        } else {
            // Other stats formula
            return Math.floor((((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + 5);
        }
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

export const getOfficialImage = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
export const get3dImage = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;

export const formatString = (input: string) => input
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`;
};