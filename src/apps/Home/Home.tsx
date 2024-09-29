import { AspectRatio, Grid, Sheet, Stack, Typography } from "@mui/joy";
import Logo from '../../assets/homepage.svg';
import { AppCard } from "../../components/AppCard";
import { Apps } from "../../shared/apps";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <Sheet
        sx={{ borderRadius: 'md', p: 2, m: 2, textAlign: 'center', backgroundColor: 'transparent' }}>
        <Stack spacing={0} alignItems='center'>
          <AspectRatio variant="plain" objectFit="contain" sx={{ width: 1, maxWidth: 800 }}>
            <img src={Logo} alt="" />
          </AspectRatio>

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
        sx={{ borderRadius: 'md', p: 2, m: 2, background: 'transparent', display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={2} sx={{ flexGrow: 1, maxWidth: 1200, width: 1 }}>
          {Apps.map((app, index) => {
            return (
              <Grid key={index} xs={12} sm={6} md={4}>
                <AppCard {...app} />
              </Grid>
            )
          })}
        </Grid>
      </Sheet>

      <Footer />
    </>
  )
}

export default Home

