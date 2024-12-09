export interface Move {
    id: number;
    name: string;
    type: string;
    power?: number;
    accuracy?: number;
    category: 'Physical' | 'Special';
}

export interface BattlePokemon {
    id: number;
    name: string;
    types: string[];
    currentHP: number;
    maxHP: number;
    selectedMoves: Move[];
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
    hasActed: boolean;  // Track if player has made a move this turn
}

export type GamePhase =
    | 'SETUP'           // Initial phase
    | 'PLAYER_NAMING'   // Setting player names
    | 'TEAM_SELECTION'  // Selecting Pokemon
    | 'BATTLE'          // Active battle
    | 'ENDED';          // Game has ended

export interface BattleState {
    phase: GamePhase;
    turn: number;
    players: [BattlePlayer, BattlePlayer];
    currentPlayerTurn: number;  // 0 or 1
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