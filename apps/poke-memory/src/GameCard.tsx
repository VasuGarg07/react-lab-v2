import type { CardType } from './pokememory.utilities';

interface CardProps {
    card: CardType;
    flipped: boolean;
    disabled: boolean;
    onClick: (card: CardType) => void;
}

export default function Card({ card, flipped, disabled, onClick }: CardProps) {
    return (
        <div
            className="relative w-full aspect-4/5 cursor-pointer"
            style={{ perspective: '1000px' }}
            onClick={() => !disabled && !flipped && onClick(card)}
        >
            <div
                className={`relative w-full h-full transition-transform duration-500 ${flipped ? 'transform-[rotateY(180deg)]' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
            >
                <img
                    src={card.backImage}
                    alt="Card back"
                    className="absolute w-full h-full rounded-lg shadow-lg border-2 border-neutral-300 dark:border-neutral-600"
                    style={{ backfaceVisibility: 'hidden' }}
                />
                <img
                    src={card.frontImage}
                    alt="Card front"
                    className="absolute w-full h-full rounded-lg shadow-lg border-2 border-neutral-300 dark:border-neutral-600"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                />
            </div>
        </div>
    );
}
