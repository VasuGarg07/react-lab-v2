import { Button, Card, Grid, Typography } from "@mui/joy";
import { useGameContext } from "./Context";
import GameWon from '../../assets/game-won.png'

interface Props {
  name: string,
  turns: number,
  resetGame: () => void,
}


const Result = () => {
  const { name, turns, resetGame }: Props = useGameContext();

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6}>
          <img src={GameWon} style={{ maxWidth: 300 }} alt="" />
        </Grid>
        <Grid xs={12} sm={6}>
          <div className="flex-centered-column h-100">
            <Typography level="h3">Congratulations!!</Typography>
            <Typography level="body-lg">
              Player <strong>{name}</strong> won in <strong>{turns}</strong> turns.
            </Typography>
            <Button variant="solid" onClick={resetGame} color='primary'>Play Again</Button>
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}

export default Result