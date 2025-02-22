import NavMenuButton from '@/apps/QuickByte/Navigation/NavMenuButton'
import ThemeToggle from '@/components/ThemeToggle'
import { navigate } from '@/shared/Router'
import { Divider, IconButton, Stack, Typography, useTheme } from '@mui/joy'
import { BookA, ChefHat, CircleArrowLeft, Salad, TreePalm } from 'lucide-react'
import { useState } from 'react'

const Menus = [
  { label: 'Categories', icon: <Salad size={16} /> },
  { label: 'Regionals', icon: <TreePalm size={16} /> },
  { label: 'Dictionary', icon: <BookA size={16} /> }
]

const CookNav = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

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
        backdropFilter: isDark ? 'brightness(0.6)' : 'contrast(0.9)'
      }}>
      <IconButton children={<CircleArrowLeft />} onClick={() => navigate(-1)} />
      <Divider orientation="vertical" />
      <Typography
        level="h4"
        onClick={() => navigate('/recipe-haven')}
        sx={{ cursor: 'pointer' }}
        startDecorator={<ChefHat />}>
        Recipe Haven
      </Typography>
      <span className='spacer' />

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