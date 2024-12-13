export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{
        name: string;
        url: string;
    }>;
}

interface PokemonType {
    type: {
        name: string;
    };
}

interface PokemonStat {
    base_stat: number;
    stat: {
        name: string,
    }
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
        'home': {
            front_default: string;
            front_shiny: string;
        };
        'showdown': {
            front_default: string;
            back_default: string;
        }
    };
}

interface PokemonAbility {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
}

interface PokemonMove {
    move: {
        name: string;
        url: string;
    }
}

export interface PokemonDetail {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    types: PokemonType[];
    abilities: PokemonAbility[];
    sprites: PokemonSprite;
    cries: {
        latest: string;
        legacy: string;
    }
    forms: Array<{
        name: string;
        url: string;
    }>
    stats: PokemonStat[];
    moves: PokemonMove[];
    species: {
        name: string;
        url: string;
    }
}

interface EggGroup {
    name: string;
    url: string;
}

interface FlavourText {
    flavor_text: string;
    language: {
        name: string;
        url: string;
    };
    version: {
        name: string;
        url: string;
    };
}

interface Genera {
    genus: string;
    language: {
        name: string;
        url: string;
    };
}

interface Name {
    language: {
        name: string;
        url: string;
    };
    name: string;
}

interface Variety {
    is_default: boolean;
    pokemon: {
        name: string;
        url: string;
    };
}

export interface PokemonSpecies {
    base_happiness: number;
    capture_rate: number;
    egg_groups: EggGroup[];
    evolution_chain: {
        url: string;
    };
    flavor_text_entries: FlavourText[];
    forms_switchable: boolean;
    gender_rate: number;
    genera: Genera[];
    generation: {
        name: string;
        url: string;
    };
    growth_rate: {
        name: string;
        url: string;
    };
    habitat: {
        name: string;
        url: string;
    };
    has_gender_differences: boolean;
    hatch_counter: number;
    id: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    name: string;
    names: Name[];
    order: number;
    varieties: Variety[];
}
