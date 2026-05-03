import type { ReactNode } from "react";
import type { GameState } from "../../shared/constants";
import { useAppSelector } from "../../store/useRedux";
import GameBoard from "./Gameboard";
import Result from "./GameResult";
import Setup from "./Setup";

const componentMap: Record<GameState, ReactNode> = {
    'setup': <Setup />,
    'playing': <GameBoard />,
    'game_end': <Result />
}

export default function PokeMemory() {
    const gameState = useAppSelector((state) => state.pokeMemory.gameState);

    return (
        <div className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4">
            {componentMap[gameState]}
        </div>
    );
}
