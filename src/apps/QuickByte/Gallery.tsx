import { AspectRatio, Card, CardContent, Grid, IconButton, Stack, Typography } from '@mui/joy';
import { BookOpenText } from 'lucide-react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import DrawerMenu from './DrawerMenu';
import { Meal } from './utils/helpers';

interface GalleryData {
  title: string;
  meals: Meal[];
}

const Gallery = () => {
  const { title, meals } = useLoaderData() as GalleryData;

  return (
    <>
      <Stack direction='row' justifyContent='space-between'>
        <Typography level='h2' fontFamily={'Staatliches'} letterSpacing={2} textAlign={'center'} gutterBottom>
          {title}
        </Typography>
        <DrawerMenu iconOnly />
      </Stack>

      <Grid container spacing={1} flexWrap='wrap'>
        {meals.map(meal => (
          <Grid key={meal.id} xs={6} sm={4}>
            <MealCard meal={meal} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Gallery


const MealCard = ({ meal }: { meal: Meal }) => {

  const navigate = useNavigate();

  const handleMealNav = (id: string) => {
    navigate(`/quick-byte/meal/${id}`)
  }

  return (
    <Card sx={{
      '&:hover': {
        boxShadow: 'lg',
        cursor: 'pointer',
        transform: 'translateY(-4px)',
        transition: 'transform 0.2s linear'
      }
    }}
      onClick={() => handleMealNav(meal.id)}>
      <CardContent>
        <AspectRatio ratio={1} objectFit='cover'>
          <img
            src={meal.image} srcSet={meal.image} alt={meal.name}
          />
        </AspectRatio>
        <Stack direction='row' alignItems='center' sx={{ mt: 1 }} spacing={1}>
          <Typography level="title-lg"
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flexGrow: 1,
              fontFamily: 'Overlock',
              letterSpacing: 1,
              textTransform: 'uppercase',
              overflow: 'hidden'
            }}>
            {meal.name}
          </Typography>
          <IconButton size='sm' color='primary' variant='soft' sx={{ borderRadius: 'xl' }}>
            <BookOpenText size={20} />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  )
}