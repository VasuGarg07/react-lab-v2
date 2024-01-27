import { AspectRatio, Button, Chip, Divider, Link, List, ListItem, ListItemDecorator, Stack, Typography } from '@mui/joy';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { MatIcon } from '../../components/Utils';
import { MealDetails } from './utils/helpers';
import DrawerMenu from './DrawerMenu';

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
      <div className='flex-justified'>
        <Typography level='h2' fontFamily={'Staatliches'} letterSpacing={2} textAlign={'center'}>
          {meal.name}
        </Typography>
        <DrawerMenu iconOnly />
      </div>
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

      <div className='flex-centered'>
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
      </div>

      <div className='flex-centered'>
        {meal.source &&
          <Button
            variant='outlined' color='neutral'
            startDecorator={<MatIcon icon="info_outlined" />}
            onClick={() => handleExternalUrl(meal.source!)}>
            MORE INFO</Button>}
        {meal.youtube &&
          <Button
            variant='solid' color='danger'
            startDecorator={<MatIcon icon="smart_display" />}
            onClick={() => handleExternalUrl(meal.youtube!)}>
            YOUTUBE</Button>}
      </div>

      <div className='flex-centered'>
        {meal.tags.map(tag => <Chip key={tag} variant='soft' color='danger'>{tag}</Chip>)}
      </div>

      <Divider sx={{ bgcolor: 'neutral.500', height: '1.5px' }} />

      <Typography level='h1' fontFamily={'Poiret One'} letterSpacing={1}>
        INGREDIENTS
      </Typography>

      <div className='flex-wrapped'>
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
      </div>

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
              <MatIcon icon='bubble_chart' outlined size={20} />
            </ListItemDecorator>
            <Typography level='body-md'>{step}</Typography>
          </ListItem>
        ))}
      </List>

    </Stack>
  )
}

export default Details