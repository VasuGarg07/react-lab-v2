import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Question } from "../quiz.constants";

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

const initialState: QuizState = {
    name: '',
    score: 0,
    currentQuestion: 0,
    quizConfig: null,
};

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        incrementScore(state) {
            state.score += 1;
        },
        nextQuestion(state) {
            state.currentQuestion += 1;
        },
        setQuizConfig(state, action: PayloadAction<QuizConfig>) {
            state.quizConfig = action.payload;
        },
        resetQuiz(state) {
            state.name = '';
            state.score = 0;
            state.currentQuestion = 0;
            state.quizConfig = null;
        },
    },
});

export const {
    setName,
    incrementScore,
    nextQuestion,
    setQuizConfig,
    resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
