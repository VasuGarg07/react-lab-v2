// ==================== String Literal Types ====================

export type PokemonType =
    | 'normal' | 'fighting' | 'flying' | 'poison'
    | 'ground' | 'rock' | 'bug' | 'ghost'
    | 'steel' | 'fire' | 'water' | 'grass'
    | 'electric' | 'psychic' | 'ice' | 'dragon'
    | 'dark' | 'fairy';

export type StatName =
    | 'hp' | 'attack' | 'defense'
    | 'special-attack' | 'special-defense' | 'speed';

export type GamePhase =
    | 'SETUP' | 'PLAYER_NAMING' | 'TEAM_SELECTION'
    | 'BATTLE' | 'ENDED';

export type DetailSection =
    | 'info' | 'entries' | 'moves' | 'stats'
    | 'evolution' | 'varieties' | 'gallery';

export type DifficultyId =
    | 'beginner' | 'intermediate' | 'advanced' | 'master';

// ==================== API Response Types ====================

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{
        name: string;
        url: string;
    }>;
}

export interface PokemonSprite {
    front_default: string;
    front_shiny: string;
    back_default?: string;
    back_shiny?: string;
    other: {
        'official-artwork': {
            front_default: string;
            front_shiny: string;
        };
        home: {
            front_default: string;
            front_shiny: string;
        };
        showdown: {
            front_default: string;
            back_default: string;
        };
    };
}

export interface PokemonDetail {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    types: Array<{
        type: { name: string };
    }>;
    abilities: Array<{
        ability: { name: string; url: string };
        is_hidden: boolean;
    }>;
    sprites: PokemonSprite;
    stats: Array<{
        base_stat: number;
        stat: { name: string };
    }>;
    moves: Array<{
        move: { name: string; url: string };
    }>;
    species: {
        name: string;
        url: string;
    };
}

export interface PokemonSpecies {
    id: number;
    name: string;
    base_happiness: number;
    capture_rate: number;
    evolution_chain: {
        url: string;
    };
    flavor_text_entries: Array<{
        flavor_text: string;
        language: { name: string };
    }>;
    genera: Array<{
        genus: string;
        language: { name: string };
    }>;
    generation: {
        name: string;
        url: string;
    };
    habitat: {
        name: string;
        url: string;
    } | null;
    is_legendary: boolean;
    is_mythical: boolean;
    names: Array<{
        language: { name: string };
        name: string;
    }>;
    varieties: Array<{
        is_default: boolean;
        pokemon: { name: string; url: string };
    }>;
}

export interface EvolutionChainLink {
    species: {
        name: string;
        url: string;
    };
    evolves_to: EvolutionChainLink[];
}

export interface EvolutionChainResponse {
    id: number;
    chain: EvolutionChainLink;
}

export interface MoveApiResponse {
    id: number;
    name: string;
    type: { name: string };
    power: number | null;
    accuracy: number | null;
    damage_class: { name: string };
}

// ==================== Internal Pokemon Model ====================

export interface Move {
    name: string;
    url: string;
}

export interface Ability {
    name: string;
    isHidden: boolean;
}

export interface Stats {
    name: string;
    value: number;
}

export interface AltForm {
    name: string;
    id: number;
}

export interface EvolutionDetails {
    name: string;
    id: number;
    evolvesTo: EvolutionDetails[];
}

export interface Pokemon {
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

    baseHappiness: number;
    captureRate: string;
    flavorTexts: string[];
    generation: number;
    genre: string;
    habitat: string;
    romanjiName?: string;
    varieties: AltForm[];

    evolutionChain: EvolutionDetails;

    speciesId?: number;
    evoChainId?: number;
}

// ==================== Battle System Types ====================

export interface BattleMove {
    id: number;
    name: string;
    type: string;
    power: number;
    accuracy: number;
    category: 'Physical' | 'Special';
}

export interface BattlePokemon {
    id: number;
    name: string;
    types: string[];
    level: number;
    currentHP: number;
    maxHP: number;
    selectedMoves: BattleMove[];
    backSprite: string;
    frontSprite: string;
    calculatedStats: {
        hp: number;
        attack: number;
        defense: number;
        specialAttack: number;
        specialDefense: number;
        speed: number;
    };
}

export interface BattlePlayer {
    name: string;
    team: BattlePokemon[];
    activePokemon: number;
    hasActed: boolean;
}

export interface BattleState {
    phase: GamePhase;
    turn: number;
    players: [BattlePlayer, BattlePlayer];
    currentPlayerTurn: number;
    maxTeamSize: number;
    winner?: string;
}

export type BattleAction =
    | { type: 'SET_PLAYER_NAME'; playerId: number; name: string }
    | { type: 'ADD_POKEMON_TO_TEAM'; playerId: number; pokemon: BattlePokemon }
    | { type: 'REMOVE_POKEMON_FROM_TEAM'; playerId: number; pokemonIndex: number }
    | { type: 'CONFIRM_TEAM'; playerId: number }
    | { type: 'START_BATTLE' }
    | { type: 'SELECT_MOVE'; playerId: number; moveIndex: number }
    | { type: 'SWITCH_POKEMON'; playerId: number; pokemonIndex: number }
    | { type: 'END_TURN' }
    | { type: 'FORFEIT'; playerId: number };

// ==================== Utility Types ====================

export interface Region {
    name: string;
    startId: number;
    endId: number;
}

export interface DamageCalculationParams {
    defenderType: string;
    movePower: number;
    attackStat: number;
    defenseStat: number;
    moveType: string;
    attackerTypes: string[];
}

export interface StatCalculationParams {
    baseStat: number;
    ev?: number;
    level?: number;
    isHP?: boolean;
    iv?: number;
}