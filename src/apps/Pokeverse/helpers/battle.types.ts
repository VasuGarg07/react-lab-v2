import { Pokemon } from "./model.types";

export interface Move {
    id: number;
    name: string;
    type: string;
    power?: number;
    accuracy?: number;
    category: 'Physical' | 'Special';
}

export interface BattlePokemon extends Pokemon {
    currentHP: number;
    selectedMoves: Move[];
    calculatedStats: {
        hp: number;
        attack: number;
        defense: number;
        specialAttack: number;
        specialDefense: number;
    };
}

export interface BattlePlayer {
    name: string;
    team: BattlePokemon[];
    activePokemon: number;
}

export interface BattleState {
    turn: number;
    players: [BattlePlayer, BattlePlayer];
    isActive: boolean;
    winner?: string;
}

export type BattleAction =
    | { type: 'SELECT_MOVE'; playerId: number; moveIndex: number }
    | { type: 'SWITCH_POKEMON'; playerId: number; pokemonIndex: number }
    | { type: 'APPLY_DAMAGE'; playerId: number; targetId: number; amount: number }
    | { type: 'END_TURN'; playerId: number; };
