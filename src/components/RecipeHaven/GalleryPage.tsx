import { Box, Grid, Typography } from '@mui/joy';
import { Meal } from './utils/helpers';
import MealCard from './MealCard';
import Wrapper from './Wrapper';

interface GalleryProps {
  title: string;
  meals: Meal[];
}

const GalleryPage: React.FC<GalleryProps> = ({ title, meals }) => {

  return (
    <Wrapper>
      <Box
        sx={{
          mx: 'auto',
          maxWidth: 1000,
          p: 2
        }}>
        <Typography level='h2' fontFamily={'Poiret One'} letterSpacing={1} gutterBottom>
          {title}
        </Typography>
        <Grid container spacing={2} flexWrap='wrap'>
          {meals.map(meal => (
            <Grid key={meal.id} xs={6} sm={4}>
              <MealCard meal={meal} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Wrapper>
  )
}

export default GalleryPage;