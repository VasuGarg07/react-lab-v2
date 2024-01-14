import React, { useState } from 'react';
import { CardType, GameMode, GameState, loadCards } from './helpers';
import { useGameContext } from './Context';
import { Button, Card, Divider, IconButton, Input, Typography } from '@mui/joy';
import Logo from '../../assets/game-logo.png';
import { ErrorMessage, MatIcon } from '../../components/Utils';

interface Props {
  name: string,
  difficulty: GameMode | undefined
  setName: React.Dispatch<React.SetStateAction<string>>,
  setDifficulty: React.Dispatch<React.SetStateAction<GameMode | undefined>>,
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
}

const Setup = () => {
  const { name, difficulty, setName, setDifficulty, setCards, setGameState }: Props = useGameContext()

  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    if (!difficulty || !name) {
      setError(true);
      return;
    }

    setError(false);

    switch (difficulty) {
      case GameMode.Easy:
        setCards(loadCards(6));
        break;
      case GameMode.Medium:
        setCards(loadCards(8));
        break;
      default:
        setCards(loadCards(12));
        break;
    }
    setGameState(GameState.Playing)
  };

  return (
    <Card sx={{
      width: 1,
      maxWidth: 640,
      p: { md: 3, xs: 2 },
      alignItems: 'center'
    }}>
      <div className='flex-centered'>

        <img style={{ width: 160 }} src={Logo} alt="" />
        <Typography level='h4'>Memory Game</Typography>
      </div>

      <Typography level='body-sm' textAlign="center" sx={{ fontSize: 12 }}>
        Test your memory and concentration skills in this fun matching card game. Flip over pairs of cards to find matches and reveal the hidden images. Keep track of card positions and match them all to win!
      </Typography>
      <Divider inset='none' />

      {error && <ErrorMessage message="Please Fill all the feilds" />}

      <Input
        placeholder="Enter Player Name"
        variant="soft"
        color='neutral'
        endDecorator={<MatIcon icon="edit" />}
        onChange={(e) => setName(e.target.value)}
      />

      <div className='flex-centered'>
        <Button
          variant={difficulty == GameMode.Easy ? 'solid' : 'outlined'}
          color="success"
          onClick={() => setDifficulty(GameMode.Easy)}>
          Easy
        </Button>

        <Button
          variant={difficulty == GameMode.Medium ? 'solid' : 'outlined'}
          color="warning"
          onClick={() => setDifficulty(GameMode.Medium)}>
          MEDIUM
        </Button>

        <Button
          variant={difficulty == GameMode.Difficult ? 'solid' : 'outlined'}
          color="danger"
          onClick={() => setDifficulty(GameMode.Difficult)}>
          HARD
        </Button>

        <Divider orientation='vertical' />

        <IconButton color='primary' variant='soft'
          onClick={handleSubmit}>
          <MatIcon icon="sports_esports" />
        </IconButton>
      </div>


    </Card >
  )
}

export default Setup