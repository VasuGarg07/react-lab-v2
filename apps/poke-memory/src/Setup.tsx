import { useState } from 'react';
import { Gamepad2, Zap, Puzzle, Skull, User } from 'lucide-react';
import { usePoke } from './PokeContext';
import { toastService } from '@react-lab/shared';
import { getPairCountForDifficulty, loadCards } from './pokememory.utilities';
import Pokemon from '/pokemon.png';

const DIFFICULTIES = [
    {
        value: 'easy', label: 'Easy', Icon: Zap,
        active: 'bg-lavgrey text-white ring-2 ring-lavgrey scale-105 shadow-md',
        idle: 'bg-lavgrey/15 text-indigo hover:bg-lavgrey/30 border-lavgrey/40',
    },
    {
        value: 'medium', label: 'Medium', Icon: Puzzle,
        active: 'bg-punch text-white ring-2 ring-punch scale-105 shadow-md',
        idle: 'bg-punch/8 text-punch hover:bg-punch/15 border-punch/25',
    },
    {
        value: 'hard', label: 'Hard', Icon: Skull,
        active: 'bg-indigo text-white ring-2 ring-indigo scale-105 shadow-md',
        idle: 'bg-indigo/8 text-indigo hover:bg-indigo/15 border-indigo/25',
    },
] as const;

export default function Setup() {
    const { dispatch } = usePoke();
    const [playerName, setPlayerName] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!playerName.trim())   { toastService.error('Please enter your name'); return; }
        if (!selectedDifficulty)  { toastService.error('Please select a difficulty'); return; }

        const pairCount = getPairCountForDifficulty(selectedDifficulty);
        dispatch({ type: 'SET_NAME',       payload: playerName });
        dispatch({ type: 'SET_DIFFICULTY', payload: selectedDifficulty });
        dispatch({ type: 'SET_CARDS',      payload: loadCards(pairCount) });
        dispatch({ type: 'SET_GAME_STATE', payload: 'playing' });
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="bg-white rounded-3xl border border-lavgrey/20 shadow-2xl overflow-hidden">

                {/* Hero — indigo */}
                <div className="flex items-center justify-center py-6 bg-indigo">
                    <img src={Pokemon} alt="Pokémon" className="h-28 object-contain drop-shadow-lg" />
                </div>

                <div className="p-6 flex flex-col gap-5">
                    <div className="text-center">
                        <h2 className="text-2xl font-black text-indigo">Memory Challenge</h2>
                        <p className="text-sm font-semibold text-lavgrey mt-1">Match all pairs to win!</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="relative">
                            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-lavgrey pointer-events-none" />
                            <input
                                type="text"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                placeholder="Your name"
                                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-lavgrey/30 bg-platinum text-indigo text-sm font-semibold placeholder:text-lavgrey/60 focus:outline-none focus:border-punch focus:ring-2 focus:ring-punch/20 transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-extrabold uppercase tracking-widest text-lavgrey">Difficulty</label>
                            <div className="grid grid-cols-3 gap-2">
                                {DIFFICULTIES.map(({ value, label, Icon, active, idle }) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setSelectedDifficulty(value)}
                                        className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border text-sm font-bold transition-all focus:outline-none ${selectedDifficulty === value ? active : idle}`}
                                    >
                                        <Icon size={18} />
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black text-white bg-punch hover:bg-flagred shadow-lg active:scale-95 transition-all"
                        >
                            <Gamepad2 size={18} />
                            Let's Play!
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
