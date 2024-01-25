import { AspectRatio, Button, Chip, Divider, Link, List, ListItem, ListItemDecorator, Stack, Typography } from '@mui/joy';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { MatIcon, MatIconOutlined } from '../../components/Utils';
import { MealDetails } from './utils/helpers';

const Details = () => {

  const navigate = useNavigate();
  const meal: MealDetails = useLoaderData() as MealDetails;

  const handleAreaNav = () => {
    navigate(`/quick-byte/area/${meal.area?.toLocaleLowerCase()}`)
  }

  const handleCategoryNav = () => {
    () => navigate(`/quick-byte/category/${meal.category?.toLocaleLowerCase()}`)
  }

  const handleExternalUrl = (url: string) => {
    window.open(url, '_black')
  }

  return (
    <Stack spacing={2}>
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

      <Typography level='h1' fontFamily={'Staatliches'} letterSpacing={2} textAlign={'center'}>
        {meal.name}
      </Typography>

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

      <Divider sx={{ bgcolor: 'danger.500', height: '1.5px' }} />

      <Typography level='h1' fontFamily={'Poiret One'} letterSpacing={1}>
        INGREDIENTS
      </Typography>

      <div className='flex-wrapped'>
        {meal.ingredients.map(ingredient => (
          <Chip color="danger" variant='solid' key={ingredient}
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

      <Divider sx={{ bgcolor: 'danger.500', height: '1.5px' }} />

      <Typography level='h1' fontFamily={'Poiret One'} letterSpacing={1}>
        INSTRUCTIONS
      </Typography>

      <List>
        {meal.instructions.map(step => (
          step && <ListItem key={step} >
            <ListItemDecorator sx={{
              color: 'danger.solidBg'
            }}>
              <MatIconOutlined icon='bubble_chart' />
            </ListItemDecorator>
            <Typography level='body-md'>{step}</Typography>
          </ListItem>
        ))}
      </List>

    </Stack>
  )
}

export default Details