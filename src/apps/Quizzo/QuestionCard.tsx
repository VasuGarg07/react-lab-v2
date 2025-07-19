import { toastService } from '@/shared/toastr';
import { GameState } from '@/shared/utilities';
import { ChevronRight, X } from 'lucide-react';
import { useState, useCallback } from 'react';
import { Question } from './quiz.helper';
import { useQuizStore } from './quizStore';

interface QuestionProps {
  question: Question;
  options: string[];
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard = ({ question, options, questionNumber, totalQuestions }: QuestionProps) => {
  const { incrementScore, nextQuestion, setGameState, resetGame } = useQuizStore();
  const [selected, setSelected] = useState<string>('');

  const handleSelect = useCallback((option: string) => {
    if (!selected) return '';
    if (selected === option && selected === question.correct_answer) return 'correct';
    if (selected === option && selected !== question.correct_answer) return 'wrong';
    if (option === question.correct_answer) return 'correct';
    return '';
  }, [selected, question.correct_answer]);

  const handleCheck = useCallback((option: string) => {
    if (selected) return; // Prevent multiple selections

    setSelected(option);
    if (option === question.correct_answer) {
      incrementScore();
    }
  }, [selected, question.correct_answer, incrementScore]);

  const handleNext = useCallback(() => {
    if (!selected) {
      toastService.error("Please select an option first");
      return;
    }

    if (questionNumber >= totalQuestions) {
      setGameState(GameState.Gameover);
    } else {
      nextQuestion();
      setSelected(''); // Reset selection for next question
    }
  }, [selected, questionNumber, totalQuestions, nextQuestion, setGameState]);

  const handleQuit = useCallback(() => {
    resetGame();
  }, [resetGame]);

  return (
    <div className="flex flex-col p-5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-sm flex-grow w-full">
      <h3 className="text-xl font-semibold tracking-wide text-neutral-800 dark:text-neutral-200 mb-2">
        Question {questionNumber} of {totalQuestions}
      </h3>

      <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
        Difficulty: <span className="capitalize">{question.difficulty}</span>
      </div>

      <div
        className="text-base text-neutral-700 dark:text-neutral-300 my-4 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />

      <div className="flex flex-row flex-wrap justify-center items-center gap-2 mt-2 mb-4">
        {options.map((option, index) => {
          const selectionState = handleSelect(option);
          return (
            <button
              key={`${option}-${index}`} // More stable key
              onClick={() => handleCheck(option)}
              disabled={!!selected}
              dangerouslySetInnerHTML={{ __html: option }}
              className={`
                w-[calc(50%-0.5rem)] min-h-[3rem] p-3 rounded-lg border border-neutral-300 dark:border-neutral-600 
                font-medium text-neutral-700 dark:text-neutral-300 transition-all duration-200
                hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                disabled:cursor-not-allowed 
                ${selectionState === 'correct' ? 'bg-green-500 hover:bg-green-500 text-white border-transparent' : ''}
                ${selectionState === 'wrong' ? 'bg-red-500 hover:bg-red-500 text-white border-transparent' : ''}
                ${!selected ? 'hover:border-blue-300 dark:hover:border-blue-500' : ''}
              `}
            />
          );
        })}
      </div>

      <div className="h-px w-full bg-neutral-200 dark:bg-neutral-700 my-4"></div>

      <div className="flex flex-row justify-center space-x-4">
        <button
          onClick={handleQuit}
          className="flex items-center justify-center gap-2 px-4 py-2 w-1/2 bg-white dark:bg-neutral-700 hover:bg-red-50 dark:hover:bg-red-900/20 
          text-red-500 dark:text-red-400 font-medium rounded-lg border border-red-200 dark:border-red-800 
          transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          <X size={18} />
          <span>Quit</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!selected}
          className="flex items-center justify-center gap-2 px-4 py-2 w-1/2 bg-blue-500 hover:bg-blue-600 
          text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
        >
          <span>{questionNumber >= totalQuestions ? 'Finish' : 'Next'}</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;