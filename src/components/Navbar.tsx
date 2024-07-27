import { Stack, Typography } from "@mui/joy"
import { navigate } from "../shared/Router"
import SideNav from "./SideNav"
import ThemeToggle from "./ThemeToggle"
import { Spacer } from "./Spacer"
import Signup from "./Signup"
import { useLocation } from "react-router-dom"
import CookNav from "../apps/QuickByte/Navigation/CookNav"

const Navbar = () => {

  const location = useLocation();

  if (location.pathname.startsWith('/recipe-haven')) {
    return (<CookNav />)
  }

  return (
    <Stack direction='row' alignItems='center' spacing={1}
      sx={{
        boxShadow: 'sm',
        width: 1,
        py: 1, px: 2,
        backdropFilter: `brightness(0.8)`
      }}>
      <SideNav />
      <Spacer />
      <Typography level="h4" onClick={() => navigate('/')}>
        React Lab
      </Typography>
      <Spacer />
      <ThemeToggle />
      <Signup />
    </Stack>
  )
}

export default Navbar