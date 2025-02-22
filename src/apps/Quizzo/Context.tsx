import { ReactNode, createContext, useContext, useState } from 'react'
import { Question } from '@/apps/Quizzo/helper';
import { GameState } from '@/apps/PokeMemory/helpers';

const QuizContext = createContext<any>(null);

const QuizProvider = ({ children }: { children: ReactNode }) => {

  const [questions, setQuestions] = useState<Question[]>([]);
  const [name, setName] = useState<string>('');
  const [score, setScore] = useState<number>(0);

  const [gameState, setGameState] = useState(GameState.Setup);

  const resetGame = () => {
    setName('');
    setScore(0);
    setQuestions([]);
    setGameState(GameState.Setup);
  }

  const value = {
    name,
    setName,
    questions, setQuestions,
    score, setScore,
    gameState,
    setGameState,
    resetGame
  }

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  )
}

export default QuizProvider

export const useQuizContext = () => useContext(QuizContext);