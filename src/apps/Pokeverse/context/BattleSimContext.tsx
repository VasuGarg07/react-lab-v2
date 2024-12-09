import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { BattleAction, BattleState } from '../helpers/battle.types';
import { BattleSimUtils } from '../helpers/utilities';

const executeAction = (
    action: BattleAction,
    state: BattleState
): BattleState => {
    const { players } = state;
    const player = players[action.playerId];
    const opponent = players[1 - action.playerId];

    switch (action.type) {
        case 'SELECT_MOVE':
            const move = player.team[player.activePokemon].selectedMoves[action.moveIndex];
            const damage = BattleSimUtils.calculateDamage(
                player.team[player.activePokemon],
                opponent.team[opponent.activePokemon],
                move
            );
            opponent.team[opponent.activePokemon].currentHP = Math.max(
                opponent.team[opponent.activePokemon].currentHP - damage,
                0
            );
            break;

        case 'SWITCH_POKEMON':
            player.activePokemon = action.pokemonIndex;
            break;

        case 'END_TURN':
            state.turn += 1;
            break;
    }

    // Check win condition
    if (opponent.team.every(pokemon => pokemon.currentHP <= 0)) {
        state.isActive = false;
        state.winner = player.name;
    }

    return state;
};


const initialState: BattleState = {
    turn: 1,
    players: [
        { name: 'Player 1', team: [], activePokemon: 0 },
        { name: 'Player 2', team: [], activePokemon: 0 }
    ],
    isActive: true
};

const battleReducer = (state: BattleState, action: BattleAction): BattleState => {
    return executeAction(action, state);
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
