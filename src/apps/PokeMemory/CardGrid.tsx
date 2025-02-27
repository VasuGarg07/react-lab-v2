import { Box, Grid } from "@mui/joy";
import { CardType } from "@/apps/PokeMemory/pokememory.utils";
import Card from "@/apps/PokeMemory/Card";
import { useGameContext } from "@/apps/PokeMemory/Context";

interface Props {
  cards: CardType[],
  firstChoice: CardType | null,
  secondChoice: CardType | null,
  interaction: boolean,
  handleChoice: (card: CardType) => void
}

const CardGrid = () => {
  const { cards, firstChoice, secondChoice, interaction, handleChoice }: Props = useGameContext();

  return (
    <Box sx={{ width: 1, p: 2 }}>
      <Grid container spacing={2} >
        {cards.map(card => {
          return (
            <Grid key={card.id} xs={3} sm={2} lg={1} >
              <Card
                card={card}
                flipped={card === firstChoice || card === secondChoice || card.matched}
                interaction={interaction}
                handleChoice={handleChoice} />
            </Grid>
          );
        })}
      </Grid>
    </Box >
  )
}

export default CardGrid
