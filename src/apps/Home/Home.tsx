import React from 'react';
import { Box, Container, Grid, Typography, useTheme } from "@mui/joy";
import { Apps } from "../../shared/apps";
import { AppCard } from "./AppCard";
import Footer from "./Footer";
import Hero from './Hero';

const Home = () => {
  const theme = useTheme();
  const visibleApps = React.useMemo(() => Apps.filter(app => app.visible), []);

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          background: theme.palette.mode === 'light'
            ? 'linear-gradient(to right, #DAE2F8, #ffffff);'
            : 'linear-gradient(to right, #0f2027, #203a43, #2c5364);',
          zIndex: 0,
        }}
      >
        <Container
          sx={{
            py: 4,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <Hero />

          <Typography
            level="h2"
            textAlign="center"
            fontWeight="bold"
            fontSize={{ xs: 16, md: 28 }}
            sx={{ my: 3 }}
          >
            Explore My Projects
          </Typography>

          <Grid container spacing={2}>
            {visibleApps.map((app) => (
              <Grid key={app.path} xs={12} sm={6} md={4}>
                <AppCard {...app} />
              </Grid>
            ))}
          </Grid>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default Home;
