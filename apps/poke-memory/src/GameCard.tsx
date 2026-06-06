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
            className="relative w-full aspect-4/5 cursor-pointer select-none"
            style={{ perspective: '900px' }}
            onClick={() => !disabled && !flipped && onClick(card)}
        >
            <div className={`card-inner relative w-full h-full ${flipped ? 'flipped' : ''}`}>
                {/* Back face */}
                <img
                    src={card.backImage}
                    alt="Card back"
                    className={`card-face absolute inset-0 w-full h-full object-cover rounded-xl shadow-sm border-2
                        ${card.matched ? 'border-punch' : 'border-lavgrey/40'}`}
                />
                {/* Front face */}
                <img
                    src={card.frontImage}
                    alt="Card front"
                    className={`card-face card-front absolute inset-0 w-full h-full object-cover rounded-xl shadow-sm border-2
                        ${card.matched
                            ? 'border-punch shadow-[0_0_14px_rgba(239,35,60,0.4)]'
                            : 'border-lavgrey/40'
                        }`}
                />
            </div>
        </div>
    );
}
