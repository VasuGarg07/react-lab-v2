import { useEffect } from 'react';
import { usePoke } from './PokeContext';
import Card from './GameCard';

export function CardGrid() {
    const { state, dispatch } = usePoke();
    const { cards, firstChoice, secondChoice, interaction } = state;

    const handleChoice = (card: typeof cards[0]) => {
        if (firstChoice) {
            dispatch({ type: 'SET_SECOND_CHOICE', payload: card });
        } else {
            dispatch({ type: 'SET_FIRST_CHOICE', payload: card });
        }
    };

    useEffect(() => {
        if (!firstChoice || !secondChoice) return;
        dispatch({ type: 'SET_INTERACTION', payload: false });

        if (firstChoice.matchingCardId === secondChoice.id) {
            dispatch({ type: 'MARK_MATCHED', payload: { firstId: firstChoice.id, secondId: secondChoice.id } });
            dispatch({ type: 'RESET_TURN' });
        } else {
            setTimeout(() => dispatch({ type: 'RESET_TURN' }), 900);
        }
    }, [firstChoice, secondChoice, dispatch]);

    useEffect(() => {
        if (cards.length > 0 && cards.every((c) => c.matched)) {
            setTimeout(() => dispatch({ type: 'SET_GAME_STATE', payload: 'game_end' }), 500);
        }
    }, [cards, dispatch]);

    const firstId  = firstChoice?.id ?? null;
    const secondId = secondChoice?.id ?? null;

    return (
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
            {cards.map((card) => (
                <Card
                    key={card.id}
                    card={card}
                    flipped={card.id === firstId || card.id === secondId || card.matched}
                    disabled={!interaction || card.matched}
                    onClick={handleChoice}
                />
            ))}
        </div>
    );
}
