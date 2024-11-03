import Tilt from 'react-parallax-tilt';
import { Box, styled } from '@mui/joy';
import { CardType, defaultTiltOptions } from './helpers';

// Styled components using Joy UI
const CardWrapper = styled(Box)({
  position: 'relative',
});

const CardImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'block',
  borderRadius: theme.radius.lg,
  boxShadow: theme.shadow.md,
}));

const FrontImage = styled(CardImage)(({ flipped }: { flipped: boolean }) => ({
  transform: flipped ? 'rotateY(0deg)' : 'rotateY(90deg)',
  transition: 'all ease-in 0.2s',
  transitionDelay: '0.2s',
  position: 'absolute',
}));

const BackImage = styled(CardImage)(({ flipped }: { flipped: boolean }) => ({
  transform: flipped ? 'rotateY(90deg)' : 'rotateY(0deg)',
  transition: 'all ease-in 0.2s',
  transitionDelay: flipped ? '0s' : '0.2s',
}));

interface Props {
  card: CardType;
  flipped: boolean;
  interaction: boolean;
  handleChoice: (card: CardType) => void;
}

const Card = ({ card, flipped, interaction, handleChoice }: Props) => {
  const handleClick = () => {
    if (interaction) handleChoice(card);
  };

  return (
    <Tilt
      tiltMaxAngleX={defaultTiltOptions.max}
      tiltMaxAngleY={defaultTiltOptions.max}
      perspective={defaultTiltOptions.perspective}
      scale={defaultTiltOptions.scale}
      transitionSpeed={defaultTiltOptions.speed}
      gyroscope={defaultTiltOptions.reset}
    >
      <CardWrapper>
        <FrontImage
          flipped={flipped}
          src={card.frontImage}
          alt="card-face"
          width={160}
          height={160}
        />
        <BackImage
          flipped={flipped}
          src={card.backImage}
          alt="card-cover"
          onClick={handleClick}
          width={160}
          height={160}
          sx={{ cursor: interaction ? 'pointer' : 'default' }}
        />
      </CardWrapper>
    </Tilt>
  );
};

export default Card;