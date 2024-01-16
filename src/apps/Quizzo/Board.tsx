import { useEffect, useState } from "react";
import { useQuizContext } from "./Context";
import { Question, shuffleArray } from "./helper";
import { Box, Chip, Typography } from "@mui/joy";
import QuestionCard from "./QuestionCard";

interface Props {
  name: string;
  questions: Question[],
  score: number,
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
    <Box className="flex-centered-column" sx={{ height: 1, p: 2 }}>
      <Typography level="title-lg" textTransform="capitalize" fontFamily={'Overlock'}>Welcome! {name}</Typography>
      <div className="flex-centered">
        <Chip color="primary">Score: {score}</Chip>
        <Chip color="warning">{questions[currQues].category}</Chip>
      </div>
      <QuestionCard
        currQues={currQues}
        setCurrQues={setCurrQues}
        options={options}
        correct={questions[currQues].correct_answer}
      />
    </Box>
  )
}

export default Board