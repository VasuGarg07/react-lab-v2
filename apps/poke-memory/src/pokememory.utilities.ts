import { shuffleArray } from '@react-lab/shared';

export interface CardType {
    id: string;
    frontImage: string;
    backImage: string;
    matchingCardId: string;
    matched: boolean;
}

const CARD_BACK = '/images/pokemon_card_back.webp';

const CARD_IMAGES = [
    '/images/001.webp',
    '/images/002.webp',
    '/images/003.webp',
    '/images/004.webp',
    '/images/005.webp',
    '/images/006.webp',
    '/images/007.webp',
    '/images/008.webp',
    '/images/009.webp',
    '/images/010.webp',
    '/images/011.webp',
    '/images/012.webp',
];

export const loadCards = (pairCount: number = 6): CardType[] => {
    const selectedCards = shuffleArray(CARD_IMAGES).slice(0, pairCount);
    const gameCards = [...selectedCards, ...selectedCards].map((image, index) => ({
        id: `card-${index}`,
        frontImage: image,
        backImage: CARD_BACK,
        matchingCardId: index < pairCount
            ? `card-${index + pairCount}`
            : `card-${index - pairCount}`,
        matched: false,
    }));
    return shuffleArray(gameCards);
};

export const getPairCountForDifficulty = (difficulty: string): number => {
    switch (difficulty) {
        case 'easy': return 6;
        case 'medium': return 8;
        case 'hard': return 12;
        default: return 6;
    }
};
