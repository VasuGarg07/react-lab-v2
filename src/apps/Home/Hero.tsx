import React from 'react';
import { Card, AspectRatio, Typography, Grid, Box, useTheme } from '@mui/joy';
import Logo from '/homepage.svg';

const Hero: React.FC = () => {
    const theme = useTheme();

    return (
        <Card variant="outlined" sx={{ mb: 4, backgroundColor: 'background.level1', boxShadow: 'sm' }}>
            <Grid container spacing={4} alignItems="center">
                <Grid xs={12} md={5}>
                    <AspectRatio ratio="1" sx={{ maxWidth: 400, margin: 'auto' }}>
                        <Box component="img" src={Logo} alt="React Lab Logo" sx={{ objectFit: 'contain', background: 'transparent' }} />
                    </AspectRatio>
                </Grid>
                <Grid xs={12} md={7}>
                    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography
                            level="h1"
                            fontSize={{ xs: 40, md: 48 }}
                            fontFamily="Kanit"
                            letterSpacing={1.5}
                            mb={2}
                            sx={{
                                color: theme.palette.mode === 'light' ? 'primary.800' : 'primary.200',
                                textShadow: theme.palette.mode === 'light'
                                    ? '1px 1px 2px rgba(0,0,0,0.1)'
                                    : '1px 1px 2px rgba(255,255,255,0.1)',
                            }}
                        >
                            REACT LAB
                        </Typography>
                        <Typography level="body-lg" fontFamily="Overlock">
                            Welcome to React Lab! 🚀 This is where my React experiments hang out.
                            Dive into a mix of quirky, cool, and maybe even a bit wild projects that I've thrown together.
                            Whether you're here for inspiration or just to see what happens when you combine React
                            with a dash of creativity, you're in the right place.
                            So, let's dive in and see what kind of React magic we can brew up! 🎉✨
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Card>

    )
}

export default Hero