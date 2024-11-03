import { Box, Card, Divider, Grid, Typography, useTheme } from "@mui/joy";
import { GameState } from "@/components/PokeMemory/helpers";
import QuizProvider, { useQuizContext } from "@/components/Quizzo/Context";
import Result from "@/components/Quizzo/Result";
import Board from "@/components/Quizzo/Board";
import Setup from "@/components/Quizzo/Setup";
import { BgCenteredBox } from "@/shared/components/BgCenteredBox";

const darkBg = '/backgrounds/abstract-dark.webp';
const lightBg = '/backgrounds/abstract.webp';
const fgImg = '/quiz-fg.png';

const Quizzo = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <QuizProvider>
      <BgCenteredBox bg={isDark ? darkBg : lightBg}>
        <Card sx={{
          width: 1, maxWidth: 1000, borderRadius: 'md', p: 2, gap: 0,
          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
        }}>
          <Typography level="h2" textAlign="center" textTransform="uppercase" fontFamily={'Poppins'} letterSpacing={1}>Quizzo</Typography>
          <Divider inset="none">Test Your Wit, Ace the Trivia!</Divider>

          <Grid container spacing={0}>
            <Grid xs={12} sm={6}>
              <Screen />
            </Grid>
            <Grid xs={0} sm={6}>
              <Box sx={{ width: 1 }}>
                <img src={fgImg} srcSet={fgImg} alt=""
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