import React from 'react';
import { useGameContext } from "@/apps/PokeMemory/Context";
import { PartyPopper, Trophy } from 'lucide-react';

interface Props {
  name: string;
  turns: number;
  resetGame: () => void;
}

const Result: React.FC = () => {
  const { name, turns, resetGame }: Props = useGameContext();

  return (
    <div className="max-w-3xl mx-auto mt-8 overflow-hidden rounded-xl shadow-xl bg-gradient-to-b from-violet-900/80 to-amber-400/80 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row">
        {/* Image container */}
        <div className="md:w-1/2 p-6 flex justify-center items-center">
          <div className="relative">
            <img
              src="/game-won.png"
              className="max-w-full h-auto"
              alt="Victory celebration"
            />
          </div>
        </div>

        {/* Content container */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center items-center bg-black/10">
          <div className="mb-6 animate-[spin_5s_linear_infinite]">
            <Trophy size={56} color="#FFD700" />
          </div>

          <h2 className="font-bold text-2xl md:text-3xl text-yellow-300 text-center mb-4 animate-[pulse_2s_ease-in-out_infinite]">
            Congratulations!
          </h2>

          <div className="text-center mb-4">
            <p className="text-white text-lg font-semibold">
              Amazing job, <span className="text-blue-400">{name}</span>!
            </p>
            <p className="text-white text-lg mt-2">
              You've conquered the Memory Game in just <span className="text-blue-400 font-bold">{turns}</span> turns.
            </p>
          </div>

          <p className="text-gray-300 italic text-center mb-6">
            Your memory skills are truly impressive. Can you beat your own record?
          </p>

          <button
            onClick={resetGame}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <PartyPopper size={20} />
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;