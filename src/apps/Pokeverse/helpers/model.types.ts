import { PokemonSprite } from "./response.types";

export interface Ability {
    name: string;
    isHidden: boolean;
    description?: string;
}

export interface Move {
    name: string;
    url: string
    description?: string;
    power?: number;
}

export interface Stats {
    name: string;
    value: number;
}

export interface EvolutionDetails {
    name: string;
    id: number;
    evolvesTo: EvolutionDetails[];
}

export interface AltForm {
    name: string;
    id: number;
}

export interface Pokemon {
    // Details
    id: number;
    name: string;
    baseExp: number;
    height: string;
    weight: string;
    types: string[];
    abilities: Ability[];
    sprites: PokemonSprite;
    moves: Move[];
    stats: Stats[];

    // species
    baseHappiness: number;
    captureRate: string;
    flavorTexts: string[];
    generation: number;
    genre: string;
    habitat: string;
    romanjiName?: string;
    varieties: AltForm[];

    // Evolution Chain
    evolutionChain: EvolutionDetails;

    fetchedApis: Set<string>; // Track fetched APIs
}
