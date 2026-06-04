import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { CardType } from './pokememory.utilities';

type GameState = 'setup' | 'playing' | 'game_end';

interface PokeState {
    name: string;
    difficulty: string;
    gameState: GameState;
    cards: CardType[];
    turns: number;
    firstChoice: CardType | null;
    secondChoice: CardType | null;
    interaction: boolean;
}

const initial: PokeState = {
    name: '',
    difficulty: '',
    gameState: 'setup',
    cards: [],
    turns: 0,
    firstChoice: null,
    secondChoice: null,
    interaction: true,
};

type Action =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_DIFFICULTY'; payload: string }
    | { type: 'SET_GAME_STATE'; payload: GameState }
    | { type: 'SET_CARDS'; payload: CardType[] }
    | { type: 'SET_FIRST_CHOICE'; payload: CardType | null }
    | { type: 'SET_SECOND_CHOICE'; payload: CardType | null }
    | { type: 'SET_INTERACTION'; payload: boolean }
    | { type: 'MARK_MATCHED'; payload: { firstId: string; secondId: string } }
    | { type: 'RESET_TURN' }
    | { type: 'RESET_GAME' };

function reducer(state: PokeState, action: Action): PokeState {
    switch (action.type) {
        case 'SET_NAME':         return { ...state, name: action.payload };
        case 'SET_DIFFICULTY':   return { ...state, difficulty: action.payload };
        case 'SET_GAME_STATE':   return { ...state, gameState: action.payload };
        case 'SET_CARDS':        return { ...state, cards: action.payload, turns: 0, firstChoice: null, secondChoice: null, interaction: true };
        case 'SET_FIRST_CHOICE': return { ...state, firstChoice: action.payload };
        case 'SET_SECOND_CHOICE':return { ...state, secondChoice: action.payload };
        case 'SET_INTERACTION':  return { ...state, interaction: action.payload };
        case 'MARK_MATCHED':     return { ...state, cards: state.cards.map(c => c.id === action.payload.firstId || c.id === action.payload.secondId ? { ...c, matched: true } : c) };
        case 'RESET_TURN':       return { ...state, firstChoice: null, secondChoice: null, turns: state.turns + 1, interaction: true };
        case 'RESET_GAME':       return initial;
    }
}

interface PokeContextValue {
    state: PokeState;
    dispatch: React.Dispatch<Action>;
}

const PokeContext = createContext<PokeContextValue | null>(null);

export function PokeProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initial);
    return <PokeContext.Provider value={{ state, dispatch }}>{children}</PokeContext.Provider>;
}

export function usePoke() {
    const ctx = useContext(PokeContext);
    if (!ctx) throw new Error('usePoke must be inside PokeProvider');
    return ctx;
}
