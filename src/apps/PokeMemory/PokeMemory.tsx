import GameProvider, { useGameContext } from './Context';
import { GameState } from './helpers';
import Setup from './Setup';
import Board from './Board';
import Result from './Result';
import { BgCenteredBox } from '../../components/BgCenteredBox';
import Light from '../../assets/backgrounds/bg-poke.png';
import Dark from '../../assets/backgrounds/bg-poke-dark.webp';
import { useTheme } from '@mui/joy';

const PokeMemory = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <GameProvider>
      <BgCenteredBox bg={isDark ? Dark : Light}>
        <Screen />
      </BgCenteredBox>
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