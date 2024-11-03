import { Box, Button, Card, Typography } from '@mui/joy';
import { useGameContext } from './Context';
import CardGrid from './CardGrid';

interface Props {
  name: string,
  turns: number,
  resetGame: () => void,
}

const GameBoard = () => {
  const { name, turns, resetGame }: Props = useGameContext();

  return (
    <>
      <Card variant="soft" sx={{
        width: 1,
        p: { md: 3, xs: 2 },
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        flexWrap: 'wrap',
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px'
      }}>
        <img style={{ width: 120 }} src='pokemon/logo.png' alt="" />
        <Typography level='title-lg'>Memory Game</Typography>
        <Box flexGrow={1} />
        <div>
          <Typography level='title-sm'>Player: {name} </Typography>
          <Typography level="body-sm">Turns: {turns}</Typography>
        </div>
        <Button onClick={resetGame} color='neutral' size='sm'>Restart</Button>
      </Card>

      <CardGrid />
    </>


  )
}

export default GameBoard