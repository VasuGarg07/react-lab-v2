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
        <div className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4">
            {renderScreen()}
        </div>
    );
}
