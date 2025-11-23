import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/useRedux';
import { endTurn, forfeit, resetToSetup, selectMove, switchPokemon } from '../../../store/battleSlice';
import PokemonDisplay from './PokemonDisplay';
import TeamPartyStatus from './TeamPartyStatus';
import BattleLog from './BattleLog';
import ActionPanel from './ActionPanel';
import MovePanel from './MovePanel';
import SwitchPanel from './SwitchPanel';
import WaitingPanel from './WaitingPanel';
import BattleEndDialog from './BattleEndDialog';
import { useModal } from '../../../components/ModalContext';

export default function BattleScreen() {
    const dispatch = useAppDispatch();
    const battle = useAppSelector(state => state.battle);
    const modal = useModal();
    const [selectedAction, setSelectedAction] = useState<'fight' | 'switch' | null>(null);

    const currentPlayer = battle.players[battle.currentPlayerTurn];
    const opponent = battle.players[1 - battle.currentPlayerTurn];
    const activePokemon = currentPlayer.team[currentPlayer.activePokemon];
    const opponentPokemon = opponent.team[opponent.activePokemon];

    // Show dialog when battle ends
    useEffect(() => {
        if (battle.phase === 'ENDED') {
            modal.open(
                <BattleEndDialog
                    winner={battle.winner!}
                    onPlayAgain={() => {
                        dispatch(resetToSetup());
                        modal.close();
                    }}
                />
            );
        }
    }, [battle.phase, battle.winner, dispatch, modal]);

    const handleMoveSelect = (moveIndex: number) => {
        dispatch(selectMove({ playerId: battle.currentPlayerTurn, moveIndex }));
        setSelectedAction(null);
        setTimeout(() => dispatch(endTurn()), 1000);
    };

    const handleSwitch = (index: number) => {
        dispatch(switchPokemon({ playerId: battle.currentPlayerTurn, index }));
        setSelectedAction(null);
        setTimeout(() => dispatch(endTurn()), 1000);
    };

    const handleForfeit = () => {
        dispatch(forfeit(battle.currentPlayerTurn));
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-sky-300 to-green-200 dark:from-neutral-900 dark:to-neutral-800">
            <div className="max-w-6xl mx-auto p-4 pt-20">
                <div className="space-y-4">

                    {/* Opponent Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                        {/* Opponent Team Status */}
                        <div className="order-2 md:order-1">
                            <TeamPartyStatus
                                team={opponent.team}
                                playerName={opponent.name}
                                isOpponent={true}
                            />
                        </div>

                        {/* Opponent Pokemon Display */}
                        <div className="order-1 md:order-2">
                            <PokemonDisplay
                                pokemon={opponentPokemon}
                                playerName={opponent.name}
                                isOpponent={true}
                            />
                        </div>
                    </div>

                    {/* Player Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                        {/* Player Pokemon Display */}
                        <div className="order-1">
                            <PokemonDisplay
                                pokemon={activePokemon}
                                playerName={currentPlayer.name}
                                isOpponent={false}
                            />
                        </div>

                        {/* Player Team Status */}
                        <div className="order-2">
                            <TeamPartyStatus
                                team={currentPlayer.team}
                                playerName={currentPlayer.name}
                                isOpponent={false}
                            />
                        </div>
                    </div>

                    {/* Battle Controls */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Battle Log */}
                        <div className="lg:col-span-2 order-2 lg:order-1">
                            <BattleLog logs={battle.battleLog} turn={battle.turn} />
                        </div>

                        {/* Action Panel */}
                        <div className="lg:col-span-1 order-1 lg:order-2">
                            {!currentPlayer.hasActed ? (
                                selectedAction === null ? (
                                    <ActionPanel
                                        onFight={() => setSelectedAction('fight')}
                                        onSwitch={() => setSelectedAction('switch')}
                                        onForfeit={handleForfeit}
                                    />
                                ) : selectedAction === 'fight' ? (
                                    <MovePanel
                                        moves={activePokemon.selectedMoves}
                                        onSelect={handleMoveSelect}
                                        onBack={() => setSelectedAction(null)}
                                    />
                                ) : (
                                    <SwitchPanel
                                        team={currentPlayer.team}
                                        activeIndex={currentPlayer.activePokemon}
                                        onSwitch={handleSwitch}
                                        onBack={() => setSelectedAction(null)}
                                    />
                                )
                            ) : (
                                <WaitingPanel playerName={currentPlayer.name} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}