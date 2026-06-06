import { Sparkles, Swords } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { proceedToLoading, saveBattleState, selectTeam } from '../store/battleSlice';
import { useAppDispatch, useAppSelector } from '../store/useRedux';
import { generateRandomTeams } from '../helpers/utilities';
import TeamCard from './TeamCard';

export default function TeamSelection() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { players, teamSize, selectedRegions, phase } = useAppSelector(state => state.battle);

    const [player1Teams, setPlayer1Teams] = useState<number[][]>([]);
    const [player2Teams, setPlayer2Teams] = useState<number[][]>([]);
    const [selectedP1Team, setSelectedP1Team] = useState<number | null>(null);
    const [selectedP2Team, setSelectedP2Team] = useState<number | null>(null);
    const [revealedP1, setRevealedP1] = useState(false);
    const [revealedP2, setRevealedP2] = useState(false);

    useEffect(() => {
        if (phase === 'TEAM_SELECTION') {
            setPlayer1Teams(generateRandomTeams(teamSize, selectedRegions, 6));
            setPlayer2Teams(generateRandomTeams(teamSize, selectedRegions, 6));
        }
    }, [phase, teamSize, selectedRegions]);

    const handleSelectP1 = (index: number) => { if (!revealedP1) setSelectedP1Team(index); };
    const handleSelectP2 = (index: number) => { if (!revealedP2) setSelectedP2Team(index); };

    const handleConfirmP1 = () => {
        if (selectedP1Team === null) return;
        setRevealedP1(true);
        dispatch(selectTeam({ playerId: 0, teamIds: player1Teams[selectedP1Team] }));
    };

    const handleConfirmP2 = () => {
        if (selectedP2Team === null) return;
        setRevealedP2(true);
        dispatch(selectTeam({ playerId: 1, teamIds: player2Teams[selectedP2Team] }));
    };

    const handleProceed = () => {
        if (revealedP1 && revealedP2) {
            dispatch(proceedToLoading());
            dispatch(saveBattleState());
            navigate('/battle-sim/loading');
        }
    };

    const bothConfirmed = revealedP1 && revealedP2;

    return (
        <div className="flex-1 bg-chalk py-10 px-4">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center gap-4 pb-2">
                    <div className="w-12 h-12 rounded-2xl bg-crimson flex items-center justify-center shadow-lg shadow-crimson/30 shrink-0">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-shadow tracking-tight leading-none">Team Selection</h1>
                        <p className="text-sm text-smoke mt-0.5">Pick your squad — then reveal your champions</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Player 1 */}
                    <div className="rounded-2xl bg-white border border-silver/40 p-5 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-silver/30 pb-3">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-smoke">Player 1</p>
                                <p className="text-base font-black text-crimson leading-tight">{players[0].name}</p>
                            </div>
                            {!revealedP1 && selectedP1Team !== null && (
                                <button onClick={handleConfirmP1} className="px-4 py-2 rounded-xl bg-linear-to-br from-crimson to-ruby text-white text-sm font-black shadow-sm shadow-crimson/20 hover:shadow-crimson/40 hover:-translate-y-0.5 transition-all duration-200">
                                    Reveal Team
                                </button>
                            )}
                            {revealedP1 && (
                                <span className="px-3 py-1 bg-crimson/10 text-crimson rounded-full text-xs font-black">✓ Confirmed</span>
                            )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                            {player1Teams.map((team, index) => (
                                <TeamCard
                                    key={index}
                                    teamIds={team}
                                    teamIndex={index}
                                    isSelected={selectedP1Team === index}
                                    isRevealed={revealedP1 && selectedP1Team === index}
                                    onSelect={() => handleSelectP1(index)}
                                    playerColor="red"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Player 2 */}
                    <div className="rounded-2xl bg-white border border-silver/40 p-5 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-silver/30 pb-3">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-smoke">Player 2</p>
                                <p className="text-base font-black text-azure leading-tight">{players[1].name}</p>
                            </div>
                            {!revealedP2 && selectedP2Team !== null && (
                                <button onClick={handleConfirmP2} className="px-4 py-2 rounded-xl bg-linear-to-br from-azure to-cobalt text-white text-sm font-black shadow-sm shadow-azure/20 hover:shadow-azure/40 hover:-translate-y-0.5 transition-all duration-200">
                                    Reveal Team
                                </button>
                            )}
                            {revealedP2 && (
                                <span className="px-3 py-1 bg-azure/10 text-azure rounded-full text-xs font-black">✓ Confirmed</span>
                            )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                            {player2Teams.map((team, index) => (
                                <TeamCard
                                    key={index}
                                    teamIds={team}
                                    teamIndex={index}
                                    isSelected={selectedP2Team === index}
                                    isRevealed={revealedP2 && selectedP2Team === index}
                                    onSelect={() => handleSelectP2(index)}
                                    playerColor="blue"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {bothConfirmed ? (
                    <button
                        onClick={handleProceed}
                        className="w-full py-4 rounded-2xl bg-linear-to-br from-crimson to-ruby text-white font-black text-base tracking-wide transition-all duration-200 shadow-lg shadow-crimson/25 hover:shadow-crimson/40 hover:-translate-y-0.5 flex items-center justify-center gap-3"
                    >
                        <Swords className="w-5 h-5" />
                        Begin Battle
                        <Swords className="w-5 h-5" />
                    </button>
                ) : (
                    <div className="p-4 bg-white rounded-xl border border-silver/40 text-center">
                        <p className="text-sm text-smoke">
                            <strong className="text-shadow">Both players</strong> must select and confirm their teams to proceed
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
