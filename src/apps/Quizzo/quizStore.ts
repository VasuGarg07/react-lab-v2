import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { GameState } from '@/shared/utilities';
import { Question } from '@/apps/Quizzo/quiz.helper';

interface QuizConfig {
    category: string;
    difficulty: string;
    questions: Question[];
}

interface QuizState {
    // Game state
    gameState: GameState;
    name: string;
    score: number;
    currentQuestion: number;
    quizConfig: QuizConfig | null;

    // Actions
    setGameState: (state: GameState) => void;
    setName: (name: string) => void;
    incrementScore: () => void;
    nextQuestion: () => void;
    setQuizConfig: (config: QuizConfig) => void;
    resetGame: () => void;
}

export const useQuizStore = create<QuizState>()(
    devtools(
        (set) => ({
            // Initial state
            gameState: GameState.Setup,
            name: '',
            score: 0,
            currentQuestion: 0,
            quizConfig: null,

            // Actions
            setGameState: (gameState) => set({ gameState }),
            setName: (name) => set({ name }),
            incrementScore: () => set((state) => ({ score: state.score + 1 })),
            nextQuestion: () => set((state) => ({ currentQuestion: state.currentQuestion + 1 })),
            setQuizConfig: (quizConfig) => set({ quizConfig }),
            resetGame: () => set({
                gameState: GameState.Setup,
                name: '',
                score: 0,
                currentQuestion: 0,
                quizConfig: null,
            }),
        }),
        { name: 'quiz-store' }
    )
);