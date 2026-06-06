import { useState } from 'react';
import { BarChart3, Radar as RadarIcon } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import type { Pokemon } from '../helpers/types';

const MAX_STAT_VALUE = 255;

const STAT_LABELS: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
};

function getStatColor(value: number): string {
    if (value >= 150) return 'bg-green-500';
    if (value >= 100) return 'bg-azure';
    if (value >= 75) return 'bg-yellow-400';
    if (value >= 50) return 'bg-orange-400';
    return 'bg-crimson';
}

export default function StatsSection({ pokemon }: { pokemon: Pokemon }) {
    const [viewMode, setViewMode] = useState<'bars' | 'chart'>('chart');

    const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.value, 0);
    const avgStat = Math.round(totalStats / pokemon.stats.length);

    const chartData = pokemon.stats.map((stat) => ({
        stat: STAT_LABELS[stat.name] || stat.name,
        value: stat.value,
        fullMark: MAX_STAT_VALUE,
    }));

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-end gap-2">
                <button
                    onClick={() => setViewMode('chart')}
                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'chart'
                        ? 'bg-crimson/10 text-crimson'
                        : 'bg-chalk text-smoke hover:text-shadow'
                        }`}
                    aria-label="Radar Chart View"
                >
                    <RadarIcon className="w-4 h-4" />
                </button>
                <button
                    onClick={() => setViewMode('bars')}
                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'bars'
                        ? 'bg-crimson/10 text-crimson'
                        : 'bg-chalk text-smoke hover:text-shadow'
                        }`}
                    aria-label="Bar Chart View"
                >
                    <BarChart3 className="w-4 h-4" />
                </button>
            </div>

            {viewMode === 'chart' ? (
                <div className="p-6 bg-white rounded-xl border border-silver/40">
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={chartData}>
                            <PolarGrid stroke="#C4BFBF" />
                            <PolarAngleAxis
                                dataKey="stat"
                                tick={{ fill: '#5A5555', fontSize: 12 }}
                            />
                            <PolarRadiusAxis
                                angle={90}
                                domain={[0, MAX_STAT_VALUE]}
                                tick={{ fill: '#C4BFBF', fontSize: 10 }}
                            />
                            <Radar
                                name="Stats"
                                dataKey="value"
                                stroke="#D00000"
                                fill="#D00000"
                                fillOpacity={0.25}
                                strokeWidth={2}
                            />
                        </RadarChart>
                    </ResponsiveContainer>

                    <div className="grid grid-cols-3 gap-2 mt-4">
                        {pokemon.stats.map((stat) => (
                            <div key={stat.name} className="text-center p-2 bg-chalk rounded-lg">
                                <p className="text-xs text-smoke">{STAT_LABELS[stat.name] || stat.name}</p>
                                <p className="text-sm font-black text-shadow">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    {pokemon.stats.map((stat) => {
                        const percentage = (stat.value / MAX_STAT_VALUE) * 100;
                        return (
                            <div key={stat.name} className="p-4 bg-white rounded-xl border border-silver/40">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold text-smoke">
                                        {STAT_LABELS[stat.name] || stat.name}
                                    </span>
                                    <span className="text-sm font-black text-shadow">{stat.value}</span>
                                </div>
                                <div className="relative w-full h-1.5 bg-silver/30 rounded-full overflow-hidden">
                                    <div
                                        className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${getStatColor(stat.value)}`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-white rounded-xl border border-silver/40">
                    <p className="text-xs text-smoke mb-1">Total</p>
                    <p className="text-xl font-black text-shadow">{totalStats}</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-silver/40">
                    <p className="text-xs text-smoke mb-1">Average</p>
                    <p className="text-xl font-black text-shadow">{avgStat}</p>
                </div>
            </div>
        </div>
    );
}
