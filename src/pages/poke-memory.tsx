
import GameProvider, { useGameContext } from '@/components/PokeMemory/Context';
import { GameState } from '@/components/PokeMemory/helpers';
import GameSetup from '@/components/PokeMemory/GameSetup';
import GameBoard from '@/components/PokeMemory/GameBoard';
import Result from '@/components/PokeMemory/GameResult';
import { useTheme } from '@mui/joy';
import { BgCenteredBox } from '@/shared/components/BgCenteredBox';

const PokeMemory = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const lightBg = '/pokemon/bg-poke.png';
  const darkBg = '/pokemon/bg-poke-dark.webp';

  return (
    <GameProvider>
      <BgCenteredBox bg={isDark ? darkBg : lightBg}>
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
      return <GameBoard />
    default:
      return <GameSetup />
  }
}