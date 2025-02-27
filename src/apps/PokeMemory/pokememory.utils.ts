import cover from '/images/pokemon_card_back.jpg';
import card1 from '/images/001.png';
import card2 from '/images/002.png';
import card3 from '/images/003.png';
import card4 from '/images/004.png';
import card5 from '/images/005.png';
import card6 from '/images/006.png';
import card7 from '/images/007.png';
import card8 from '/images/008.png';
import card9 from '/images/009.png';
import card10 from '/images/0010.png';
import card11 from '/images/0011.png';
import card12 from '/images/0012.png';

export type CardType = {
  id: string,
  frontImage: string,
  backImage: string,
  matchingCardId: string,
  matched: boolean
};

const cards: string[] = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12];

export function shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
};

export const loadCards = (num: number = 4): CardType[] => {
  const cardSet = shuffleArray(cards).slice(0, num)
  const gameCards = [...cardSet, ...cardSet].map((card, i) => ({
    id: `card${i}`,
    frontImage: card,
    backImage: cover,
    matchingCardId: i < cardSet.length ? `card${i + cardSet.length}` : `card${i - cardSet.length}`,
    matched: false,
  }))
  return shuffleArray(gameCards)
};

export enum GameState {
  Setup = 'setup',
  Playing = 'playing',
  Gameover = 'gameover'
}

export enum GameMode {
  Easy = 'easy',
  Medium = 'medium',
  Difficult = 'difficult'
}

export const defaultTiltOptions = {
  reverse: false,  // reverse the tilt direction
  max: 35,     // max tilt rotation (degrees)
  perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.02,    // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000,   // Speed of the enter/exit transition
  transition: true,   // Set a transition on enter/exit.
  axis: null,   // What axis should be disabled. Can be X or Y.
  reset: true,    // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}
