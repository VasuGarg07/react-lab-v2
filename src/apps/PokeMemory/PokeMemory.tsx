import GameProvider, { useGameContext } from './Context';
import { GameState } from './helpers';
import Setup from './Setup';
import Board from './Board';
import Result from './Result';
import { Box } from '@mui/joy';
import Background from '../../assets/game-bg.webp';

const PokeMemory = () => {

  return (
    <GameProvider>
      <Box
        sx={{
          minHeight: 'calc(100vh - 53px)',
          p: { md: 3, xs: 2 },
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="flex-centered-column">
        <Screen />
      </Box>
    </GameProvider>
  )
}

export default PokeMemory

const Screen = () => {
  const { gameState }: { gameState: GameState } = useGameContext();

  switch (gameState) {
    case GameState.Gameover:
      return <Result />
    case GameState.Playing:
      return <Board />
    default:
      return <Setup />
  }
}