import { Crown, Flame, Swords, Trophy, Zap } from 'lucide-react';
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

const difficultyAccent: Record<DifficultyId, { border: string; bg: string; icon: string; level: string }> = {
    beginner:     { border: 'border-green-500',  bg: 'bg-green-500/10',  icon: 'bg-green-500',  level: 'text-green-400' },
    intermediate: { border: 'border-azure',       bg: 'bg-azure/10',      icon: 'bg-azure',      level: 'text-azure' },
    advanced:     { border: 'border-orange-400',  bg: 'bg-orange-400/10', icon: 'bg-orange-400', level: 'text-orange-400' },
    master:       { border: 'border-crimson',     bg: 'bg-crimson/10',    icon: 'bg-crimson',    level: 'text-crimson' },
};


function Card({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="rounded-2xl bg-white border border-silver/40 p-5 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-smoke border-b border-silver/30 pb-3 mb-4">{label}</p>
            {children}
        </div>
    );
}

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
        if (!player1Name.trim()) newErrors.player1 = 'Required';
        if (!player2Name.trim()) newErrors.player2 = 'Required';
        if (selectedRegions.length === 0) newErrors.regions = 'Select at least one region';
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
        navigate('/battle-sim/team-selection');
    };

    return (
        <div className="flex-1 bg-chalk py-10 px-4">
            <div className="max-w-2xl mx-auto space-y-5">

                {/* Header */}
                <div className="flex items-center gap-4 pb-2">
                    <div className="w-12 h-12 rounded-2xl bg-crimson flex items-center justify-center shadow-lg shadow-crimson/30 shrink-0">
                        <Swords className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-shadow tracking-tight leading-none">Battle Arena</h1>
                        <p className="text-sm text-smoke mt-0.5"> Prepare for an epic showdown!</p>
                    </div>
                </div>

                {/* Players */}
                <Card label="Trainers">
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <p className="text-xs font-black text-crimson uppercase tracking-wide">Player 1</p>
                            <TextInput
                                label=""
                                value={player1Name}
                                onChange={(e) => setPlayer1Name(e.target.value)}
                                placeholder="Trainer name"
                                error={errors.player1}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <p className="text-xs font-black text-azure uppercase tracking-wide">Player 2</p>
                            <TextInput
                                label=""
                                value={player2Name}
                                onChange={(e) => setPlayer2Name(e.target.value)}
                                placeholder="Trainer name"
                                error={errors.player2}
                            />
                        </div>
                    </div>
                </Card>

                {/* Team Size */}
                <Card label="Team Size">
                    <Slider
                        label="Pokémon per team"
                        value={teamSize}
                        min={1}
                        max={15}
                        step={1}
                        onChange={setTeamSizeLocal}
                    />
                    <p className="mt-3 text-xs text-smoke italic text-center">Our battle will be legendary!</p>
                </Card>

                {/* Difficulty */}
                <Card label="Difficulty">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                        {DIFFICULTY_LEVELS.map((diff) => {
                            const Icon = difficultyIcons[diff.id];
                            const isSelected = difficulty === diff.id;
                            const accent = difficultyAccent[diff.id];
                            return (
                                <button
                                    key={diff.id}
                                    onClick={() => setDifficultyLocal(diff.id)}
                                    className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 transition-all duration-200 ${isSelected
                                        ? `${accent.border} ${accent.bg}`
                                        : 'border-silver/50 hover:border-silver/60'
                                    }`}
                                >
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${isSelected ? accent.icon : 'bg-silver/20'}`}>
                                        <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-smoke'}`} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs font-black text-shadow">{diff.label}</p>
                                        <p className={`text-[10px] font-bold mt-0.5 ${isSelected ? accent.level : 'text-silver'}`}>Lv {diff.level}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </Card>

                {/* Regions */}
                <Card label="Battle Regions">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs text-smoke">Which Pokémon generations to pull from</p>
                        <div className="flex items-center gap-3">
                            <button onClick={selectAllRegions} className="text-xs font-black text-azure hover:text-cobalt transition-colors">All</button>
                            <span className="text-silver/30">|</span>
                            <button onClick={clearAllRegions} className="text-xs font-black text-smoke hover:text-shadow transition-colors">None</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {REGIONS.map((region) => {
                            const isSelected = selectedRegions.includes(region.name.toLowerCase());
                            return (
                                <button
                                    key={region.name}
                                    onClick={() => toggleRegion(region.name.toLowerCase())}
                                    className={`relative p-3 rounded-xl border-2 text-left transition-all duration-200 ${isSelected
                                        ? 'border-crimson bg-crimson/10'
                                        : 'border-silver/30 hover:border-silver/60'
                                    }`}
                                >
                                    {isSelected && (
                                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-crimson flex items-center justify-center">
                                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                    <p className="text-sm font-black text-shadow pr-5">{region.name}</p>
                                    <p className="text-[10px] text-smoke mt-0.5 font-medium">Gen {region.generation} · {region.endId - region.startId + 1} Pokémon</p>
                                </button>
                            );
                        })}
                    </div>
                    {errors.regions && (
                        <p className="mt-3 text-xs text-crimson font-bold">⚠ {errors.regions}</p>
                    )}
                </Card>

                {/* CTA */}
                <button
                    onClick={handleStartBattle}
                    className="w-full py-4 rounded-2xl bg-linear-to-br from-crimson to-ruby text-white font-black text-base tracking-wide transition-all duration-200 shadow-lg shadow-crimson/25 hover:shadow-crimson/40 hover:-translate-y-0.5 flex items-center justify-center gap-3"
                >
                    <Swords className="w-5 h-5" />
                    Choose Your Team
                    <Swords className="w-5 h-5" />
                </button>

            </div>
        </div>
    );
}
