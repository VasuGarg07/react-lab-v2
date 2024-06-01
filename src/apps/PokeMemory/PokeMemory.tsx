import GameProvider, { useGameContext } from './Context';
import { GameState } from './helpers';
import Setup from './Setup';
import Board from './Board';
import Result from './Result';
import { BgCenteredBox } from '../../components/shared/BgCenteredBox';

const PokeMemory = () => {

  return (
    <GameProvider>
      <BgCenteredBox>
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