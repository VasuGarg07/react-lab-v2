import React from 'react';
import { Box, Container, IconButton, Stack, Typography, useColorScheme } from '@mui/joy';
import { Github, Linkedin, Moon, Sun } from 'lucide-react';

const Footer: React.FC = () => {
    const { mode, setMode } = useColorScheme();

    const toggleColorMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };

    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
                backdropFilter: 'blur(10px)',
                background: (_) =>
                    mode === 'light'
                        ? 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)'
                        : 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
            }}
        >
            <Container>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography level="body-md" sx={{ fontFamily: 'Overlock' }}>
                        © {new Date().getFullYear()} React Lab • Made by Vasu Garg
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton
                            variant="outlined"
                            color="neutral"
                            onClick={toggleColorMode}
                            size="sm"
                            sx={{
                                borderRadius: '50%',
                                '&:hover': { transform: 'rotate(20deg)' },
                                transition: 'transform 0.3s',
                            }}
                        >
                            {mode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                        </IconButton>
                        <IconButton
                            variant="outlined"
                            color="neutral"
                            component="a"
                            href="https://github.com/VasuGarg07"
                            target="_blank"
                            size="sm"
                            sx={{
                                borderRadius: '50%',
                                '&:hover': { transform: 'scale(1.1)' },
                                transition: 'transform 0.3s',
                            }}
                        >
                            <Github size={18} />
                        </IconButton>
                        <IconButton
                            variant="outlined"
                            color="neutral"
                            component="a"
                            href="https://linkedin.com/in/vasu-garg-07"
                            target="_blank"
                            size="sm"
                            sx={{
                                borderRadius: '50%',
                                '&:hover': { transform: 'scale(1.1)' },
                                transition: 'transform 0.3s',
                            }}
                        >
                            <Linkedin size={18} />
                        </IconButton>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;