import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { proceedToLoading, saveBattleState, selectTeam } from '../../../store/battleSlice';
import { useAppDispatch, useAppSelector } from '../../../store/useRedux';
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

    // Generate random teams on mount
    useEffect(() => {
        if (phase === 'TEAM_SELECTION') {
            const p1Teams = generateRandomTeams(teamSize, selectedRegions, 6);
            const p2Teams = generateRandomTeams(teamSize, selectedRegions, 6);

            setPlayer1Teams(p1Teams);
            setPlayer2Teams(p2Teams);
        }
    }, [phase, teamSize, selectedRegions]);

    // Handle team selection
    const handleSelectP1 = (index: number) => {
        if (revealedP1) return;
        setSelectedP1Team(index);
    };

    const handleSelectP2 = (index: number) => {
        if (revealedP2) return;
        setSelectedP2Team(index);
    };

    // Confirm selection and reveal
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

    // Proceed to loading when both confirmed
    const handleProceed = () => {
        if (revealedP1 && revealedP2) {
            dispatch(proceedToLoading());
            dispatch(saveBattleState());
            navigate('/pokeverse/battle-sim/loading');
        }
    };

    const bothConfirmed = revealedP1 && revealedP2;

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-neutal-50 to-purple-100 dark:from-neutral-900 dark:via-blue-950 dark:to-purple-950 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-purple-500 to-pink-500 mb-4 shadow-lg">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400 mb-2">
                        CHOOSE YOUR TEAM
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-300 font-medium">
                        Select your squad and reveal your champions! ✨
                    </p>
                </div>

                {/* Teams Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Player 1 Side */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">

                                <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                    {players[0].name}
                                </h2>
                            </div>
                            {!revealedP1 && selectedP1Team !== null && (
                                <button
                                    onClick={handleConfirmP1}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    Reveal Team
                                </button>
                            )}
                            {revealedP1 && (
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                                    ✓ Confirmed
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
                            {player1Teams.map((team, index) => (
                                <TeamCard
                                    key={index}
                                    teamIds={team}
                                    teamIndex={index}
                                    isSelected={selectedP1Team === index}
                                    isRevealed={revealedP1 && selectedP1Team === index}
                                    onSelect={() => handleSelectP1(index)}
                                    playerColor="blue"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Player 2 Side */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">

                                <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
                                    {players[1].name}
                                </h2>
                            </div>
                            {!revealedP2 && selectedP2Team !== null && (
                                <button
                                    onClick={handleConfirmP2}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    Reveal Team
                                </button>
                            )}
                            {revealedP2 && (
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                                    ✓ Confirmed
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
                            {player2Teams.map((team, index) => (
                                <TeamCard
                                    key={index}
                                    teamIds={team}
                                    teamIndex={index}
                                    isSelected={selectedP2Team === index}
                                    isRevealed={revealedP2 && selectedP2Team === index}
                                    onSelect={() => handleSelectP2(index)}
                                    playerColor="red"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Proceed Button */}
                {bothConfirmed && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={handleProceed}
                            className="group relative px-8 py-4 bg-linear-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white rounded-2xl font-black text-xl transition-all duration-300 shadow-xl hover:shadow-purple-500/50 hover:scale-105"
                        >
                            <span className="relative">START BATTLE! ⚔️</span>
                        </button>
                    </div>
                )}

                {/* Instructions */}
                {!bothConfirmed && (
                    <div className="mt-8 p-4 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-xl border border-neutral-200 dark:border-neutral-700 text-center">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            💡 <strong>Both players</strong> must select and confirm their teams to proceed
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}