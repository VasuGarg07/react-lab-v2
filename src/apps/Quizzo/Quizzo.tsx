import Board from "@/apps/Quizzo/Board";
import Result from "@/apps/Quizzo/Result";
import Setup from "@/apps/Quizzo/Setup";
import { GameState } from "@/shared/utilities";
import { useQuizStore } from "./quizStore";
import QuizFg from '/quiz-fg.png';

const Quizzo = () => {
  return (
    <div className="relative min-h-[calc(100vh-54px)] w-full flex items-center justify-center p-4 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950"></div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl"></div>

      {/* Main content card */}
      <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-xl p-6 w-full max-w-5xl shadow-xl z-10 
        shadow-neutral-200/50 dark:shadow-neutral-900/50 border border-neutral-100/50 dark:border-neutral-700/50">
        <h2 className="text-2xl md:text-3xl text-center uppercase tracking-wider font-bold text-neutral-800 dark:text-neutral-100">
          Quizzo
        </h2>

        <div className="relative flex items-center justify-center my-3">
          <span className="absolute w-full border-t border-neutral-300 dark:border-neutral-600"></span>
          <span className="relative px-4 py-1 text-sm bg-white/90 dark:bg-neutral-800/90 text-neutral-500 dark:text-neutral-400">
            Test Your Wit, Ace the Trivia!
          </span>
        </div>

        <div className="flex flex-col sm:flex-row w-full min-h-[400px]">
          <div className="w-full sm:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-md">
              <Screen />
            </div>
          </div>
          <div className="hidden sm:flex w-1/2 items-center justify-center">
            <div className="w-full h-full flex items-center justify-center p-4">
              <img
                src={QuizFg}
                alt="Quiz illustration"
                className="w-full max-w-sm object-contain opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Screen = () => {
  const { gameState } = useQuizStore();

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