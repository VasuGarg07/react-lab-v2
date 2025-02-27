import GameProvider, { useGameContext } from '@/apps/PokeMemory/Context';
import { GameState } from '@/apps/PokeMemory/pokememory.utils';
import Setup from '@/apps/PokeMemory/Setup';
import Board from '@/apps/PokeMemory/Board';
import Result from '@/apps/PokeMemory/Result';
import { BgCenteredBox } from '@/components/BgCenteredBox';
import Light from '/backgrounds/bg-poke.png';
import Dark from '/backgrounds/bg-poke-dark.webp';
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