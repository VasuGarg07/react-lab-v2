import { AspectRatio, Card, CardContent, CardOverflow, Grid, IconButton, Stack, Typography } from '@mui/joy';
import { BookOpenText } from 'lucide-react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Meal } from './utils/helpers';
import { motion } from 'framer-motion';

interface GalleryData {
  title: string;
  meals: Meal[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};


const Gallery = () => {
  const { title, meals } = useLoaderData() as GalleryData;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Typography level='h2' fontFamily={'Poiret One'} letterSpacing={1} gutterBottom>
          {title}
        </Typography>
      </motion.div>

      <Grid container spacing={2} flexWrap='wrap' component={motion.div} variants={containerVariants}>
        {meals.map((meal) => (
          <Grid key={meal.id} xs={6} sm={4} component={motion.div} variants={itemVariants}>
            <MealCard meal={meal} />
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
}

export default Gallery


const MealCard = ({ meal }: { meal: Meal }) => {

  const navigate = useNavigate();

  const handleMealNav = (id: string) => {
    navigate(`/recipe-haven/meal/${id}`)
  }

  return (
    <Card sx={{
      border: 'none',
      '&:hover': {
        boxShadow: 'lg',
        cursor: 'pointer',
        transform: 'translateY(-4px)',
        transition: 'transform 0.2s linear',
      }
    }}
      onClick={() => handleMealNav(meal.id)}>
      <CardOverflow>
        <AspectRatio ratio={4 / 3} objectFit='cover'>
          <img
            src={meal.image} srcSet={meal.image} alt={meal.name}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
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