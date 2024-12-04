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
        url: string;
    }
}

interface PokemonSprite {
    front_default: string;
    back_default: string;
    other: {
        'official-artwork': {
            front_default: string;
        };
        'home': {
            front_default: string;
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
