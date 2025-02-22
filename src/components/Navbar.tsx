import CookNav from "@/apps/QuickByte/Navigation/CookNav"
import SideNav from "@/components/SideNav"
import Signup from "@/auth/Signup"
import ThemeToggle from "@/components/ThemeToggle"
import { navigate } from "@/shared/Router"
import { Stack, Typography, useTheme } from "@mui/joy"
import { useLocation } from "react-router"

const Navbar = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const location = useLocation();

  if (location.pathname.startsWith('/recipe-haven')) {
    return <CookNav />
  }

  if (location.pathname.startsWith('/jobscape')) {
    return <></>
  }

  return (
    <Stack direction='row' alignItems='center' spacing={1}
      sx={{
        boxShadow: 'sm',
        width: 1,
        py: 1, px: 2,
        backdropFilter: isDark ? 'brightness(0.6)' : 'contrast(0.9)'
      }}>
      <SideNav />
      <span className='spacer' />

      <Typography level="h4" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        React Lab
      </Typography>
      <span className='spacer' />

      <ThemeToggle />
      <Signup />
    </Stack>
  )
}

export default Navbar