import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BattlePokemon, BattleState } from '../apps/Pokeverse/helpers/types';
import { calculateDamage, getNextAlivePokemon } from '../apps/Pokeverse/helpers/utilities';

const initialState: BattleState = {
    phase: 'SETUP',
    turn: 1,
    players: [
        { name: '', team: [], activePokemon: 0, hasActed: false },
        { name: '', team: [], activePokemon: 0, hasActed: false },
    ],
    currentPlayerTurn: 0,
    maxTeamSize: 6,
};

const battleSlice = createSlice({
    name: 'battle',
    initialState,
    reducers: {
        setPlayerName: (state, action: PayloadAction<{ playerId: number; name: string }>) => {
            const { playerId, name } = action.payload;
            state.players[playerId].name = name;

            const bothNamed = state.players.every(p => p.name !== '');
            if (bothNamed && state.phase === 'SETUP') {
                state.phase = 'TEAM_SELECTION';
            }
        },

        addPokemonToTeam: (state, action: PayloadAction<{ playerId: number; pokemon: BattlePokemon }>) => {
            const { playerId, pokemon } = action.payload;
            const player = state.players[playerId];

            if (player.team.length < state.maxTeamSize) {
                player.team.push(pokemon);
            }
        },

        removePokemonFromTeam: (state, action: PayloadAction<{ playerId: number; index: number }>) => {
            const { playerId, index } = action.payload;
            state.players[playerId].team.splice(index, 1);
        },

        startBattle: (state) => {
            const teamsValid = state.players.every(p => p.team.length > 0 && p.team.length <= state.maxTeamSize);
            if (teamsValid) {
                state.phase = 'BATTLE';
            }
        },

        selectMove: (state, action: PayloadAction<{ playerId: number; moveIndex: number }>) => {
            const { playerId, moveIndex } = action.payload;

            if (state.currentPlayerTurn !== playerId || state.players[playerId].hasActed) {
                return;
            }

            const attacker = state.players[playerId];
            const defender = state.players[1 - playerId];
            const move = attacker.team[attacker.activePokemon].selectedMoves[moveIndex];

            const damage = calculateDamage(
                defender.team[defender.activePokemon].types[0],
                move.power,
                attacker.team[attacker.activePokemon].calculatedStats.attack,
                defender.team[defender.activePokemon].calculatedStats.defense,
                move.type,
                attacker.team[attacker.activePokemon].types
            );

            defender.team[defender.activePokemon].currentHP = Math.max(
                defender.team[defender.activePokemon].currentHP - damage,
                0
            );

            attacker.hasActed = true;

            if (defender.team[defender.activePokemon].currentHP <= 0) {
                const nextIndex = getNextAlivePokemon(defender.team);

                if (nextIndex === undefined) {
                    state.phase = 'ENDED';
                    state.winner = attacker.name;
                } else {
                    defender.activePokemon = nextIndex;
                }
            }
        },

        switchPokemon: (state, action: PayloadAction<{ playerId: number; index: number }>) => {
            const { playerId, index } = action.payload;

            if (state.currentPlayerTurn !== playerId || state.players[playerId].hasActed) {
                return;
            }

            const player = state.players[playerId];
            if (index >= 0 && index < player.team.length && player.team[index].currentHP > 0) {
                player.activePokemon = index;
                player.hasActed = true;
            }
        },

        endTurn: (state) => {
            if (!state.players[state.currentPlayerTurn].hasActed) {
                return;
            }

            state.players[state.currentPlayerTurn].hasActed = false;
            state.currentPlayerTurn = 1 - state.currentPlayerTurn;

            if (state.currentPlayerTurn === 0) {
                state.turn += 1;
            }
        },

        forfeit: (state, action: PayloadAction<number>) => {
            const playerId = action.payload;
            state.phase = 'ENDED';
            state.winner = state.players[1 - playerId].name;
        },

        resetBattle: () => initialState,
    },
});

export const {
    setPlayerName,
    addPokemonToTeam,
    removePokemonFromTeam,
    startBattle,
    selectMove,
    switchPokemon,
    endTurn,
    forfeit,
    resetBattle,
} = battleSlice.actions;

export default battleSlice.reducer;