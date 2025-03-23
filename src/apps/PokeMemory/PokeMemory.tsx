import Board from '@/apps/PokeMemory/Board';
import GameProvider, { useGameContext } from '@/apps/PokeMemory/Context';
import Result from '@/apps/PokeMemory/Result';
import Setup from '@/apps/PokeMemory/Setup';
import { GameState } from '@/shared/utilities';

const PokeMemory = () => {
  return (
    <GameProvider>
      <div className="relative min-h-[calc(100vh-54px)] w-full flex-col flex items-center justify-center p-4">
        <Screen />
      </div>
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