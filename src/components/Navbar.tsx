import { Divider, Sheet, Typography } from "@mui/joy"
import { navigate } from "../shared/Router"
import SideNav from "./SideNav"
import ThemeToggle from "./ThemeToggle"
import { Spacer } from "./Utils"
import Signup from "./Signup"

const Navbar = () => {
  return (
    <>
      <Sheet className="w-100 flex-centered pad-8-vr pad-16-hr"
        sx={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0 2px 2.6px' }}>
        <SideNav />
        <Spacer />
        <Typography level="h4" onClick={() => navigate('/')}>
          React Lab
        </Typography>
        <Spacer />
        <ThemeToggle />
        <Signup />
      </Sheet>
      <Divider />
    </>
  )
}

export default Navbar