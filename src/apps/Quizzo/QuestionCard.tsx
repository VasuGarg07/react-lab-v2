import { useQuizContext } from '@/apps/Quizzo/Quiz.context';
import { toastService } from '@/shared/toastr';
import { GameState } from '@/shared/utilities';
import { ChevronRight, X } from 'lucide-react';
import React, { useState } from 'react';

interface QuestionProps {
  currQues: number;
  setCurrQues: React.Dispatch<React.SetStateAction<number>>;
  options: string[];
  correct: string;
}

const QuestionCard = ({
  currQues,
  setCurrQues,
  options,
  correct,
}: QuestionProps) => {
  const { questions, score, setScore, setGameState, resetGame } = useQuizContext();
  const [selected, setSelected] = useState<string>();

  const handleSelect = (i: string) => {
    if (selected === i && selected === correct) return "correct";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "correct";
    else return '';
  };

  const handleCheck = (i: string) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
  };

  const handleNext = () => {
    if (currQues > questions.length - 2) {
      setGameState(GameState.Gameover);
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected('');
    } else toastService.error("Please select an option first");
  };

  const handleQuit = () => {
    setCurrQues(0);
    resetGame();
  };

  return (
    <div className="flex flex-col mt-4 p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm flex-grow">
      <h3 className="text-xl font-semibold tracking-wide text-gray-800 dark:text-gray-200">
        Question {currQues + 1}
      </h3>

      <div
        className="text-base text-gray-700 dark:text-gray-300 my-3"
        dangerouslySetInnerHTML={{ __html: questions[currQues].question }}
      />

      <div className="flex flex-row flex-wrap justify-center items-center gap-2 mt-2 mb-4">
        {options.map((val) => (
          <button
            key={val}
            onClick={() => handleCheck(val)}
            disabled={!!selected}
            dangerouslySetInnerHTML={{ __html: val }}
            className={`
              w-[calc(50%-0.5rem)] min-h-[3rem] p-3 rounded-lg border border-gray-300 dark:border-gray-600 
              font-medium text-gray-700 dark:text-gray-300 transition-all duration-200
              hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
              disabled:cursor-not-allowed 
              ${selected && handleSelect(val) === 'correct' ? 'bg-green-500 hover:bg-green-500 text-white border-transparent' : ''}
              ${selected && handleSelect(val) === 'wrong' ? 'bg-red-500 hover:bg-red-500 text-white border-transparent' : ''}
            `}
          />
        ))}
      </div>

      <div className="h-px w-full bg-gray-200 dark:bg-gray-700 my-4"></div>

      <div className="flex flex-row justify-center space-x-4">
        <button
          onClick={handleQuit}
          className="flex items-center justify-center gap-2 px-4 py-2 w-1/2 bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 
          text-red-500 dark:text-red-400 font-medium rounded-lg border border-red-200 dark:border-red-800 
          transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          <X size={18} />
          <span>Quit</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center justify-center gap-2 px-4 py-2 w-1/2 bg-blue-500 hover:bg-blue-600 
          text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <span>Next</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;