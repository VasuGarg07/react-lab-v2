import { shuffleArray } from "../../shared/utilities";

export interface CardType {
    id: string;
    frontImage: string;
    backImage: string;
    matchingCardId: string;
    matched: boolean;
}

// Card images
const CARD_BACK = '/images/pokemon_card_back.jpg';

const CARD_IMAGES = [
    '/images/001.png',
    '/images/002.png',
    '/images/003.png',
    '/images/004.png',
    '/images/005.png',
    '/images/006.png',
    '/images/007.png',
    '/images/008.png',
    '/images/009.png',
    '/images/0010.png',
    '/images/0011.png',
    '/images/0012.png',
];

/**
 * Generates a shuffled deck of card pairs for the memory game
 * @param pairCount - Number of unique pairs to include (default: 6)
 * @returns Array of CardType objects ready for the game
 */
export const loadCards = (pairCount: number = 6): CardType[] => {
    // Select random cards
    const selectedCards = shuffleArray(CARD_IMAGES).slice(0, pairCount);

    // Create pairs with matching IDs
    const gameCards = [...selectedCards, ...selectedCards].map((image, index) => ({
        id: `card-${index}`,
        frontImage: image,
        backImage: CARD_BACK,
        matchingCardId: index < pairCount
            ? `card-${index + pairCount}`
            : `card-${index - pairCount}`,
        matched: false,
    }));

    // Shuffle the pairs
    return shuffleArray(gameCards);
};

/**
 * Get number of pairs based on difficulty
 */
export const getPairCountForDifficulty = (difficulty: string): number => {
    switch (difficulty) {
        case 'easy':
            return 6;
        case 'medium':
            return 8;
        case 'hard':
            return 12;
        default:
            return 6;
    }
};