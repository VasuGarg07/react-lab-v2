import { useQuizContext } from "@/apps/Quizzo/Quiz.context";
import QuestionCard from "@/apps/Quizzo/QuestionCard";
import { shuffleArray } from "@/shared/utilities";
import { useEffect, useState } from "react";
import { Question } from "./quiz.helper";

interface Props {
  name: string;
  questions: Question[];
  score: number;
}

const Board = () => {
  const { name, questions, score }: Props = useQuizContext();

  const [options, setOptions] = useState<string[]>([]);
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    if (questions && questions.length) {
      const options = shuffleArray([
        questions[currQues].correct_answer,
        ...questions[currQues].incorrect_answers,
      ]);
      setOptions(options);
    }
  }, [currQues, questions]);

  return (
    <div className="flex flex-col justify-center items-center h-full space-y-4">
      <h2 className="text-xl capitalize text-neutral-800 dark:text-neutral-100">
        Welcome! {name}
      </h2>

      <div className="flex flex-row flex-wrap justify-center gap-2">
        <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
          Score: {score}
        </span>
        <span className="px-3 py-1 text-sm font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 rounded-full">
          {questions[currQues].category}
        </span>
      </div>

      <QuestionCard
        currQues={currQues}
        setCurrQues={setCurrQues}
        options={options}
        correct={questions[currQues].correct_answer}
      />
    </div>
  );
};

export default Board;