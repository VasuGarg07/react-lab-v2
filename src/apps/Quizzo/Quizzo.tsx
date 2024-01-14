import { Box, Card, Divider, Grid, Typography } from "@mui/joy";
import Background from '../../assets/quiz-bg.webp';
import { GameState } from "../PokeMemory/helpers";
import QuizProvider, { useQuizContext } from "./Context";
import Result from "./Result";
import Board from "./Board";
import Setup from "./Setup";
import QuizFg from '../../assets/quiz-fg.png'

const Quizzo = () => {


  return (
    <QuizProvider>
      <Box
        className="flex-centered-column"
        sx={{
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          p: { md: 4, xs: 2 },
          minHeight: 'calc(100vh - 53px)',
        }}>

        <Card sx={{ width: 1, maxWidth: 1000, borderRadius: 'md', p: 2, gap: 0 }}>
          <Typography level="h2" textAlign="center" textTransform="uppercase">Quizzo</Typography>
          <Divider inset="none">Test Your Wit, Ace the Trivia!</Divider>

          <Grid container spacing={0}>
            <Grid xs={12} sm={6}>
              <Screen />
            </Grid>
            <Grid xs={0} sm={6}>
              <Box sx={{ width: 1 }}>
                <img src={QuizFg} srcSet={QuizFg} alt=""
                  style={{ width: '100%', objectFit: 'contain' }} />
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </QuizProvider>
  )
}

export default Quizzo

const Screen = () => {
  const { gameState }: { gameState: GameState } = useQuizContext();

  switch (gameState) {
    case GameState.Gameover:
      return <Result />
    case GameState.Playing:
      return <Board />
    default:
      return <Setup />
  }
}