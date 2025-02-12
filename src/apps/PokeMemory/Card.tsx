import Tilt from "react-parallax-tilt"
import { CardType, defaultTiltOptions } from "./helpers"
import './Card.styles.scss';

interface Props {
  card: CardType,
  flipped: boolean,
  interaction: boolean,
  handleChoice: (card: CardType) => void
};

const Card = ({ card, flipped, interaction, handleChoice }: Props) => {

  const handleClick = () => {
    if (interaction) handleChoice(card)
  }

  return (
    <Tilt {...defaultTiltOptions} className="card">
      <img
        className={`card-img  ${flipped ? 'card-front-flipped' : 'card-front'}`}
        src={card.frontImage}
        alt='card-face'
        width={160}
        height={160}
      />
      <img
        className={`card-img  ${flipped ? "card-back-flipped" : 'card-back'}`}
        src={card.backImage}
        alt='card-cover'
        onClick={handleClick}
        width={160}
        height={160}
      />
    </Tilt>
  )
}

export default Card