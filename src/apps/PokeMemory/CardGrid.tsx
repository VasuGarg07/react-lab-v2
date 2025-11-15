import { useEffect } from 'react';
import {
    setFirstChoice,
    setSecondChoice,
    setInteraction,
    markCardsAsMatched,
    resetTurn,
    setGameState
} from '../../store/pokeMemorySlice';
import { useAppDispatch, useAppSelector } from '../../store/useRedux';
import Card from './GameCard';

export function CardGrid() {
    const dispatch = useAppDispatch();
    const { cards, firstChoice, secondChoice, interaction } = useAppSelector(state => state.pokeMemory);

    const handleChoice = (card: typeof cards[0]) => {
        if (firstChoice) {
            dispatch(setSecondChoice(card));
        } else {
            dispatch(setFirstChoice(card));
        }
    };

    // Handle card matching logic
    useEffect(() => {
        if (firstChoice && secondChoice) {
            dispatch(setInteraction(false));

            if (firstChoice.matchingCardId === secondChoice.id) {
                // Cards match
                dispatch(markCardsAsMatched({
                    firstId: firstChoice.id,
                    secondId: secondChoice.id
                }));
                dispatch(resetTurn());
            } else {
                // Cards don't match - wait then reset
                setTimeout(() => {
                    dispatch(resetTurn());
                }, 1000);
            }
        }
    }, [firstChoice, secondChoice, dispatch]);

    // Check for game completion
    useEffect(() => {
        if (cards.length > 0) {
            const matchedCount = cards.filter(c => c.matched).length;
            if (matchedCount === cards.length) {
                setTimeout(() => {
                    dispatch(setGameState('game_end'));
                }, 500);
            }
        }
    }, [cards, dispatch]);

    return (
        <div className="w-full p-3">
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        flipped={card === firstChoice || card === secondChoice || card.matched}
                        disabled={!interaction || card.matched}
                        onClick={handleChoice}
                    />
                ))}
            </div>
        </div>
    );
}