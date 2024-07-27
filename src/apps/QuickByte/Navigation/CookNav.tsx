import { Divider, Stack, Typography } from '@mui/joy'
import { navigate } from '../../../shared/Router'
import { BookA, ChefHat, Salad, TreePalm } from 'lucide-react'
import { Spacer } from '../../../components/Spacer'
import NavMenuButton from './NavMenuButton'
import ThemeToggle from '../../../components/ThemeToggle'
import { useState } from 'react'

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
      <Typography
        level="h4"
        onClick={() => navigate('/recipe-haven')}
        sx={{ cursor: 'pointer' }}
        startDecorator={<ChefHat />}>
        Recipe Haven
      </Typography>
      <Spacer />

      <NavMenuButton
        label={'Categories'}
        startDecorator={<Salad size={16} />}
        openMenu={openMenu}
        handleOpenMenu={handleOpenMenu}
        handleCloseMenu={handleCloseMenu}

      />
      <Divider orientation="vertical" />
      <NavMenuButton
        label={'Regionals'}
        startDecorator={<TreePalm size={16} />}
        openMenu={openMenu}
        handleOpenMenu={handleOpenMenu}
        handleCloseMenu={handleCloseMenu}
      />
      <Divider orientation="vertical" />
      <NavMenuButton
        label={'Dictionary'}
        startDecorator={<BookA size={16} />}
        openMenu={openMenu}
        handleOpenMenu={handleOpenMenu}
        handleCloseMenu={handleCloseMenu}
      />
      <Divider orientation="vertical" />
      <ThemeToggle />
    </Stack>
  )
}

export default CookNav