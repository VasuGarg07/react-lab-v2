import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/useRedux';
import { endTurn, forfeit, resetToSetup, selectMove, switchPokemon } from '../store/battleSlice';
import PokemonDisplay from './PokemonDisplay';
import TeamPartyStatus from './TeamPartyStatus';
import BattleLog from './BattleLog';
import ActionPanel from './ActionPanel';
import MovePanel from './MovePanel';
import SwitchPanel from './SwitchPanel';
import WaitingPanel from './WaitingPanel';
import BattleEndDialog from './BattleEndDialog';

const TERRAINS = [
    { sky: 'from-sky-300 via-sky-200 to-blue-100',       ground: '#4a7c3f', groundLight: '#5a9c4f' },
    { sky: 'from-violet-900 via-indigo-900 to-slate-950', ground: '#1a1035', groundLight: '#2a1f55' },
    { sky: 'from-orange-400 via-red-500 to-orange-900',   ground: '#7c2d12', groundLight: '#9a3d1a' },
    { sky: 'from-cyan-400 via-blue-500 to-blue-900',      ground: '#1e3a5f', groundLight: '#1a5276' },
    { sky: 'from-slate-400 via-slate-300 to-blue-200',    ground: '#374151', groundLight: '#4b5563' },
    { sky: 'from-amber-200 via-yellow-100 to-cyan-200',   ground: '#c4973a', groundLight: '#d4a84a' },
    { sky: 'from-emerald-400 via-green-300 to-lime-200',  ground: '#166534', groundLight: '#15803d' },
    { sky: 'from-blue-900 via-cyan-800 to-teal-700',      ground: '#134e4a', groundLight: '#0f766e' },
    { sky: 'from-rose-400 via-orange-300 to-amber-200',   ground: '#7c2d12', groundLight: '#9a3d1a' },
] as const;

export default function BattleScreen() {
    const dispatch = useAppDispatch();
    const battle = useAppSelector(state => state.battle);
    const [selectedAction, setSelectedAction] = useState<'fight' | 'switch' | null>(null);
    const [terrain] = useState(() => TERRAINS[Math.floor(Math.random() * TERRAINS.length)]);

    const p0 = battle.players[0];
    const p1 = battle.players[1];
    const pokemon0 = p0.team[p0.activePokemon];
    const pokemon1 = p1.team[p1.activePokemon];

    const currentPlayer = battle.players[battle.currentPlayerTurn];
    const activePokemon = currentPlayer.team[currentPlayer.activePokemon];
    const isP0Turn = battle.currentPlayerTurn === 0;

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

    const handleForfeit = () => dispatch(forfeit(battle.currentPlayerTurn));

    const controls = !currentPlayer.hasActed ? (
        selectedAction === null ? (
            <ActionPanel
                playerName={currentPlayer.name}
                isP0Turn={isP0Turn}
                onFight={() => setSelectedAction('fight')}
                onSwitch={() => setSelectedAction('switch')}
                onForfeit={handleForfeit}
            />
        ) : selectedAction === 'fight' ? (
            <MovePanel moves={activePokemon.selectedMoves} onSelect={handleMoveSelect} onBack={() => setSelectedAction(null)} />
        ) : (
            <SwitchPanel team={currentPlayer.team} activeIndex={currentPlayer.activePokemon} onSwitch={handleSwitch} onBack={() => setSelectedAction(null)} />
        )
    ) : (
        <WaitingPanel playerName={currentPlayer.name} />
    );

    // Battle ended — replace HUD with end screen inline
    if (battle.phase === 'ENDED') {
        return (
            <div className="flex-1 flex flex-col min-h-0">
                {/* Keep arena visible in background */}
                <div className={`relative flex-1 bg-linear-to-b ${terrain.sky} overflow-hidden`} style={{ minHeight: 260 }}>
                    <div className="absolute bottom-0 left-0 right-0 h-20"
                        style={{ background: `linear-gradient(to bottom, ${terrain.groundLight}, ${terrain.ground})` }} />
                    <div className="absolute top-3 right-3 sm:right-6 flex flex-col items-end gap-2">
                        <TeamPartyStatus team={p1.team} playerName={p1.name} isOpponent={true} />
                        <PokemonDisplay pokemon={pokemon1} isOpponent={true} />
                    </div>
                    <div className="absolute bottom-2 left-3 sm:left-6 flex flex-col items-start gap-1.5">
                        <PokemonDisplay pokemon={pokemon0} isOpponent={false} />
                        <TeamPartyStatus team={p0.team} playerName={p0.name} isOpponent={false} />
                    </div>
                </div>
                {/* End screen in HUD strip */}
                <div className="shrink-0" style={{ background: '#e8dcc8', borderTop: '4px solid #b8a88a' }}>
                    <div className="max-w-2xl mx-auto px-3 py-3">
                        <BattleEndDialog
                            winner={battle.winner!}
                            onPlayAgain={() => dispatch(resetToSetup())}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col min-h-0">

            <div className={`relative flex-1 bg-linear-to-b ${terrain.sky} overflow-hidden`} style={{ minHeight: 260 }}>
                <div className="absolute bottom-0 left-0 right-0 h-20"
                    style={{ background: `linear-gradient(to bottom, ${terrain.groundLight}, ${terrain.ground})` }} />
                <div className="absolute top-3 right-3 sm:right-6 flex flex-col items-end gap-2">
                    <TeamPartyStatus team={p1.team} playerName={p1.name} isOpponent={true} />
                    <PokemonDisplay pokemon={pokemon1} isOpponent={true} />
                </div>
                <div className="absolute bottom-3 left-3 sm:left-6 flex flex-col items-start gap-1.5">
                    <TeamPartyStatus team={p0.team} playerName={p0.name} isOpponent={false} />
                    <PokemonDisplay pokemon={pokemon0} isOpponent={false} />
                </div>
            </div>

            <div className="shrink-0" style={{ background: '#e8dcc8', borderTop: '4px solid #b8a88a' }}>
                <div className="max-w-5xl mx-auto px-3 py-3 flex flex-col lg:flex-row gap-3">
                    <div className="flex-1 min-w-0">
                        <BattleLog logs={battle.battleLog} turn={battle.turn} />
                    </div>
                    <div className="lg:w-72 shrink-0">
                        {controls}
                    </div>
                </div>
            </div>

        </div>
    );
}
