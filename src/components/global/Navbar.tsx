import { Divider, Sheet, Stack, Typography } from "@mui/joy"
import { navigate } from "../../shared/Router"
import SideNav from "./SideNav"
import ThemeToggle from "./ThemeToggle"
import { Spacer } from "../shared/Spacer"
import Signup from "./Signup"

const Navbar = () => {
  return (
    <>
      <Stack component={Sheet} direction='row' alignItems='center' spacing={1}
        sx={{ boxShadow: 'md', width: 1, py: 1, px: 2, }}>
        <SideNav />
        <Spacer />
        <Typography level="h4" onClick={() => navigate('/')}>
          React Lab
        </Typography>
        <Spacer />
        <ThemeToggle />
        <Signup />
      </Stack>
      <Divider />
    </>
  )
}

export default Navbar