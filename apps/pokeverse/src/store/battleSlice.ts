import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BattlePokemon, DifficultyId } from '../helpers/types';
import { calculateDamage, getNextAlivePokemon } from '../helpers/utilities';
import { DIFFICULTY_LEVELS } from '../helpers/constants';

type BattlePhase = 'SETUP' | 'TEAM_SELECTION' | 'LOADING' | 'BATTLE' | 'ENDED';

export interface Player {
    name: string;
    team: BattlePokemon[];
    selectedTeamIds: number[];
    activePokemon: number;
    hasActed: boolean;
}

interface BattleState {
    phase: BattlePhase;
    teamSize: number;
    selectedRegions: string[];
    difficulty: DifficultyId;
    level: number;
    players: [Player, Player];
    currentPlayerTurn: 0 | 1;
    turn: number;
    battleLog: string[];
    winner: string | null;
}

const BATTLE_STORAGE_KEY = 'battleState';

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

const saveToLocalStorage = (state: BattleState) => {
    try {
        localStorage.setItem(BATTLE_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
        console.error('Failed to save battle state:', error);
    }
};

const loadFromLocalStorage = (): BattleState | null => {
    try {
        const saved = localStorage.getItem(BATTLE_STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    } catch (error) {
        console.error('Failed to load battle state:', error);
        return null;
    }
};

export const clearBattleState = () => {
    try {
        localStorage.removeItem(BATTLE_STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear battle state:', error);
    }
};

const defaultInitialState: BattleState = {
    phase: 'SETUP',
    teamSize: 6,
    selectedRegions: [],
    difficulty: 'intermediate',
    level: 40,
    players: [
        { name: '', team: [], selectedTeamIds: [], activePokemon: 0, hasActed: false },
        { name: '', team: [], selectedTeamIds: [], activePokemon: 0, hasActed: false },
    ],
    currentPlayerTurn: 0,
    turn: 1,
    battleLog: [],
    winner: null,
};

const initialState: BattleState = defaultInitialState;

const battleSlice = createSlice({
    name: 'battle',
    initialState,
    reducers: {
        loadBattleState: (state) => {
            const saved = loadFromLocalStorage();
            if (saved) {
                return saved;
            }
            return state;
        },

        saveBattleState: (state) => {
            saveToLocalStorage(state);
        },

        hydrateBattleState: (_, action: PayloadAction<BattleState>) => {
            return action.payload;
        },

        setPlayerNames: (state, action: PayloadAction<{ player1: string; player2: string }>) => {
            state.players[0].name = action.payload.player1;
            state.players[1].name = action.payload.player2;
        },

        setTeamSize: (state, action: PayloadAction<number>) => {
            state.teamSize = Math.max(1, Math.min(15, action.payload));
        },

        setSelectedRegions: (state, action: PayloadAction<string[]>) => {
            state.selectedRegions = action.payload;
        },

        setBattleDifficulty: (state, action: PayloadAction<DifficultyId>) => {
            state.difficulty = action.payload;
            const diffLevel = DIFFICULTY_LEVELS.find(d => d.id === action.payload);
            if (diffLevel) {
                state.level = diffLevel.level;
            }
        },

        proceedToTeamSelection: (state) => {
            const valid =
                state.players[0].name.trim() !== '' &&
                state.players[1].name.trim() !== '' &&
                state.selectedRegions.length > 0;
            if (valid) {
                state.phase = 'TEAM_SELECTION';
            }
        },

        selectTeam: (state, action: PayloadAction<{ playerId: 0 | 1; teamIds: number[] }>) => {
            const { playerId, teamIds } = action.payload;
            state.players[playerId].selectedTeamIds = teamIds;
        },

        proceedToLoading: (state) => {
            const bothSelected = state.players.every(p => p.selectedTeamIds.length > 0);
            if (bothSelected) {
                state.phase = 'LOADING';
            }
        },

        setPlayerTeam: (state, action: PayloadAction<{ playerId: 0 | 1; team: BattlePokemon[] }>) => {
            const { playerId, team } = action.payload;
            state.players[playerId].team = team;
        },

        startBattle: (state) => {
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

        selectMove: (state, action: PayloadAction<{ playerId: 0 | 1; moveIndex: number }>) => {
            const { playerId, moveIndex } = action.payload;
            if (state.currentPlayerTurn !== playerId || state.players[playerId].hasActed) return;

            const attacker = state.players[playerId];
            const defender = state.players[1 - playerId];
            const attackingPokemon = attacker.team[attacker.activePokemon];
            const defendingPokemon = defender.team[defender.activePokemon];
            const move = attackingPokemon.selectedMoves[moveIndex];

            const damage = calculateDamage(
                defendingPokemon.types[0],
                move.power,
                attackingPokemon.calculatedStats.attack,
                defendingPokemon.calculatedStats.defense,
                move.type,
                attackingPokemon.types
            );

            defendingPokemon.currentHP = Math.max(defendingPokemon.currentHP - damage, 0);
            state.battleLog.push(`${attacker.name}'s ${attackingPokemon.name} used ${move.name}! (${damage} damage)`);
            attacker.hasActed = true;

            if (defendingPokemon.currentHP <= 0) {
                state.battleLog.push(`${defender.name}'s ${defendingPokemon.name} fainted!`);
                const nextIndex = getNextAlivePokemon(defender.team);
                if (nextIndex === undefined) {
                    state.phase = 'ENDED';
                    state.winner = attacker.name;
                    state.battleLog.push(`${attacker.name} wins the battle!`);
                } else {
                    defender.activePokemon = nextIndex;
                    state.battleLog.push(`${defender.name} sent out ${defender.team[nextIndex].name}!`);
                }
            }
        },

        switchPokemon: (state, action: PayloadAction<{ playerId: 0 | 1; index: number }>) => {
            const { playerId, index } = action.payload;
            if (state.currentPlayerTurn !== playerId || state.players[playerId].hasActed) return;

            const player = state.players[playerId];
            const newPokemon = player.team[index];
            if (index >= 0 && index < player.team.length && newPokemon.currentHP > 0) {
                const oldPokemon = player.team[player.activePokemon];
                player.activePokemon = index;
                player.hasActed = true;
                state.battleLog.push(`${player.name} withdrew ${oldPokemon.name} and sent out ${newPokemon.name}!`);
            }
        },

        endTurn: (state) => {
            if (!state.players[state.currentPlayerTurn].hasActed) return;
            state.players[state.currentPlayerTurn].hasActed = false;
            state.currentPlayerTurn = (1 - state.currentPlayerTurn) as 0 | 1;
            if (state.currentPlayerTurn === 0) {
                state.turn += 1;
            }
        },

        addBattleLog: (state, action: PayloadAction<string>) => {
            state.battleLog.push(action.payload);
        },

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
    setPlayerNames,
    setTeamSize,
    setSelectedRegions,
    setBattleDifficulty,
    proceedToTeamSelection,
    selectTeam,
    proceedToLoading,
    setPlayerTeam,
    startBattle,
    selectMove,
    switchPokemon,
    endTurn,
    addBattleLog,
    forfeit,
    resetBattle,
    resetToSetup,
} = battleSlice.actions;

export default battleSlice.reducer;
