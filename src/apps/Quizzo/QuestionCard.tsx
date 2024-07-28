import { Button, Divider, Sheet, Stack, Typography } from '@mui/joy';
import { ChevronRight, X } from 'lucide-react';
import React, { useState } from 'react';
import { ErrorMessage } from '../../components/ErrorMessage';
import { GameState } from '../PokeMemory/helpers';
import { useQuizContext } from './Context';
import { Question } from './helper';

interface ContextProps {
  questions: Question[],
  score: number,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  resetGame: () => void
}

interface QuestionProps {
  currQues: number,
  setCurrQues: React.Dispatch<React.SetStateAction<number>>
  options: string[],
  correct: string,
}

const QuestionCard = ({
  currQues,
  setCurrQues,
  options,
  correct,
}: QuestionProps) => {

  const { questions, score, setScore, setGameState, resetGame }: ContextProps = useQuizContext();

  const [selected, setSelected] = useState<string>();
  const [error, setError] = useState<string>('');

  const handleSelect = (i: string) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
    else return '_'
  };

  const handleCheck = (i: string) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError('');
  };

  const handleNext = () => {
    if (currQues > questions.length - 2) {
      setGameState(GameState.Gameover);

    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected('');

    } else setError("Please select an option first");
  };

  const handleQuit = () => {
    setCurrQues(0);
    resetGame();
  };

  return (
    <Sheet
      variant="outlined"
      sx={{
        mt: 1, p: 2, gap: 1,
        borderRadius: 'md',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>

      <Typography level="h4" fontFamily={'Poiret One'} sx={{ letterSpacing: 1 }}>Question {currQues + 1}</Typography>
      <h4 style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: questions[currQues].question }} />

      {error && <ErrorMessage message={error} />}

      <Stack
        direction='row'
        width={1}
        justifyContent='center'
        alignContent='center'
        flexWrap='wrap'
        sx={{ mt: '4px', gap: 1 }}>
        {options.map((val) => (
          <button key={val}
            onClick={() => handleCheck(val)}
            disabled={!!selected}
            dangerouslySetInnerHTML={{ __html: val }}
            style={{
              ...styles.option,
              ...(selected && styles[handleSelect(val)])
            }}
          >
          </button>
        ))}
      </Stack>

      <Divider />

      <Stack direction='row' justifyContent='center' spacing={2}>
        <Button variant='soft' color='danger' sx={{ width: 0.48 }}
          startDecorator={<X />}
          onClick={handleQuit}>Quit</Button>

        <Button variant='soft' color='primary' sx={{ width: 0.48 }}
          endDecorator={<ChevronRight />}
          onClick={handleNext} >Next</Button>
      </Stack>
    </Sheet>
  )
}
export default QuestionCard

const styles = {
  option: {
    width: `calc(50% - 4px)`,
    outline: 'none',
    borderRadius: '8px',
    border: '1px solid',
    padding: '16px 0',
    backgroundColor: 'transparent',
  },

  select: {
    backgroundColor: 'rgb(7, 207, 0)',
    color: 'white',
    border: 'none'
  },

  wrong: {
    backgroundColor: 'rgb(233, 0, 0)',
    color: 'white',
    border: 'none'
  },

  _: {}
}