import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { BattleAction, BattlePlayer, BattlePokemon, BattleState } from '@/apps/Pokeverse/helpers/battle.types';
import { BattleSimUtils } from '@/apps/Pokeverse/helpers/utilities';

const initialState: BattleState = {
    phase: 'SETUP',
    turn: 1,
    players: [
        { name: '', team: [], activePokemon: 0, hasActed: false },
        { name: '', team: [], activePokemon: 0, hasActed: false }
    ],
    currentPlayerTurn: 0,
    maxTeamSize: 6
};

const executeAction = (
    action: BattleAction,
    state: BattleState
): BattleState => {
    const { players, currentPlayerTurn, phase } = state;

    switch (action.type) {
        case 'SET_PLAYER_NAME': {
            if (phase !== 'SETUP' && phase !== 'PLAYER_NAMING') {
                return state;
            }

            const newPlayers = [...players];
            newPlayers[action.playerId] = {
                ...newPlayers[action.playerId],
                name: action.name
            };

            const bothPlayersNamed = newPlayers.every(player => player.name !== '');

            return {
                ...state,
                phase: bothPlayersNamed ? 'TEAM_SELECTION' : 'PLAYER_NAMING',
                players: newPlayers as [BattlePlayer, BattlePlayer]
            };
        }

        case 'ADD_POKEMON_TO_TEAM': {
            if (phase !== 'TEAM_SELECTION') {
                return state;
            }

            const player = players[action.playerId];
            if (player.team.length >= state.maxTeamSize) {
                return state;
            }

            const newPlayers = [...players];
            newPlayers[action.playerId] = {
                ...player,
                team: [...player.team, action.pokemon]
            };

            return {
                ...state,
                players: newPlayers as [BattlePlayer, BattlePlayer]
            };
        }

        case 'REMOVE_POKEMON_FROM_TEAM': {
            if (phase !== 'TEAM_SELECTION') {
                return state;
            }

            const player = players[action.playerId];
            const newPlayers = [...players];
            newPlayers[action.playerId] = {
                ...player,
                team: player.team.filter((_, index) => index !== action.pokemonIndex)
            };

            return {
                ...state,
                players: newPlayers as [BattlePlayer, BattlePlayer]
            };
        }

        case 'START_BATTLE': {
            if (phase !== 'TEAM_SELECTION' ||
                !BattleSimUtils.areTeamsValid(
                    players[0].team,
                    players[1].team,
                    state.maxTeamSize
                )) {
                return state;
            }

            return {
                ...state,
                phase: 'BATTLE'
            };
        }

        case 'SELECT_MOVE': {
            if (phase !== 'BATTLE' ||
                currentPlayerTurn !== action.playerId ||
                players[action.playerId].hasActed) {
                return state;
            }

            const player = players[action.playerId];
            const opponent = players[1 - action.playerId];
            const move = player.team[player.activePokemon].selectedMoves[action.moveIndex];

            const damage = BattleSimUtils.calculateDamage(
                player.team[player.activePokemon],
                opponent.team[opponent.activePokemon],
                move
            );

            const newPlayers = [...players];

            // Apply damage
            newPlayers[1 - action.playerId].team[opponent.activePokemon].currentHP = Math.max(
                opponent.team[opponent.activePokemon].currentHP - damage,
                0
            );

            // Mark player as having acted
            newPlayers[action.playerId] = {
                ...player,
                hasActed: true
            };

            // Check if opponent's active Pokemon fainted
            if (newPlayers[1 - action.playerId].team[opponent.activePokemon].currentHP <= 0) {
                const nextPokemon = BattleSimUtils.getNextPokemon(newPlayers[1 - action.playerId].team);
                if (nextPokemon === undefined) {
                    // No more Pokemon - game over
                    return {
                        ...state,
                        players: newPlayers as [BattlePlayer, BattlePlayer],
                        phase: 'ENDED',
                        winner: player.name
                    };
                }
                // Switch to next Pokemon
                newPlayers[1 - action.playerId].activePokemon = nextPokemon;
            }

            return {
                ...state,
                players: newPlayers as [BattlePlayer, BattlePlayer]
            };
        }

        case 'SWITCH_POKEMON': {
            if (phase !== 'BATTLE' ||
                currentPlayerTurn !== action.playerId ||
                players[action.playerId].hasActed ||
                !BattleSimUtils.canSwitchTo(
                    action.pokemonIndex,
                    players[action.playerId].team
                )) {
                return state;
            }

            const newPlayers = [...players];
            newPlayers[action.playerId] = {
                ...players[action.playerId],
                activePokemon: action.pokemonIndex,
                hasActed: true
            };

            return {
                ...state,
                players: newPlayers as [BattlePlayer, BattlePlayer]
            };
        }

        case 'END_TURN': {
            if (phase !== 'BATTLE' || !players[currentPlayerTurn].hasActed) {
                return state;
            }

            const newPlayers = [...players];
            newPlayers[currentPlayerTurn] = {
                ...players[currentPlayerTurn],
                hasActed: false
            };

            const nextPlayer = 1 - currentPlayerTurn;
            const newTurn = nextPlayer === 0 ? state.turn + 1 : state.turn;

            return {
                ...state,
                currentPlayerTurn: nextPlayer,
                turn: newTurn,
                players: newPlayers as [BattlePlayer, BattlePlayer]
            };
        }

        case 'FORFEIT': {
            if (phase !== 'BATTLE') {
                return state;
            }

            return {
                ...state,
                phase: 'ENDED',
                winner: players[1 - action.playerId].name
            };
        }

        default:
            return state;
    }
};

const battleReducer = (state: BattleState, action: BattleAction): BattleState => {
    const newState = executeAction(action, state);
    console.log('Action:', action.type, 'State:', newState); // Helpful for debugging
    return newState;
};

const BattleContext = createContext<{
    state: BattleState;
    dispatch: React.Dispatch<BattleAction>;
}>({ state: initialState, dispatch: () => { } });

export const BattleProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(battleReducer, initialState);
    return (
        <BattleContext.Provider value={{ state, dispatch }}>
            {children}
        </BattleContext.Provider>
    );
};

export const useBattle = () => useContext(BattleContext);

// Custom hooks for common battle operations
export const useBattleActions = () => {
    const { dispatch } = useBattle();

    return {
        setPlayerName: (playerId: number, name: string) =>
            dispatch({ type: 'SET_PLAYER_NAME', playerId, name }),

        addPokemonToTeam: (playerId: number, pokemon: BattlePokemon) =>
            dispatch({ type: 'ADD_POKEMON_TO_TEAM', playerId, pokemon }),

        removePokemonFromTeam: (playerId: number, pokemonIndex: number) =>
            dispatch({ type: 'REMOVE_POKEMON_FROM_TEAM', playerId, pokemonIndex }),

        startBattle: () => dispatch({ type: 'START_BATTLE' }),

        selectMove: (playerId: number, moveIndex: number) =>
            dispatch({ type: 'SELECT_MOVE', playerId, moveIndex }),

        switchPokemon: (playerId: number, pokemonIndex: number) =>
            dispatch({ type: 'SWITCH_POKEMON', playerId, pokemonIndex }),

        endTurn: () => dispatch({ type: 'END_TURN' }),

        forfeit: (playerId: number) => dispatch({ type: 'FORFEIT', playerId })
    };
};