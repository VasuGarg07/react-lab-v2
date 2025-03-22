import React from 'react';
import { useGameContext } from '@/apps/PokeMemory/Context';
import { loadCards } from '@/apps/PokeMemory/pokememory.utils';
import { toastService } from '@/shared/toastr';
import { GameMode, GameState } from '@/shared/utilities';
import * as Form from '@radix-ui/react-form';
import Tooltip from '@/ui/Tooltip';
import { Gamepad2, Zap, Puzzle, Skull, UserRound } from 'lucide-react';

type DifficultyOption = {
  mode: GameMode;
  icon: React.ElementType;
  label: string;
  colorClass: string;
  hoverClass: string;
  activeClass: string;
};

const Setup: React.FC = () => {
  const {
    name,
    difficulty,
    setName,
    setDifficulty,
    setCards,
    setGameState
  } = useGameContext();

  const difficultyOptions: DifficultyOption[] = [
    {
      mode: GameMode.Easy,
      icon: Zap,
      label: 'Easy',
      colorClass: 'bg-emerald-500 text-white dark:bg-emerald-600',
      hoverClass: 'hover:bg-emerald-600 dark:hover:bg-emerald-700',
      activeClass: 'ring-emerald-300 dark:ring-emerald-400'
    },
    {
      mode: GameMode.Medium,
      icon: Puzzle,
      label: 'Medium',
      colorClass: 'bg-amber-500 text-white dark:bg-amber-600',
      hoverClass: 'hover:bg-amber-600 dark:hover:bg-amber-700',
      activeClass: 'ring-amber-300 dark:ring-amber-400'
    },
    {
      mode: GameMode.Difficult,
      icon: Skull,
      label: 'Hard',
      colorClass: 'bg-rose-500 text-white dark:bg-rose-600',
      hoverClass: 'hover:bg-rose-600 dark:hover:bg-rose-700',
      activeClass: 'ring-rose-300 dark:ring-rose-400'
    },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!difficulty || !name.trim()) {
      toastService.error("Please enter your name and select a difficulty level");
      return;
    }

    switch (difficulty) {
      case GameMode.Easy:
        setCards(loadCards(6));
        break;
      case GameMode.Medium:
        setCards(loadCards(8));
        break;
      default:
        setCards(loadCards(12));
        break;
    }

    setGameState(GameState.Playing);
  };

  return (
    <div className="flex items-center justify-center w-full px-4 py-6">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-md bg-white/10 dark:bg-black/20 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-md">
          <div className="flex flex-col items-center space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="relative animate-pulse">
                <img
                  src="/game-logo.png"
                  alt="Memory Game Logo"
                  className="w-64 object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Memory Game
              </h1>
            </div>

            {/* Description */}
            <p className="text-center text-sm text-neutral-700 dark:text-neutral-300 max-w-xs">
              Challenge your mind with our engaging Memory Game! Match pairs, reveal hidden images, and test your concentration.
            </p>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent"></div>

            {/* Form */}
            <Form.Root className="w-full space-y-6" onSubmit={handleSubmit}>
              <Form.Field name="playerName" className="w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserRound className="h-5 w-5 text-neutral-400" />
                  </div>
                  <Form.Control asChild>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Your Name"
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500 transition-all outline-none text-neutral-900 dark:text-neutral-100"
                    />
                  </Form.Control>
                </div>
                <Form.Message match="valueMissing" className="text-xs text-rose-500 mt-1">
                  Please enter your name
                </Form.Message>
              </Form.Field>

              {/* Difficulty Selection */}
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Select Difficulty:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {difficultyOptions.map(({ mode, icon: Icon, label, colorClass, hoverClass, activeClass }) => (
                    <Tooltip
                      key={mode}
                      content={`${label} difficulty`}
                      side="top"
                    >
                      <button
                        type="button"
                        onClick={() => setDifficulty(mode)}
                        className={`
                          relative px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 
                          transition-all duration-200 transform hover:-translate-y-0.5
                          ${difficulty === mode
                            ? `${colorClass} ring-2 ${activeClass}`
                            : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 ' + hoverClass}
                        `}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </button>
                    </Tooltip>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Form.Submit asChild>
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center gap-2"
                >
                  <Gamepad2 className="h-5 w-5" />
                  <span>Start Game</span>
                </button>
              </Form.Submit>
            </Form.Root>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;