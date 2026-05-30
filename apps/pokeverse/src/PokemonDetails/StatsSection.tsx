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

export default function StatsSection({ pokemon }: { pokemon: Pokemon }) {
    const [viewMode, setViewMode] = useState<'bars' | 'chart'>('chart');

    const getStatColor = (value: number): string => {
        if (value >= 150) return 'bg-green-500 dark:bg-green-600';
        if (value >= 100) return 'bg-blue-500 dark:bg-blue-600';
        if (value >= 75) return 'bg-yellow-500 dark:bg-yellow-600';
        if (value >= 50) return 'bg-orange-500 dark:bg-orange-600';
        return 'bg-red-500 dark:bg-red-600';
    };

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
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                        }`}
                    aria-label="Radar Chart View"
                >
                    <RadarIcon className="w-4 h-4" />
                </button>
                <button
                    onClick={() => setViewMode('bars')}
                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'bars'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                        }`}
                    aria-label="Bar Chart View"
                >
                    <BarChart3 className="w-4 h-4" />
                </button>
            </div>

            {viewMode === 'chart' ? (
                <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={chartData}>
                            <PolarGrid stroke="currentColor" className="text-neutral-300 dark:text-neutral-600" />
                            <PolarAngleAxis
                                dataKey="stat"
                                tick={{ fill: 'currentColor', fontSize: 12 }}
                                className="text-neutral-700 dark:text-neutral-300"
                            />
                            <PolarRadiusAxis
                                angle={90}
                                domain={[0, MAX_STAT_VALUE]}
                                tick={{ fill: 'currentColor', fontSize: 10 }}
                                className="text-neutral-500 dark:text-neutral-400"
                            />
                            <Radar
                                name="Stats"
                                dataKey="value"
                                stroke="#3b82f6"
                                fill="#3b82f6"
                                fillOpacity={0.3}
                                strokeWidth={2}
                            />
                        </RadarChart>
                    </ResponsiveContainer>

                    <div className="grid grid-cols-3 gap-2 mt-4">
                        {pokemon.stats.map((stat) => (
                            <div key={stat.name} className="text-center p-2 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                                <p className="text-xs text-neutral-600 dark:text-neutral-400">{STAT_LABELS[stat.name] || stat.name}</p>
                                <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    {pokemon.stats.map((stat) => {
                        const percentage = (stat.value / MAX_STAT_VALUE) * 100;
                        return (
                            <div key={stat.name} className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        {STAT_LABELS[stat.name] || stat.name}
                                    </span>
                                    <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{stat.value}</span>
                                </div>
                                <div className="relative w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
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
                <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Total</p>
                    <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{totalStats}</p>
                </div>
                <div className="p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Average</p>
                    <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{avgStat}</p>
                </div>
            </div>
        </div>
    );
}
