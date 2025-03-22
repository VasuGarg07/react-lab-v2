import CardGrid from '@/apps/PokeMemory/CardGrid';
import { useGameContext } from '@/apps/PokeMemory/Context';
import Logo from '/game-logo.png';

interface Props {
  name: string,
  turns: number,
  resetGame: () => void,
}

const Board = () => {
  const { name, turns, resetGame }: Props = useGameContext();

  return (
    <>
      <div className="w-full p-2 md:p-3 flex flex-col sm:flex-row items-center flex-wrap rounded-xl shadow-lg backdrop-blur-sm bg-gradient-to-b from-sky-300/80 to-teal-700/80">
        <img className="w-28" src={Logo} alt="Game logo" />
        <h2 className="text-xl font-semibold text-white">Memory Game</h2>
        <div className="flex-grow"></div>
        <div className="text-center sm:text-right my-2 sm:my-0 mr-4">
          <p className="text-sm font-medium text-white">Player: {name}</p>
          <p className="text-xs text-gray-300">Turns: {turns}</p>
        </div>
        <button
          onClick={resetGame}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-md transition-colors"
        >
          Restart
        </button>
      </div>

      <CardGrid />
    </>
  )
}

export default Board