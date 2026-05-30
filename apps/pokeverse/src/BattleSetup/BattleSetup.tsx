import { Crown, Flame, Swords, Trophy, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
    proceedToTeamSelection,
    saveBattleState,
    setBattleDifficulty,
    setPlayerNames,
    setSelectedRegions,
    setTeamSize,
} from '../store/battleSlice';
import { useAppDispatch } from '../store/useRedux';
import { Slider, TextInput } from '@react-lab/ui';
import { DIFFICULTY_LEVELS, REGIONS } from '../helpers/constants';
import type { DifficultyId } from '../helpers/types';

const difficultyIcons = {
    beginner: Flame,
    intermediate: Zap,
    advanced: Trophy,
    master: Crown,
};

export default function BattleSetup() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    const [teamSize, setTeamSizeLocal] = useState(6);
    const [selectedRegions, setSelectedRegionsLocal] = useState<string[]>([]);
    const [difficulty, setDifficultyLocal] = useState<DifficultyId>('intermediate');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const toggleRegion = (regionName: string) => {
        setSelectedRegionsLocal(prev =>
            prev.includes(regionName) ? prev.filter(r => r !== regionName) : [...prev, regionName]
        );
    };

    const selectAllRegions = () => setSelectedRegionsLocal(REGIONS.map(r => r.name.toLowerCase()));
    const clearAllRegions = () => setSelectedRegionsLocal([]);

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!player1Name.trim()) newErrors.player1 = 'Player 1 name is required';
        if (!player2Name.trim()) newErrors.player2 = 'Player 2 name is required';
        if (selectedRegions.length === 0) newErrors.regions = 'Please select at least one region';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleStartBattle = () => {
        if (!validate()) return;
        dispatch(setPlayerNames({ player1: player1Name, player2: player2Name }));
        dispatch(setTeamSize(teamSize));
        dispatch(setSelectedRegions(selectedRegions));
        dispatch(setBattleDifficulty(difficulty));
        dispatch(proceedToTeamSelection());
        dispatch(saveBattleState());
        navigate('/pokeverse/battle-sim/team-selection');
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-sky-100 via-green-50 to-purple-100 dark:from-neutral-900 dark:via-blue-950 dark:to-purple-950 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-500/10 dark:bg-red-500/20 rounded-full blur-3xl" />
                    <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-red-500 via-orange-500 to-yellow-500 mb-4 shadow-lg">
                        <Swords className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-red-600 via-orange-600 to-yellow-600 dark:from-red-400 dark:via-orange-400 dark:to-yellow-400 mb-3">
                        BATTLE ARENA
                    </h1>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300 font-medium">
                        Prepare for an epic showdown! ⚔️
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Player Names */}
                    <div className="relative p-6 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="absolute -top-3 left-6 px-3 py-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-full shadow-md">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-white" />
                                <span className="text-xs font-bold text-white uppercase">Players</span>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-col xs:flex-row xs:flex-wrap gap-4">
                            <div className="flex-1 space-y-2">
                                <label className="text-sm font-semibold text-blue-600 dark:text-blue-400">Player 1</label>
                                <TextInput
                                    label=""
                                    value={player1Name}
                                    onChange={(e) => setPlayer1Name(e.target.value)}
                                    placeholder="Enter warrior name"
                                    error={errors.player1}
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="text-sm font-semibold text-red-600 dark:text-red-400">Player 2</label>
                                <TextInput
                                    label=""
                                    value={player2Name}
                                    onChange={(e) => setPlayer2Name(e.target.value)}
                                    placeholder="Enter warrior name"
                                    error={errors.player2}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Team Size */}
                    <div className="relative p-6 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="absolute -top-3 left-6 px-3 py-1 bg-linear-to-r from-green-500 to-emerald-500 rounded-full shadow-md">
                            <span className="text-xs font-bold text-white uppercase">Team Size</span>
                        </div>
                        <div className="mt-2">
                            <Slider label="Pokémon per team" value={teamSize} min={1} max={15} step={1} onChange={setTeamSizeLocal} />
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4 text-center">💪 Your battle will be legendary!</p>
                        </div>
                    </div>

                    {/* Difficulty */}
                    <div className="relative p-6 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="absolute -top-3 left-6 px-3 py-1 bg-linear-to-r from-orange-500 to-red-500 rounded-full shadow-md">
                            <span className="text-xs font-bold text-white uppercase">Difficulty</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                            {DIFFICULTY_LEVELS.map((diff) => {
                                const Icon = difficultyIcons[diff.id];
                                const isSelected = difficulty === diff.id;
                                return (
                                    <button
                                        key={diff.id}
                                        onClick={() => setDifficultyLocal(diff.id)}
                                        className={`group relative p-4 rounded-xl border-2 transition-all duration-300 ${isSelected
                                            ? 'border-yellow-500 bg-linear-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 shadow-lg scale-103'
                                            : 'border-neutral-300 dark:border-neutral-700 hover:border-yellow-400 hover:scale-102'
                                            }`}
                                    >
                                        {isSelected && (
                                            <div className="absolute inset-0 bg-linear-to-br from-yellow-400/20 to-orange-400/20 animate-pulse rounded-xl" />
                                        )}
                                        <div className="relative flex flex-col items-center gap-2">
                                            <div className={`p-2 rounded-full transition-colors ${isSelected ? 'bg-yellow-500' : 'bg-neutral-200 dark:bg-neutral-700 group-hover:bg-yellow-400'}`}>
                                                <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-neutral-600 dark:text-neutral-300'}`} />
                                            </div>
                                            <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{diff.label}</p>
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isSelected ? 'bg-yellow-500 text-white' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'}`}>
                                                LV {diff.level}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Region Selection */}
                    <div className="relative p-6 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="absolute -top-3 left-6 px-3 py-1 bg-linear-to-r from-purple-500 to-pink-500 rounded-full shadow-md">
                            <span className="text-xs font-bold text-white uppercase">Battle Regions</span>
                        </div>
                        <div className="flex items-center justify-between mb-4 mt-2">
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">🗺️ Choose your battleground</p>
                            <div className="flex gap-2">
                                <button onClick={selectAllRegions} className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">All</button>
                                <span className="text-neutral-400">|</span>
                                <button onClick={clearAllRegions} className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:underline">None</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {REGIONS.map((region) => {
                                const isSelected = selectedRegions.includes(region.name.toLowerCase());
                                return (
                                    <button
                                        key={region.name}
                                        onClick={() => toggleRegion(region.name.toLowerCase())}
                                        className={`group relative p-3 rounded-xl border-2 transition-all duration-300 text-left ${isSelected
                                            ? 'border-purple-500 bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 shadow-md'
                                            : 'border-neutral-300 dark:border-neutral-700 hover:border-purple-400'
                                            }`}
                                    >
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center shadow-md">
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="relative">
                                            <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{region.name}</p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Gen {region.generation} • {region.endId - region.startId + 1} Pokémon</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        {errors.regions && (
                            <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 font-medium">
                                    <span>⚠️</span> {errors.regions}
                                </p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleStartBattle}
                        className="group relative w-full p-5 bg-linear-to-r from-red-600 via-orange-600 to-yellow-600 hover:from-red-700 hover:via-orange-700 hover:to-yellow-700 text-white rounded-2xl font-black text-xl transition-all duration-300 shadow-2xl hover:shadow-red-500/50 hover:scale-[1.02] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <div className="relative flex items-center justify-center gap-3">
                            <Swords className="w-6 h-6" />
                            <span>CHOOSE YOUR TEAM</span>
                            <Swords className="w-6 h-6" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
