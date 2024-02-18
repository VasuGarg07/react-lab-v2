import { Grid, Sheet, Stack, Typography } from "@mui/joy";
import Logo from '../../assets/homepage.svg';
import { AppCard } from "../../components/AppCard";
import { Apps } from "../../shared/apps";

const Home = () => {
  return (
    <>
      <Sheet
        className="margin flex-centered-column text-center"
        sx={{ borderRadius: 'md', p: 2, backgroundColor: 'transparent' }}>

        <Stack spacing={0} alignItems='center'>
          <img src={Logo} alt="" />

          <Typography
            fontFamily={'Kanit'}
            letterSpacing={1.5}
            level="h1"
            fontSize={48}
            children="REACT LAB" />

          <Typography level="body-lg" sx={{ mx: 2, maxWidth: 800 }} fontFamily={'Overlock'}>
            Welcome to React Lab! 🚀 This is where my React experiments hang out.
            Dive into a mix of quirky, cool, and maybe even a bit wild projects that I've thrown together.
            Whether you're here for inspiration or just to see what happens when you combine React
            with a dash of creativity, you're in the right place.
            So, let's dive in and see what kind of React magic we can brew up! 🎉✨
          </Typography>

        </Stack>
      </Sheet>

      <Sheet
        className="margin flex-centered-column text-center"
        sx={{ borderRadius: 'md', p: 2, background: 'transparent' }}>

        <Grid container spacing={2} sx={{ flexGrow: 1, maxWidth: 1200 }} className="w-100">
          {Apps.map((app, index) => {
            return (
              <Grid key={index} xs={12} sm={6} md={4}>
                <AppCard {...app} />
              </Grid>
            )
          })}
        </Grid>
      </Sheet>


    </>
  )
}

export default Home

