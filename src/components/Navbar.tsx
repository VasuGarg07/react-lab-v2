import { Sheet, Typography, IconButton, Divider } from "@mui/joy"
import SideNav from "./SideNav"
import ThemeToggle from "./ThemeToggle"
import { Spacer, MatIcon } from "./Utils"
import { navigate } from "../shared/Router"

const Navbar = () => {
  return (
    <>
      <Sheet className="w-100 flex-centered pad-8-vr pad-16-hr">
        <SideNav />
        <Spacer />
        <Typography level="h4" onClick={() => navigate('/')}>
          React Lab
        </Typography>
        <Spacer />
        <ThemeToggle />
        <IconButton children={<MatIcon icon='account_circle' />} />
      </Sheet>
      <Divider />
    </>
  )
}

export default Navbar