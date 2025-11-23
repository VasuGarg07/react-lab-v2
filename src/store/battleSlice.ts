import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BattlePokemon, DifficultyId } from '../apps/Pokeverse/helpers/types';
import { calculateDamage, getNextAlivePokemon } from '../apps/Pokeverse/helpers/utilities';
import { DIFFICULTY_LEVELS } from '../apps/Pokeverse/helpers/constants';

// Battle Phase Types
type BattlePhase = 'SETUP' | 'TEAM_SELECTION' | 'LOADING' | 'BATTLE' | 'ENDED';

// Player State
export interface Player {
    name: string;
    team: BattlePokemon[];
    selectedTeamIds: number[];
    activePokemon: number;
    hasActed: boolean;
}

// Battle State
interface BattleState {
    phase: BattlePhase;

    // Setup Configuration
    teamSize: number;
    selectedRegions: string[];
    difficulty: DifficultyId;
    level: number;

    // Players
    players: [Player, Player];
    currentPlayerTurn: 0 | 1;

    // Battle Tracking
    turn: number;
    battleLog: string[];
    winner: string | null;
}

// ==================== localStorage Helpers ====================

const BATTLE_STORAGE_KEY = 'battleState';

/**
 * Check if battle state is still in initial/default state
 * Use this to determine if we need to hydrate from localStorage
 */
export const isInitialBattleState = (state: BattleState): boolean => {
    return (
        state.phase === 'SETUP' &&
        state.players[0].name === '' &&
        state.players[1].name === '' &&
        state.selectedRegions.length === 0 &&
        state.players[0].selectedTeamIds.length === 0 &&
        state.players[1].selectedTeamIds.length === 0
    );
};

/**
 * Save current battle state to localStorage
 * Call this on navigation events
 */
const saveToLocalStorage = (state: BattleState) => {
    try {
        localStorage.setItem(BATTLE_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.error('Failed to save battle state:', error);
    }
};

/**
 * Load battle state from localStorage
 * Call this on component mount if Redux is in initial state
 */
const loadFromLocalStorage = (): BattleState | null => {
    try {
        const saved = localStorage.getItem(BATTLE_STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch (error) {
        console.error('Failed to load battle state:', error);
        return null;
    }
};

/**
 * Clear localStorage (internal helper)
 */
export const clearBattleState = () => {
    try {
        localStorage.removeItem(BATTLE_STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear battle state:', error);
    }
};

// ==================== Initial State ====================

const defaultInitialState: BattleState = {
    phase: 'SETUP',

    // Setup defaults
    teamSize: 6,
    selectedRegions: [],
    difficulty: 'intermediate',
    level: 40,

    // Players
    players: [
        { name: '', team: [], selectedTeamIds: [], activePokemon: 0, hasActed: false },
        { name: '', team: [], selectedTeamIds: [], activePokemon: 0, hasActed: false },
    ],
    currentPlayerTurn: 0,

    // Battle
    turn: 1,
    battleLog: [],
    winner: null,
};

const initialState: BattleState = defaultInitialState;

// ==================== Battle Slice ====================

const battleSlice = createSlice({
    name: 'battle',
    initialState,
    reducers: {
        // ==================== HYDRATION & PERSISTENCE ====================

        /**
         * Load battle state from localStorage
         * Call this on component mount if Redux is in initial state
         */
        loadBattleState: (state) => {
            const saved = loadFromLocalStorage();
            if (saved) {
                return saved;
            }
            return state;
        },

        /**
         * Save current battle state to localStorage
         * Call this before navigation
         */
        saveBattleState: (state) => {
            saveToLocalStorage(state);
        },

        /**
         * Hydrate Redux state from a provided state object
         * Used when we already have the loaded state
         */
        hydrateBattleState: (_, action: PayloadAction<BattleState>) => {
            return action.payload;
        },

        // ==================== SETUP PHASE ====================

        setPlayerNames: (state, action: PayloadAction<{ player1: string; player2: string }>) => {
            state.players[0].name = action.payload.player1;
            state.players[1].name = action.payload.player2;
        },

        setTeamSize: (state, action: PayloadAction<number>) => {
            // Validate: 1-15
            const size = Math.max(1, Math.min(15, action.payload));
            state.teamSize = size;
        },

        setSelectedRegions: (state, action: PayloadAction<string[]>) => {
            state.selectedRegions = action.payload;
        },

        setBattleDifficulty: (state, action: PayloadAction<DifficultyId>) => {
            state.difficulty = action.payload;
            const diffLevel = DIFFICULTY_LEVELS.find(d => d.id === action.payload);
            if (diffLevel) {
                state.difficulty = action.payload;
                state.level = diffLevel.level;
            }
        },

        proceedToTeamSelection: (state) => {
            // Validate: names and regions set
            const valid =
                state.players[0].name.trim() !== '' &&
                state.players[1].name.trim() !== '' &&
                state.selectedRegions.length > 0;

            if (valid) {
                state.phase = 'TEAM_SELECTION';
            }
        },

        // ==================== TEAM SELECTION PHASE ====================

        selectTeam: (state, action: PayloadAction<{ playerId: 0 | 1; teamIds: number[] }>) => {
            const { playerId, teamIds } = action.payload;
            state.players[playerId].selectedTeamIds = teamIds;
        },

        proceedToLoading: (state) => {
            // Both players selected teams
            const bothSelected = state.players.every(p => p.selectedTeamIds.length > 0);

            if (bothSelected) {
                state.phase = 'LOADING';
            }
        },

        // ==================== LOADING PHASE ====================

        setPlayerTeam: (state, action: PayloadAction<{ playerId: 0 | 1; team: BattlePokemon[] }>) => {
            const { playerId, team } = action.payload;
            state.players[playerId].team = team;
        },

        startBattle: (state) => {
            // Validate: both teams loaded
            const teamsLoaded = state.players.every(p => p.team.length > 0);

            if (teamsLoaded) {
                state.phase = 'BATTLE';
                state.turn = 1;
                state.currentPlayerTurn = 0;
                state.battleLog.push(`Battle started between ${state.players[0].name} and ${state.players[1].name}!`);
                state.battleLog.push(`${state.players[0].name} sent out ${state.players[0].team[0].name}!`);
                state.battleLog.push(`${state.players[1].name} sent out ${state.players[1].team[0].name}!`);
            }
        },

        // ==================== BATTLE PHASE ====================

        selectMove: (state, action: PayloadAction<{ playerId: 0 | 1; moveIndex: number }>) => {
            const { playerId, moveIndex } = action.payload;

            // Validate turn and action
            if (state.currentPlayerTurn !== playerId || state.players[playerId].hasActed) {
                return;
            }

            const attacker = state.players[playerId];
            const defender = state.players[1 - playerId];

            const attackingPokemon = attacker.team[attacker.activePokemon];
            const defendingPokemon = defender.team[defender.activePokemon];

            const move = attackingPokemon.selectedMoves[moveIndex];

            // Calculate damage
            const damage = calculateDamage(
                defendingPokemon.types[0],
                move.power,
                attackingPokemon.calculatedStats.attack,
                defendingPokemon.calculatedStats.defense,
                move.type,
                attackingPokemon.types
            );

            // Apply damage
            defendingPokemon.currentHP = Math.max(defendingPokemon.currentHP - damage, 0);

            // Battle log
            state.battleLog.push(
                `${attacker.name}'s ${attackingPokemon.name} used ${move.name}! (${damage} damage)`
            );

            attacker.hasActed = true;

            // Check if defender fainted
            if (defendingPokemon.currentHP <= 0) {
                state.battleLog.push(`${defender.name}'s ${defendingPokemon.name} fainted!`);

                const nextIndex = getNextAlivePokemon(defender.team);

                if (nextIndex === undefined) {
                    // Battle over
                    state.phase = 'ENDED';
                    state.winner = attacker.name;
                    state.battleLog.push(`${attacker.name} wins the battle!`);
                } else {
                    // Auto-switch to next Pokemon
                    defender.activePokemon = nextIndex;
                    state.battleLog.push(`${defender.name} sent out ${defender.team[nextIndex].name}!`);
                }
            }
        },

        switchPokemon: (state, action: PayloadAction<{ playerId: 0 | 1; index: number }>) => {
            const { playerId, index } = action.payload;

            // Validate turn and action
            if (state.currentPlayerTurn !== playerId || state.players[playerId].hasActed) {
                return;
            }

            const player = state.players[playerId];
            const newPokemon = player.team[index];

            // Validate: pokemon exists and is alive
            if (index >= 0 && index < player.team.length && newPokemon.currentHP > 0) {
                const oldPokemon = player.team[player.activePokemon];

                player.activePokemon = index;
                player.hasActed = true;

                state.battleLog.push(
                    `${player.name} withdrew ${oldPokemon.name} and sent out ${newPokemon.name}!`
                );
            }
        },

        endTurn: (state) => {
            // Validate: current player acted
            if (!state.players[state.currentPlayerTurn].hasActed) {
                return;
            }

            // Reset action flag
            state.players[state.currentPlayerTurn].hasActed = false;

            // Switch turns
            state.currentPlayerTurn = (1 - state.currentPlayerTurn) as 0 | 1;

            // Increment turn counter when back to player 1
            if (state.currentPlayerTurn === 0) {
                state.turn += 1;
            }
        },

        addBattleLog: (state, action: PayloadAction<string>) => {
            state.battleLog.push(action.payload);
        },

        // ==================== END PHASE ====================

        forfeit: (state, action: PayloadAction<0 | 1>) => {
            const playerId = action.payload;
            state.phase = 'ENDED';
            state.winner = state.players[1 - playerId].name;
            state.battleLog.push(`${state.players[playerId].name} forfeited!`);
            state.battleLog.push(`${state.winner} wins!`);
        },

        resetBattle: () => {
            clearBattleState();
            return defaultInitialState;
        },

        resetToSetup: (state) => {
            // Keep player names, reset everything else
            const player1Name = state.players[0].name;
            const player2Name = state.players[1].name;

            clearBattleState();

            return {
                ...defaultInitialState,
                players: [
                    { ...defaultInitialState.players[0], name: player1Name },
                    { ...defaultInitialState.players[1], name: player2Name },
                ],
            };
        },
    },
});

export const {
    hydrateBattleState,
    loadBattleState,
    saveBattleState,

    // Setup
    setPlayerNames,
    setTeamSize,
    setSelectedRegions,
    setBattleDifficulty,
    proceedToTeamSelection,

    // Team Selection
    selectTeam,
    proceedToLoading,

    // Loading
    setPlayerTeam,
    startBattle,

    // Battle
    selectMove,
    switchPokemon,
    endTurn,
    addBattleLog,

    // End
    forfeit,

    // Reset
    resetBattle,
    resetToSetup,
} = battleSlice.actions;

export default battleSlice.reducer;