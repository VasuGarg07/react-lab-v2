import { useQuizContext } from '@/apps/Quizzo/Quiz.context';
import { QuizCategories, fetchQuiz } from '@/apps/Quizzo/quiz.helper';
import { toastService } from '@/shared/toastr';
import { GameMode, GameState } from '@/shared/utilities';
import Select from '@/ui/Select';
import { Award, Dices, Grid3X3, User } from 'lucide-react';
import React, { useState } from 'react';

const Setup: React.FC = () => {
  const { name, setName, setQuestions, setGameState } = useQuizContext();

  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(false);

  // Format the difficulty options for the Select component
  const difficultyOptions = Object.values(GameMode).map(mode => ({
    value: mode,
    label: mode.charAt(0).toUpperCase() + mode.slice(1)
  }));

  // Format the category options for the Select component
  const categoryOptions = QuizCategories.map(category => ({
    value: category.value,
    label: category.category
  }));

  const handleSubmit = async () => {
    if (!name || !(difficulty && category)) {
      toastService.error("Please fill all the fields");
    } else {
      setLoading(true);
      try {
        const data = await fetchQuiz(category, difficulty);
        setQuestions(data.results);
        setGameState(GameState.Playing);
      } catch (error) {
        toastService.error("Failed to fetch quiz questions. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-5">
      <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-6">
        Quiz Settings
      </h2>

      <div className="w-full max-w-sm">
        {/* Name Input */}
        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500 dark:text-neutral-400">
            <User size={18} />
          </div>
          <input
            type="text"
            placeholder="Player Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        {/* Difficulty Select */}
        <div className="mb-3">
          <Select
            options={difficultyOptions}
            value={difficulty}
            onValueChange={setDifficulty}
            placeholder="Choose Difficulty Level"
            icon={<Award size={18} className="text-neutral-500 dark:text-neutral-400" />}
            disabled={loading}
            required
          />
        </div>

        {/* Category Select */}
        <div className="mb-3">
          <Select
            options={categoryOptions}
            value={category}
            onValueChange={setCategory}
            placeholder="Select the Category"
            icon={<Grid3X3 size={18} className="text-neutral-500 dark:text-neutral-400" />}
            disabled={loading}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-medium rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Loading...</span>
            </>
          ) : (
            <>
              <Dices size={18} />
              <span>Begin!</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Setup;