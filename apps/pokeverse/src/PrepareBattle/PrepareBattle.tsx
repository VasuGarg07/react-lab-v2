import { CheckCircle2, Loader2, Swords } from 'lucide-react';
import { useNavigate } from 'react-router';
import { setPlayerTeam, startBattle } from '../store/battleSlice';
import { useAppDispatch, useAppSelector } from '../store/useRedux';
import { getOfficialSprite } from '../helpers/constants';
import { useBattlePokemon } from '../hooks/useBattlePokemon';

export default function PrepareBattle() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { teamSize, selectedRegions, players, level } = useAppSelector(state => state.battle);

    const player1Ids = players[0].selectedTeamIds;
    const player2Ids = players[1].selectedTeamIds;

    const { player1Team, player2Team, player1Ready, player2Ready, allReady, isError, error } = useBattlePokemon({
        player1Ids,
        player2Ids,
        level,
    });

    const handleBeginBattle = () => {
        dispatch(setPlayerTeam({ playerId: 0, team: player1Team.map(s => s.pokemon!) }));
        dispatch(setPlayerTeam({ playerId: 1, team: player2Team.map(s => s.pokemon!) }));
        dispatch(startBattle());
        navigate('/battle-sim/battle');
    };

    if (!teamSize || selectedRegions.length === 0) return null;

    if (isError) {
        return (
            <div className="flex-1 bg-chalk flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-sm border border-silver/40">
                    <div className="w-14 h-14 bg-crimson/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚠</span>
                    </div>
                    <h2 className="text-xl font-black text-shadow mb-2">Loading Failed</h2>
                    <p className="text-sm text-smoke mb-6">{error || 'Failed to load Pokémon data'}</p>
                    <button
                        onClick={() => navigate('/battle-sim')}
                        className="px-6 py-3 rounded-xl bg-linear-to-br from-crimson to-ruby text-white font-black text-sm shadow-sm shadow-crimson/20 hover:shadow-crimson/40 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Back to Setup
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-chalk py-10 px-4">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center gap-4 pb-2">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shrink-0 transition-all duration-500 ${allReady ? 'bg-green-500 shadow-green-500/30' : 'bg-crimson shadow-crimson/30'}`}>
                        {allReady
                            ? <CheckCircle2 className="w-6 h-6 text-white" />
                            : <Loader2 className="w-6 h-6 text-white animate-spin" />
                        }
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-shadow tracking-tight leading-none">
                            {allReady ? 'Teams Ready!' : 'Preparing Battle'}
                        </h1>
                        <p className="text-sm text-smoke mt-0.5">
                            {allReady ? 'All Pokémon are loaded and ready' : 'Loading your Pokémon teams...'}
                        </p>
                    </div>
                </div>

                {/* Player cards */}
                <div className="grid sm:grid-cols-2 gap-5">
                    {[
                        { player: players[0], team: player1Team, ids: player1Ids, ready: player1Ready, accent: 'crimson' as const },
                        { player: players[1], team: player2Team, ids: player2Ids, ready: player2Ready, accent: 'azure' as const },
                    ].map(({ player, team, ids, ready, accent }) => {
                        const accentClasses = accent === 'crimson'
                            ? { text: 'text-crimson', avatar: 'bg-crimson', border: 'border-crimson', bg: 'bg-crimson/5' }
                            : { text: 'text-azure', avatar: 'bg-azure', border: 'border-azure', bg: 'bg-azure/5' };
                        return (
                            <div key={player.name} className="rounded-2xl bg-white border border-silver/40 p-5 shadow-sm">
                                <div className="flex items-center justify-between border-b border-silver/30 pb-3 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-xl ${accentClasses.avatar} flex items-center justify-center shadow-sm`}>
                                            <span className="text-white font-black text-sm">{player.name[0].toUpperCase()}</span>
                                        </div>
                                        <div>
                                            <p className={`font-black text-sm ${accentClasses.text}`}>{player.name}</p>
                                            <p className="text-[10px] text-smoke">{team.filter(s => !s.isLoading).length} / {team.length} ready</p>
                                        </div>
                                    </div>
                                    {ready && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                                </div>
                                <div className="grid grid-cols-3 gap-2.5">
                                    {team.map((state, index) => {
                                        const pokemonId = ids[index];
                                        return (
                                            <div
                                                key={index}
                                                className={`relative aspect-square rounded-xl border-2 transition-all duration-500 ${state.isLoading
                                                    ? 'border-silver/30 bg-chalk'
                                                    : `${accentClasses.border} ${accentClasses.bg}`
                                                }`}
                                            >
                                                <img
                                                    src={getOfficialSprite(pokemonId)}
                                                    alt={state.pokemon?.name || `Pokemon ${pokemonId}`}
                                                    className={`w-full h-full object-contain p-1.5 transition-all duration-500 ${state.isLoading ? 'grayscale opacity-30' : 'opacity-100'}`}
                                                />
                                                <div className={`absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${state.isLoading ? 'bg-silver/40' : 'bg-green-500'}`}>
                                                    {state.isLoading
                                                        ? <Loader2 className="w-2.5 h-2.5 text-white animate-spin" />
                                                        : <span className="text-white text-[9px] font-black">✓</span>
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <button
                    onClick={handleBeginBattle}
                    disabled={!allReady}
                    className={`w-full py-4 rounded-2xl font-black text-base tracking-wide transition-all duration-300 flex items-center justify-center gap-3 ${allReady
                        ? 'bg-linear-to-br from-crimson to-ruby text-white shadow-lg shadow-crimson/25 hover:shadow-crimson/40 hover:-translate-y-0.5 cursor-pointer'
                        : 'bg-silver/20 text-silver cursor-not-allowed'
                    }`}
                >
                    <Swords className="w-5 h-5" />
                    {allReady ? 'Begin Battle' : 'Loading...'}
                    <Swords className="w-5 h-5" />
                </button>

            </div>
        </div>
    );
}
