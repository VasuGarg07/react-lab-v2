import { IconButton, Input, Stack, Typography } from '@mui/joy';
import { BgCenteredBox } from '../../components/BgCenteredBox';
import Background from '../../assets/backgrounds/food.webp'
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spacer } from '../../components/Spacer';
import DrawerMenu from './DrawerMenu';

const RecipeHaven = () => {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (term) {
      navigate(`/recipe-haven/search/${term}`);
    }
  }

  return (
    <BgCenteredBox bg={Background}>
      <Stack
        direction='row'
        spacing={1}
        sx={{
          maxWidth: 600,
          width: 1,
          px: 1,
          py: 0.5,
          bgcolor: 'background.level1',
          borderRadius: 24,
          boxShadow: 'sm'
        }}
      >
        <Input
          size="sm"
          placeholder="Search..."
          value={term}
          onChange={e => setTerm(e.target.value)}
          sx={{
            bgcolor: 'transparent',
            flexGrow: 1,
            border: 'none',
            boxShadow: 'none'
          }} />
        <IconButton variant='plain' onClick={handleSearch}
          sx={{ borderRadius: 24 }}>
          <Search size={20} />
        </IconButton>
      </Stack>
      <Spacer />
      <Typography level='h1' sx={{
        fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
        fontWeight: 700,
        fontFamily: 'Poppins'
      }}>
        Recipe Haven
      </Typography>
      <Typography level='title-lg' sx={{
        fontFamily: 'Inter',
        fontWeight: 500,
        fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' }
      }}>
        Easy Eats, Big Treats!
      </Typography>
      <DrawerMenu />
      <Spacer />
    </BgCenteredBox >
  )
}

export default RecipeHaven