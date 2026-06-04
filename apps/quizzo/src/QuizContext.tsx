import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Question } from './quiz.constants';

interface QuizConfig {
    category: string;
    difficulty: string;
    questions: Question[];
}

interface QuizState {
    name: string;
    score: number;
    currentQuestion: number;
    quizConfig: QuizConfig | null;
}

const initial: QuizState = {
    name: '',
    score: 0,
    currentQuestion: 0,
    quizConfig: null,
};

type Action =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_CONFIG'; payload: QuizConfig }
    | { type: 'INCREMENT_SCORE' }
    | { type: 'NEXT_QUESTION' }
    | { type: 'RESET' };

function reducer(state: QuizState, action: Action): QuizState {
    switch (action.type) {
        case 'SET_NAME':    
            return { ...state, name: action.payload };
        case 'SET_CONFIG':
            return { ...state, quizConfig: action.payload };
        case 'INCREMENT_SCORE':
            return { ...state, score: state.score + 1 };
        case 'NEXT_QUESTION':
            return { ...state, currentQuestion: state.currentQuestion + 1 };
        case 'RESET':
            return initial;
    }
}

interface QuizContextValue {
    state: QuizState;
    dispatch: React.Dispatch<Action>;
}

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initial);
    return <QuizContext.Provider value={{ state, dispatch }}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
    const ctx = useContext(QuizContext);
    if (!ctx) throw new Error('useQuiz must be used inside QuizProvider');
    return ctx;
}
