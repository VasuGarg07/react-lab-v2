import React from 'react';
import { Button, Card, Grid, Stack, Typography, Box } from "@mui/joy";
import { keyframes } from '@emotion/react';
import { useGameContext } from "./Context";
import GameWon from '../../assets/game-won.png';
import { PartyPopper, Trophy } from 'lucide-react';

interface Props {
  name: string;
  turns: number;
  resetGame: () => void;
}

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Result: React.FC = () => {
  const { name, turns, resetGame }: Props = useGameContext();

  return (
    <Card
      variant="outlined"
      sx={{
        boxShadow: 'lg',
        maxWidth: 800,
        margin: 'auto',
        mt: 4,
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid xs={12} sm={6}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              animation: `${floatAnimation} 3s ease-in-out infinite`,
            }}
          >
            <img
              src={GameWon}
              style={{ maxWidth: '100%', height: 'auto' }}
              alt="Victory celebration"
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={6}>
          <Stack spacing={3} justifyContent='center' alignItems='center' height="100%" p={3}>
            <Box
              sx={{
                animation: `${rotateAnimation} 5s linear infinite`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Trophy size={64} color="#FFD700" />
            </Box>
            <Typography
              level="h2"
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                textAlign: 'center',
                animation: `${pulseAnimation} 2s infinite`,
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Congratulations!
            </Typography>
            <Typography
              level="body-lg"
              sx={{
                textAlign: 'center',
                maxWidth: '80%',
                fontWeight: 'bold',
                color: 'text.primary',
              }}
            >
              Amazing job, <Typography sx={{ color: "#1976d2" }}>{name}</Typography>!
              <br />You've conquered the Memory Game in just <Typography sx={{ color: '#1976d2' }}>{turns}</Typography> turns.
            </Typography>
            <Typography
              level="body-md"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                fontStyle: 'italic',
              }}
            >
              Your memory skills are truly impressive. Can you beat your own record?
            </Typography>
            <Button
              variant="solid"
              onClick={resetGame}
              color='primary'
              startDecorator={<PartyPopper />}
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px) scale(1.05)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              Play Again
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Result;