import { Button, Card, Typography } from '@mui/joy';
import { useGameContext } from './Context';
import Logo from '/game-logo.png';
import CardGrid from './CardGrid';
import { Spacer } from '../../components/Spacer';

interface Props {
  name: string,
  turns: number,
  resetGame: () => void,
}

const Board = () => {
  const { name, turns, resetGame }: Props = useGameContext();

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: 1,
          p: { md: 3, xs: 2 },
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          flexWrap: 'wrap',
          boxShadow: '0 2px 8px 2px #242424',
          borderRadius: 'xl',
          backdropFilter: 'blur(2px)',
          border: '2px dashed',
        }}>
        <img style={{ width: 120 }} src={Logo} alt="" />
        <Typography level='title-lg'>Memory Game</Typography>
        <Spacer />
        <div>
          <Typography level='title-sm'>Player: {name} </Typography>
          <Typography level="body-sm">Turns: {turns}</Typography>
        </div>
        <Button onClick={resetGame} color='primary' size='sm'>Restart</Button>
      </Card>

      <CardGrid />
    </>


  )
}

export default Board