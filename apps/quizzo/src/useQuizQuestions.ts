import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Question } from './quiz.constants';

interface QuizParams {
    category: string;
    difficulty: string;
    enabled?: boolean;
}

const QuizAPI = 'https://opentdb.com/api.php?amount=10';

const fetchQuiz = async (category = "", difficulty = ""): Promise<{ results: Question[] }> => {
    const apiUrl = `${QuizAPI}${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}`;
    const response = await axios.get(apiUrl);
    return response.data;
};

export const useQuizQuestions = ({ category, difficulty, enabled = true }: QuizParams) => {
    return useQuery<{ results: Question[] }>({
        queryKey: ['quiz-questions', category, difficulty],
        queryFn: () => fetchQuiz(category, difficulty),
        enabled: enabled && !!category && !!difficulty,
        staleTime: 1000 * 60 * 10,
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    });
};
