import { useGameContext } from '@/apps/PokeMemory/Context';
import { CardType, GameMode, GameState, loadCards } from '@/apps/PokeMemory/pokememory.utils';
import { toastService } from '@/shared/toastr';
import { keyframes } from '@emotion/react';
import { Box, Button, Card, Container, Divider, Input, Stack, Tooltip, Typography } from '@mui/joy';
import { Gamepad2, Puzzle, Skull, UserRound, Zap } from 'lucide-react';
import React from 'react';
import Logo from '/game-logo.png';

interface Props {
  name: string;
  difficulty: GameMode | undefined;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setDifficulty: React.Dispatch<React.SetStateAction<GameMode | undefined>>;
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const Setup: React.FC = () => {
  const { name, difficulty, setName, setDifficulty, setCards, setGameState }: Props = useGameContext();

  const handleSubmit = async () => {
    if (!difficulty || !name.trim()) {
      toastService.error("Please enter your name and select a difficulty level");
      return;
    }


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
    setGameState(GameState.Playing);
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card
        variant="outlined"
        sx={{
          width: '100%',
          p: 4,
          boxShadow: '0 2px 8px 2px #242424',
          borderRadius: 'xl',
          backdropFilter: 'blur(2px)',
          border: '2px dashed white',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))',
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img
              src={Logo}
              alt="Memory Game Logo"
              style={{
                width: 100,
                height: 100,
                objectFit: 'contain',
                animation: `${pulseAnimation} 2s infinite`,
              }}
            />
            <Typography
              level="h1"
              fontFamily="Overlock"
              fontWeight="bold"
              sx={{
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Memory Game
            </Typography>
          </Box>

          <Typography level="body-md" textAlign="center" sx={{ maxWidth: '80%', color: 'white' }}>
            Challenge your mind with our engaging Memory Game! Match pairs, reveal hidden images, and test your concentration. Are you ready to become a memory master?
          </Typography>

          <Divider sx={{ width: '100%' }} />

          <Input
            placeholder="Enter Your Name"
            variant="soft"
            color="neutral"
            startDecorator={<UserRound />}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{
              '--Input-focusedThickness': '2px',
              '--Input-focusedHighlight': 'rgba(13, 110, 253, 0.25)',
              '&:focus-within': {
                boxShadow: '0 0 0 var(--Input-focusedThickness) var(--Input-focusedHighlight)',
              },
            }}
          />

          <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" justifyContent="center">
            {[
              { mode: GameMode.Easy, color: 'success', icon: Zap, label: 'Easy' },
              { mode: GameMode.Medium, color: 'warning', icon: Puzzle, label: 'Medium' },
              { mode: GameMode.Difficult, color: 'danger', icon: Skull, label: 'Hard' },
            ].map(({ mode, color, icon: Icon, label }) => (
              <Tooltip key={mode} title={`${label} difficulty`} arrow>
                <Button
                  variant={difficulty === mode ? 'solid' : 'soft'}
                  color={color as 'success' | 'warning' | 'danger'}
                  onClick={() => setDifficulty(mode)}
                  startDecorator={<Icon />}
                  sx={{
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {label}
                </Button>
              </Tooltip>
            ))}
          </Stack>

          <Button
            variant="solid"
            color="primary"
            startDecorator={<Gamepad2 />}
            onClick={handleSubmit}
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: '1.1rem',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            Start Game
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default Setup;