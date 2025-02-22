import { Box, Button, Typography } from "@mui/joy";
import { useQuizContext } from "@/apps/Quizzo/Context";

const Result = () => {
  const { name, score, resetGame } = useQuizContext();

  return (

    <Box className="flex-centered-column" sx={{ height: 1, p: 2 }}>
      <Typography level="title-lg" textTransform="capitalize">Final Score : {score}</Typography>
      <Button size="lg" color="warning" onClick={resetGame}>Try Again, {name}</Button>
    </Box>
  )
}

export default Result