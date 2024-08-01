import { Divider, IconButton, Stack, Typography } from '@mui/joy'
import { navigate } from '../../../shared/Router'
import { BookA, ChefHat, CircleArrowLeft, Salad, TreePalm } from 'lucide-react'
import { Spacer } from '../../../components/Spacer'
import NavMenuButton from './NavMenuButton'
import ThemeToggle from '../../../components/ThemeToggle'
import { useState } from 'react'

const Menus = [
  { label: 'Categories', icon: <Salad size={16} /> },
  { label: 'Regionals', icon: <TreePalm size={16} /> },
  { label: 'Dictionary', icon: <BookA size={16} /> }
]

const CookNav = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleOpenMenu = (label: string) => {
    setOpenMenu(label);
  };
  const handleCloseMenu = () => {
    setOpenMenu(null);
  };


  return (
    <Stack direction='row' alignItems='center' spacing={1}
      sx={{
        boxShadow: 'sm',
        width: 1,
        py: 1, px: 2,
      }}>
      <IconButton children={<CircleArrowLeft />} onClick={() => navigate('/')} />
      <Divider orientation="vertical" />
      <Typography
        level="h4"
        onClick={() => navigate('/recipe-haven')}
        sx={{ cursor: 'pointer' }}
        startDecorator={<ChefHat />}>
        Recipe Haven
      </Typography>
      <Spacer />

      <Stack direction='row' alignItems='center' spacing={1}
        divider={<Divider orientation="vertical" />}>
        {Menus.map((item, idx) => (
          <NavMenuButton
            key={idx}
            label={item.label}
            startDecorator={item.icon}
            openMenu={openMenu}
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
          />
        ))}
        <ThemeToggle />
      </Stack>
    </Stack>
  )
}

export default CookNav