import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../store/useRedux';
import { useBattlePokemon } from '../hooks/useBattlePokemon';
import { Loader2, CheckCircle2, Swords } from 'lucide-react';
import { isInitialBattleState, loadBattleState, setPlayerTeam, startBattle } from '../../../store/battleSlice';
import { getOfficialSprite } from '../helpers/constants';

export default function PrepareBattle() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const battleState = useAppSelector(state => state.battle);
  const { teamSize, selectedRegions, players, level } = battleState;

  const [hasLoaded, setHasLoaded] = useState(false);

  // Load from localStorage if Redux is empty
  useEffect(() => {
    if (!hasLoaded && isInitialBattleState(battleState)) {
      dispatch(loadBattleState());
      setHasLoaded(true);
    }
  }, [hasLoaded, battleState, dispatch]);

  // Redirect if no setup data after load attempt
  useEffect(() => {
    if (hasLoaded && (!teamSize || selectedRegions.length === 0)) {
      navigate('/pokeverse/battle-sim', { replace: true });
    }
  }, [hasLoaded, teamSize, selectedRegions, navigate]);

  const player1Ids = players[0].selectedTeamIds;
  const player2Ids = players[1].selectedTeamIds;

  const {
    player1Team,
    player2Team,
    player1Ready,
    player2Ready,
    allReady,
    isError,
    error
  } = useBattlePokemon({
    player1Ids,
    player2Ids,
    level,
  });

  const handleBeginBattle = () => {
    // Save teams to Redux
    dispatch(setPlayerTeam({
      playerId: 0,
      team: player1Team.map(state => state.pokemon!)
    }));
    dispatch(setPlayerTeam({
      playerId: 1,
      team: player2Team.map(state => state.pokemon!)
    }));
    dispatch(startBattle());

    // Navigate to battle screen
    navigate('/pokeverse/battle-sim/battle');
  };

  // If no setup data, don't render (will redirect)
  if (!teamSize || selectedRegions.length === 0) {
    return null;
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-linear-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 max-w-md text-center shadow-xl">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            Loading Failed
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {error || 'Failed to load Pokemon data'}
          </p>
          <button
            onClick={() => navigate('/pokeverse/battle-sim')}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200"
          >
            Back to Setup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-purple-950 dark:via-blue-950 dark:to-pink-950 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-lg transition-all duration-500 ${allReady
            ? 'bg-linear-to-br from-green-500 to-emerald-500'
            : 'bg-linear-to-br from-purple-500 to-pink-500'
            }`}>
            {allReady ? (
              <CheckCircle2 className="w-8 h-8 text-white" />
            ) : (
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400 mb-2">
            {allReady ? 'TEAMS READY!' : 'PREPARING BATTLE'}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 font-medium">
            {allReady ? 'All Pokemon are ready to battle!' : 'Loading your Pokemon teams...'}
          </p>
        </div>

        {/* Two Teams Grid */}
        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          {/* Player 1 Team */}
          <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 shadow-lg">
            {/* Team Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold">{players[0].name[0].toUpperCase()}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {players[0].name}
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {player1Team.filter(s => !s.isLoading).length} / {player1Team.length} Ready
                  </p>
                </div>
              </div>
              {player1Ready && (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              )}
            </div>

            {/* Pokemon Grid */}
            <div className="grid grid-cols-3 gap-4">
              {player1Team.map((state, index) => {
                const pokemonId = player1Ids[index];
                return (
                  <div
                    key={index}
                    className={`relative aspect-square rounded-xl border-2 transition-all duration-500 ${state.isLoading
                      ? 'border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-900'
                      : 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30'
                      }`}
                  >
                    <img
                      src={getOfficialSprite(pokemonId)}
                      alt={state.pokemon?.name || `Pokemon ${pokemonId}`}
                      className={`w-full h-full object-contain p-2 transition-all duration-500 ${state.isLoading ? 'grayscale brightness-75 opacity-50' : 'grayscale-0 opacity-100'
                        }`}
                    />
                    {state.isLoading ? (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-neutral-500 rounded-full flex items-center justify-center">
                        <Loader2 className="w-3 h-3 text-white animate-spin" />
                      </div>
                    ) : (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Player 2 Team */}
          <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 shadow-lg">
            {/* Team Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white font-bold">{players[1].name[0].toUpperCase()}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {players[1].name}
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {player2Team.filter(s => !s.isLoading).length} / {player2Team.length} Ready
                  </p>
                </div>
              </div>
              {player2Ready && (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              )}
            </div>

            {/* Pokemon Grid */}
            <div className="grid grid-cols-3 gap-4">
              {player2Team.map((state, index) => {
                const pokemonId = player2Ids[index];
                return (
                  <div
                    key={index}
                    className={`relative aspect-square rounded-xl border-2 transition-all duration-500 ${state.isLoading
                      ? 'border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-900'
                      : 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-950/30'
                      }`}
                  >
                    <img
                      src={getOfficialSprite(pokemonId)}
                      alt={state.pokemon?.name || `Pokemon ${pokemonId}`}
                      className={`w-full h-full object-contain p-2 transition-all duration-500 ${state.isLoading ? 'grayscale brightness-75 opacity-50' : 'grayscale-0 opacity-100'
                        }`}
                    />
                    {!state.isLoading && (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Begin Battle Button */}
        <div className="text-center">
          <button
            onClick={handleBeginBattle}
            disabled={!allReady}
            className={`px-8 py-4 rounded-xl text-lg font-black shadow-xl transition-all duration-300 ${allReady
              ? 'bg-linear-to-r from-purple-600 via-pink-600 to-red-600 text-white hover:shadow-2xl hover:scale-105 cursor-pointer'
              : 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed opacity-50'
              }`}
          >
            {allReady ? (
              <span className="flex items-center gap-2">
                <Swords className="w-6 h-6" />
                BEGIN BATTLE
                <Swords className="w-6 h-6" />
              </span>
            ) : (
              'LOADING...'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}