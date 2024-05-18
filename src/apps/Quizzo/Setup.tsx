import { Button, Input, Option, Select, Stack, Typography } from '@mui/joy';
import { Dices, User } from 'lucide-react';
import React, { useState } from 'react';
import { ErrorMessage } from '../../components/shared/ErrorMessage';
import { GameMode, GameState } from '../PokeMemory/helpers';
import { useQuizContext } from './Context';
import { Question, QuizCategories, fetchQuiz } from './helper';

interface Props {
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
}

const Setup = () => {

  const { name, setName, setQuestions, setGameState }: Props = useQuizContext();

  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleDifficulty = (_: any, newValue: GameMode | null) => {
    newValue && setDifficulty(newValue);
  };

  const handleCategory = (_: any, newValue: string | null) => {
    newValue && setCategory(newValue);
  };

  const handleSubmit = async () => {
    if (!name || !(difficulty && category)) {
      setError(true);

    } else {
      setLoading(true);
      const data = await fetchQuiz(category, difficulty);
      setQuestions(data.results);
      setLoading(false);
      setGameState(GameState.Playing);
    }

  }

  return (

    <Stack spacing={1} alignItems='center' justifyContent='center' sx={{ height: 1, p: 2 }}>
      <Typography level="title-lg" sx={{ mb: 1 }}>Quiz Settings</Typography>
      {error && <ErrorMessage message='Please Fill all the feilds' />}

      <Input
        required
        placeholder="Player Name"
        variant="soft"
        onChange={(e) => setName(e.target.value)}
        sx={{ width: 1 }}
        disabled={loading}
        startDecorator={<User />}
      />

      <Select
        required
        placeholder="Choose Difficulty Level"
        variant="soft" color='neutral'
        onChange={handleDifficulty}
        sx={{ width: 1 }}
        disabled={loading}
      >
        {Object.values(GameMode).map((option) => (
          <Option key={option} value={option}>
            <Typography textTransform='capitalize'>{option}</Typography>
          </Option>
        ))}
      </Select>

      <Select
        required
        placeholder="Select the Category"
        variant="soft" color='neutral'
        onChange={handleCategory}
        sx={{ width: 1 }}
        disabled={loading}
      >
        {QuizCategories.map((option) => (
          <Option key={option.value} value={option.value}> {option.category} </Option>
        ))}
      </Select>

      <Button sx={{ mt: 1 }}
        loading={loading}
        onClick={handleSubmit}
        startDecorator={<Dices />}>
        Begin!
      </Button>

    </Stack>
  )
}

export default Setup