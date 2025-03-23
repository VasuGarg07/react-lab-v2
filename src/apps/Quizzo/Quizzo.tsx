import Board from "@/apps/Quizzo/Board";
import QuizProvider, { useQuizContext } from "@/apps/Quizzo/Quiz.context";
import Result from "@/apps/Quizzo/Result";
import Setup from "@/apps/Quizzo/Setup";
import { GameState } from "@/shared/utilities";
import QuizFg from '/quiz-fg.png';

const Quizzo = () => {
  return (
    <QuizProvider>
      <div className="relative min-h-[calc(100vh-54px)] w-full flex items-center justify-center p-4 overflow-hidden">
        {/* Main content card */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 w-full max-w-5xl shadow-xl z-10 
          shadow-neutral-200/50 dark:shadow-neutral-900/50 border border-neutral-100 dark:border-neutral-700">
          <h2 className="text-2xl md:text-3xl text-center uppercase tracking-wider font-bold text-neutral-800 dark:text-neutral-100">
            Quizzo
          </h2>

          <div className="relative flex items-center justify-center my-3">
            <span className="absolute w-full border-t border-neutral-300 dark:border-neutral-600"></span>
            <span className="relative px-4 py-1 text-sm bg-white dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
              Test Your Wit, Ace the Trivia!
            </span>
          </div>

          <div className="flex flex-col sm:flex-row w-full">
            <div className="w-full sm:w-1/2">
              <Screen />
            </div>
            <div className="hidden sm:block w-1/2">
              <div className="w-full h-full flex items-center justify-center">
                <img src={QuizFg} alt="Quiz illustration" className="w-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </QuizProvider>
  );
};

const Screen = () => {
  const { gameState }: { gameState: GameState } = useQuizContext();

  switch (gameState) {
    case GameState.Gameover:
      return <Result />;
    case GameState.Playing:
      return <Board />;
    default:
      return <Setup />;
  }
};

export default Quizzo;