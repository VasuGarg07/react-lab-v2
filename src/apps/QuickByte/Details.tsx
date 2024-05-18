import { AspectRatio, Button, Chip, Divider, Link, List, ListItem, ListItemDecorator, Stack, Typography } from '@mui/joy';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { MealDetails } from './utils/helpers';
import DrawerMenu from './DrawerMenu';
import { Info, LoaderPinwheel, Play } from 'lucide-react';

const Details = () => {

  const navigate = useNavigate();
  const meal: MealDetails = useLoaderData() as MealDetails;

  const handleAreaNav = () => {
    navigate(`/quick-byte/area/${meal.area?.toLocaleLowerCase()}`)
  }

  const handleCategoryNav = () => {
    navigate(`/quick-byte/category/${meal.category?.toLocaleLowerCase()}`)
  }

  const handleExternalUrl = (url: string) => {
    window.open(url, '_black')
  }

  return (
    <Stack spacing={2}>
      <Stack direction='row' justifyContent='space-between'>
        <Typography level='h2' fontFamily={'Staatliches'} letterSpacing={2} textAlign={'center'}>
          {meal.name}
        </Typography>
        <DrawerMenu iconOnly />
      </Stack>
      <AspectRatio
        variant='plain'
        objectFit="cover"
        ratio={2}
        sx={{
          borderRadius: 'xl',
          boxShadow: `xl`,
          width: 1
        }}>
        <img src={meal.image} alt={meal.name} />
      </AspectRatio>

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
          <Button
            variant='outlined' color='neutral'
            startDecorator={<Info />}
            onClick={() => handleExternalUrl(meal.source!)}>
            MORE INFO</Button>}
        {meal.youtube &&
          <Button
            variant='solid' color='danger'
            startDecorator={<Play />}
            onClick={() => handleExternalUrl(meal.youtube!)}>
            YOUTUBE</Button>}
      </Stack>

      <Stack direction='row' spacing={1} justifyContent='center'>
        {meal.tags.map(tag => <Chip key={tag} variant='soft' color='danger'>{tag}</Chip>)}
      </Stack>

      <Divider sx={{ bgcolor: 'neutral.500', height: '1.5px' }} />

      <Typography level='h1' fontFamily={'Poiret One'} letterSpacing={1}>
        INGREDIENTS
      </Typography>

      <Stack direction='row' flexWrap='wrap' sx={{ gap: 1 }}>
        {meal.ingredients.map(ingredient => (
          <Chip color="success" variant='solid' key={ingredient}
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 300,
              cursor: 'default',
              "--Chip-radius": "8px",
              "--Chip-minHeight": "32px"
            }}>
            {ingredient}
          </Chip>
        ))}
      </Stack>

      <Divider sx={{ bgcolor: 'neutral.500', height: '1.5px' }} />

      <Typography level='h1' fontFamily={'Poiret One'} letterSpacing={1}>
        INSTRUCTIONS
      </Typography>

      <List>
        {meal.instructions.map(step => (
          step && <ListItem key={step} >
            <ListItemDecorator sx={{
              color: 'warning.solidBg'
            }}>
              <LoaderPinwheel />
            </ListItemDecorator>
            <Typography level='body-md'>{step}</Typography>
          </ListItem>
        ))}
      </List>

    </Stack>
  )
}

export default Details