import { Grid, Sheet, Typography } from "@mui/joy"
import { Apps } from "../../shared/apps"
import { AppCard } from "../../components/AppCard"


const Home = () => {
  return (
    <>
      <Sheet
        className="margin flex-centered-column text-center"
        sx={{ borderRadius: 'md', p: 2 }} >

        <Typography
          level="h1"
          children="REACT LAB" />

        <Typography sx={{ mx: 2, maxWidth: 800 }}>
          Welcome to React Lab! 🚀 This is where my React experiments hang out.
          Dive into a mix of quirky, cool, and maybe even a bit wild projects that I've thrown together.
          Whether you're here for inspiration or just to see what happens when you combine React
          with a dash of creativity, you're in the right place.
          So, let's dive in and see what kind of React magic we can brew up! 🎉✨
        </Typography>
      </Sheet>

      <Sheet
        className="margin flex-centered-column text-center"
        sx={{ borderRadius: 'md', p: 2, }}>

        <Grid container spacing={2} sx={{ flexGrow: 1, maxWidth: 1200 }} className="w-100">
          {Apps.map((app, index) => {
            return (
              <Grid key={index} xs={12} sm={6} md={4}>
                <AppCard name={app.name} tag={app.tag} path={app.path} />
              </Grid>
            )
          })}
        </Grid>
      </Sheet>
    </>
  )
}

export default Home

