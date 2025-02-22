import { Stack, Typography, useTheme } from "@mui/joy"
import { navigate } from "@/shared/Router"
import SideNav from "@/components/SideNav"
import ThemeToggle from "@/components/ThemeToggle"
import { Spacer } from "@/components/Spacer"
import Signup from "@/components/Signup"
import { useLocation } from "react-router"
import CookNav from "@/apps/QuickByte/Navigation/CookNav"

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
      <Spacer />
      <Typography level="h4" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        React Lab
      </Typography>
      <Spacer />
      <ThemeToggle />
      <Signup />
    </Stack>
  )
}

export default Navbar