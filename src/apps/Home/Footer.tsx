import * as React from 'react';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/joy';
import { Github, Linkedin } from 'lucide-react';
import { Spacer } from '../../components/Spacer';

const Footer: React.FC = () => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box
            sx={{
                boxShadow: 'sm',
                width: 1,
                p: 1,
                backdropFilter: isDark ? 'brightness(0.6)' : 'contrast(0.9)',
            }}>
            <Stack direction='row' alignItems='center' spacing={1} sx={{ width: 1, maxWidth: 1200, mx: 'auto', px: 2 }}>
                <Typography fontFamily={'Overlock'} level="title-lg" sx={{ mr: 1 }}>
                    React Lab
                    <Typography sx={{ mx: 1 }}>•</Typography>
                    Made by Vasu Garg
                </Typography>
                <Spacer />
                <IconButton variant='solid' component="a" href="https://github.com/VasuGarg07" target="_blank">
                    <Github />
                </IconButton>

                <IconButton variant='solid' component="a" href="https://linkedin.com/in/vasu-garg-07" target="_blank">
                    <Linkedin />
                </IconButton>
            </Stack>
        </Box>
    );
};

export default Footer;
