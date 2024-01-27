import { AspectRatio, Card, CardContent, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/joy';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { MatIcon } from '../../components/Utils';
import { Meal } from './utils/helpers';
import DrawerMenu from './DrawerMenu';

interface GalleryData {
  title: string;
  meals: Meal[];
}

const Gallery = () => {
  const { title, meals } = useLoaderData() as GalleryData;

  return (
    <>
      <div className='flex-justified'>
        <Typography level='h2' fontFamily={'Staatliches'} letterSpacing={2} textAlign={'center'} gutterBottom>
          {title}
        </Typography>
        <DrawerMenu iconOnly />
      </div>

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
        <Tooltip color="primary" variant="solid" arrow
          title={meal.name} placement="top" size="sm">
          <Stack direction='row' alignItems='center' sx={{ mt: 1 }} spacing={1}>
            <Typography level="title-lg" className="text-ellipsis spacer"
              fontFamily={'Overlock'} letterSpacing={1} textTransform={'uppercase'}>
              {meal.name}
            </Typography>
            <IconButton size='sm' color='primary' variant='soft' sx={{ borderRadius: 'xl' }}>
              <MatIcon icon='keyboard_arrow_right' outlined size={20} />
            </IconButton>
          </Stack>
        </Tooltip>
      </CardContent>
    </Card>
  )
}