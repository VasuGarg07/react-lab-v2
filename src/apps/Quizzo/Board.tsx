import { Chip, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useQuizContext } from "@/apps/Quizzo/Context";
import QuestionCard from "@/apps/Quizzo/QuestionCard";
import { Question, shuffleArray } from "@/apps/Quizzo/helper";

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
    <Stack justifyContent='center' alignContent='center' sx={{ height: 1, p: 2, gap: 1 }}>
      <Typography level="title-lg" textTransform="capitalize" fontFamily={'Overlock'}>Welcome! {name}</Typography>
      <Stack direction='row' spacing={1} justifyContent='center'>
        <Chip color="primary">Score: {score}</Chip>
        <Chip color="warning">{questions[currQues].category}</Chip>
      </Stack>
      <QuestionCard
        currQues={currQues}
        setCurrQues={setCurrQues}
        options={options}
        correct={questions[currQues].correct_answer}
      />
    </Stack>
  )
}

export default Board