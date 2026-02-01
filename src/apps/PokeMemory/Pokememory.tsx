import { useAppSelector } from "../../store/useRedux";
import GameBoard from "./Gameboard";
import Result from "./GameResult";
import Setup from "./Setup";

export default function PokeMemory() {
    const gameState = useAppSelector((state) => state.pokeMemory.gameState);
    const renderScreen = () => {
        switch (gameState) {
            case 'playing':
                return <GameBoard />;
            case 'game_end':
                return <Result />;
            default:
                return <Setup />;
        }
    };

    return (
        <div className="min-h-screen w-full bg-linear-to-br from-sky-100 via-green-50 to-purple-100 dark:from-neutral-900 dark:via-blue-950 dark:to-purple-950 flex items-center justify-center p-4">
            {renderScreen()}
        </div>
    );
}
