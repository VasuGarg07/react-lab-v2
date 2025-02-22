import { AspectRatio, Button, Card, Chip, Divider, Link, List, ListItem, ListItemDecorator, Stack, Typography } from '@mui/joy';
import { useLoaderData, useNavigate } from 'react-router';
import { MealDetails } from './utils/helpers';
import { Info, LoaderPinwheel, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const imageVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const chipVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3 }
  }
};


const Details = () => {

  const navigate = useNavigate();
  const meal: MealDetails = useLoaderData() as MealDetails;

  const handleAreaNav = () => {
    navigate(`/recipe-haven/area/${meal.area?.toLocaleLowerCase()}`);
  }

  const handleCategoryNav = () => {
    navigate(`/recipe-haven/category/${meal.category?.toLocaleLowerCase()}`);
  }

  const handleExternalUrl = (url: string) => {
    window.open(url, '_black');
  }

  return (
    <Stack
      spacing={2}
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Typography level='h2' fontFamily={'Poiret One'} letterSpacing={1} textTransform="capitalize" textAlign={'center'}>
          {meal.name}
        </Typography>
      </motion.div>

      <motion.div variants={imageVariants}>
        <AspectRatio
          variant='plain'
          objectFit="cover"
          ratio={2}
          sx={{
            borderRadius: 'xl',
            boxShadow: 'md',
            width: 1,
            overflow: 'hidden'
          }}>
          <img src={meal.image} alt={meal.name} />
        </AspectRatio>
      </motion.div>

      <Card
        component={motion.div}
        variants={itemVariants}
        sx={{
          borderRadius: 'xl',
          boxShadow: 'md'
        }}
      >
        <Stack direction='row' spacing={1} justifyContent='center'>
          <Typography level='body-lg' textTransform={'uppercase'} fontFamily={'Roboto'}>
            Region: <Link color='danger' onClick={handleAreaNav}>
              {meal.area}
            </Link>
          </Typography>
          <Typography level='body-lg' textTransform={'uppercase'} fontFamily={'Roboto'}>
            Category: <Link color='danger' onClick={handleCategoryNav}>
              {meal.category}
            </Link>
          </Typography>
        </Stack>

        <Stack direction='row' spacing={1} justifyContent='center'>
          {meal.source &&
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant='outlined' color='neutral'
                startDecorator={<Info />}
                onClick={() => handleExternalUrl(meal.source!)}>
                MORE INFO
              </Button>
            </motion.div>
          }
          {meal.youtube &&
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant='solid' color='danger'
                startDecorator={<Play />}
                onClick={() => handleExternalUrl(meal.youtube!)}>
                YOUTUBE
              </Button>
            </motion.div>
          }
        </Stack>

        <Stack direction='row' spacing={1} justifyContent='center'>
          {meal.tags.map(tag =>
            <motion.div key={tag} variants={chipVariants}>
              <Chip variant='soft' color='danger'>{tag}</Chip>
            </motion.div>
          )}
        </Stack>
      </Card>

      <Divider sx={{ bgcolor: 'neutral.500', height: '1.5px' }} />

      <motion.div variants={itemVariants}>
        <Typography level='h2' fontFamily={'Poiret One'} letterSpacing={1}>
          Ingredients
        </Typography>
      </motion.div>

      <Stack
        direction='row'
        flexWrap='wrap'
        component={motion.div}
        variants={containerVariants}
        sx={{ gap: 1 }}>
        {meal.ingredients.map(ingredient => (
          <motion.div key={ingredient} variants={chipVariants}>
            <Chip
              color="success"
              variant='solid'
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 300,
                cursor: 'default',
                "--Chip-radius": "8px",
                "--Chip-minHeight": "32px"
              }}
            >
              {ingredient}
            </Chip>
          </motion.div>
        ))}
      </Stack>

      <Divider sx={{ bgcolor: 'neutral.500', height: '1.5px' }} />

      <motion.div variants={itemVariants}>
        <Typography level='h2' fontFamily={'Poiret One'} letterSpacing={1}>
          Instructions
        </Typography>
      </motion.div>

      <List component={motion.ul} variants={containerVariants}>
        {meal.instructions.map(step => (step &&
          <ListItem
            key={step}
            component={motion.li}
            variants={itemVariants}
          >
            <ListItemDecorator sx={{
              color: 'primary.solidBg'
            }}>
              <LoaderPinwheel />
            </ListItemDecorator>
            <Typography level='body-md'>{step}</Typography>
          </ListItem>
        ))}
      </List>

    </Stack>
  );
}

export default Details;