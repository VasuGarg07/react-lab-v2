import { Sheet, Typography, IconButton, Divider, Link } from "@mui/joy"
import SideNav from "./SideNav"
import ThemeToggle from "./ThemeToggle"
import { Spacer, MatIcon } from "./Utils"

const Navbar = () => {
  return (
    <>
      <Sheet className="w-100 flex-centered pad-8-vr pad-16-hr">
        <SideNav />
        <Spacer />
        <Link href="/" underline="none">
          <Typography level="h4">React Lab
          </Typography>
        </Link>
        <Spacer />
        <ThemeToggle />
        <IconButton children={<MatIcon icon='account_circle' />} />
      </Sheet>
      <Divider />
    </>
  )
}

export default Navbar