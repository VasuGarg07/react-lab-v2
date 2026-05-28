import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CardType } from "../apps/PokeMemory/pokememory.utilities";

type GameState = "setup" | "playing" | "game_end";

interface PokeMemoryState {
    name: string;
    difficulty: string;
    gameState: GameState;
    cards: CardType[];
    turns: number;
    firstChoice: CardType | null;
    secondChoice: CardType | null;
    interaction: boolean;
}

const initialState: PokeMemoryState = {
    name: '',
    difficulty: '',
    gameState: 'setup',
    cards: [],
    turns: 0,
    firstChoice: null,
    secondChoice: null,
    interaction: true,
};

const pokeMemorySlice = createSlice({
    name: "pokeMemory",
    initialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        setDifficulty(state, action: PayloadAction<string>) {
            state.difficulty = action.payload;
        },
        setGameState(state, action: PayloadAction<GameState>) {
            state.gameState = action.payload;
        },
        setCards(state, action: PayloadAction<CardType[]>) {
            state.cards = action.payload;
            state.turns = 0;
            state.firstChoice = null;
            state.secondChoice = null;
            state.interaction = true;
        },
        setFirstChoice(state, action: PayloadAction<CardType | null>) {
            state.firstChoice = action.payload;
        },
        setSecondChoice(state, action: PayloadAction<CardType | null>) {
            state.secondChoice = action.payload;
        },
        setInteraction(state, action: PayloadAction<boolean>) {
            state.interaction = action.payload;
        },
        markCardsAsMatched(state, action: PayloadAction<{ firstId: string; secondId: string }>) {
            const { firstId, secondId } = action.payload;
            state.cards = state.cards.map(card =>
                (card.id === firstId || card.id === secondId)
                    ? { ...card, matched: true }
                    : card
            );
        },
        resetTurn(state) {
            state.firstChoice = null;
            state.secondChoice = null;
            state.turns += 1;
            state.interaction = true;
        },
        resetGame() {
            return initialState;
        },
    },
});

export const {
    setName,
    setDifficulty,
    setGameState,
    setCards,
    setFirstChoice,
    setSecondChoice,
    setInteraction,
    markCardsAsMatched,
    resetTurn,
    resetGame,
} = pokeMemorySlice.actions;

export default pokeMemorySlice.reducer;