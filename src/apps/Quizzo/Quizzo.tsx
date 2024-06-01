import { Box, Card, Divider, Grid, Typography } from "@mui/joy";
import { GameState } from "../PokeMemory/helpers";
import QuizProvider, { useQuizContext } from "./Context";
import Result from "./Result";
import Board from "./Board";
import Setup from "./Setup";
import QuizFg from '../../assets/quiz-fg.png'
import { BgCenteredBox } from "../../components/shared/BgCenteredBox";

const Quizzo = () => {


  return (
    <QuizProvider>
      <BgCenteredBox>
        <Card sx={{
          width: 1, maxWidth: 1000, borderRadius: 'md', p: 2, gap: 0,
          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
        }}>
          <Typography level="h2" textAlign="center" textTransform="uppercase" fontFamily={'Kanit'}>Quizzo</Typography>
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
      </BgCenteredBox>
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