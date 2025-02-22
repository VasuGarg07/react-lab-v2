import { Box, List, ListItem, ListItemButton, ListItemDecorator, Sheet, Typography } from '@mui/joy';
import { Home, PenLine, LayoutGrid, User } from 'lucide-react';
import { NavLink, useLocation } from 'react-router';
import React from 'react';

const SIDEBAR_WIDTH = '280px';

// Separate nav items for desktop and mobile
const SIDE_NAV_ITEMS = [
    { to: 'home', icon: <Home size={18} />, label: 'Home' },
    { to: 'publish', icon: <PenLine size={18} />, label: 'Write' },
    { to: 'list', icon: <LayoutGrid size={18} />, label: 'Explore' },
    { to: 'me', icon: <User size={18} />, label: 'My Blogs' }
];


const BlogifyNav = ({ mode = 'light' }) => {
    const location = useLocation();

    const colors = {
        light: {
            primary: '#E9967A',
            secondary: '#B8860B',
        },
        dark: {
            primary: '#FFB6A3',
            secondary: '#DAA520',
        }
    };

    // Desktop Sidebar Content
    const renderSideNav = () => (
        <Box
            component="nav"
            sx={{
                width: { sm: SIDEBAR_WIDTH },
                flexShrink: { sm: 0 },
                display: { xs: 'none', md: 'block' }
            }}
        >
            <Sheet
                sx={{
                    width: SIDEBAR_WIDTH,
                    height: 'calc(100vh - 52px)',
                    bgcolor: 'background.surface',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'sm'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, pl: 2 }}>
                    <img
                        src="/feather.png"
                        alt="Blogify Logo"
                        style={{
                            width: 40,
                            height: 40,
                        }}
                    />
                    <Typography
                        level="title-lg"
                        sx={{
                            background: mode === 'light'
                                ? `linear-gradient(45deg, ${colors.light.primary}, ${colors.light.secondary})`
                                : `linear-gradient(45deg, ${colors.dark.primary}, ${colors.dark.secondary})`,
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        Blogify
                    </Typography>
                </Box>

                <List
                    size="sm"
                    sx={{
                        gap: 1,
                        '--List-decoratorSize': '32px',
                    }}
                >
                    {SIDE_NAV_ITEMS.map((item) => (
                        <ListItem key={item.to}>
                            <ListItemButton
                                component={NavLink}
                                to={item.to}
                                selected={location.pathname.endsWith(item.to)}
                                sx={(theme) => ({
                                    borderRadius: 'md',
                                    gap: 1.5,
                                    fontSize: 'sm',
                                    fontWeight: 500,
                                    py: 0.5,
                                    transition: 'all 0.15s ease-in-out',

                                    '&:hover': {
                                        bgcolor: mode === 'light'
                                            ? 'rgba(233, 150, 122, 0.1) !important'
                                            : 'rgba(255, 182, 163, 0.1) !important',
                                        color: mode === 'light' ? `${colors.light.primary} !important` : `${colors.dark.primary} !important`,
                                        transform: 'translateX(4px)',
                                        '& svg': {
                                            transform: 'scale(1.1)',
                                            color: mode === 'light' ? colors.light.primary : colors.dark.primary,
                                        }
                                    },

                                    '&.active': {
                                        bgcolor: mode === 'light'
                                            ? 'rgba(233, 150, 122, 0.1) !important'
                                            : 'rgba(255, 182, 163, 0.1) !important',
                                        color: mode === 'light' ? `${colors.light.primary} !important` : `${colors.dark.primary} !important`,
                                        '& svg': {
                                            color: mode === 'light' ? colors.light.primary : colors.dark.primary,
                                        }
                                    },

                                    '& svg': {
                                        transition: 'all 0.2s ease',
                                        color: location.pathname === item.to
                                            ? (mode === 'light' ? colors.light.primary : colors.dark.primary)
                                            : theme.vars.palette.neutral.solidBg
                                    }
                                })}
                            >
                                <ListItemDecorator
                                    sx={{
                                        borderRadius: 'sm',
                                        width: 32,
                                        height: 32,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {item.icon}
                                </ListItemDecorator>
                                {item.label}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Sheet>
        </Box>
    );

    // Mobile Bottom Navigation Content
    const renderBottomNav = () => (
        <Sheet
            sx={{
                display: { xs: 'block', md: 'none' },
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                borderTop: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.surface',
                zIndex: 1000,
                borderRadius: '12px 12px 0 0'
            }}
        >
            <List
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    gap: 1,
                    px: 2,
                    py: 1,
                }}
            >
                {SIDE_NAV_ITEMS.map((item) => (
                    <ListItem key={item.to} sx={{ p: 0, flex: 1 }}>
                        <ListItemButton
                            component={NavLink}
                            to={item.to}
                            selected={location.pathname.endsWith(item.to)}
                            sx={{
                                flexDirection: 'column',
                                alignItems: 'center',
                                borderRadius: 'sm',
                                p: 1, gap: 0.5,
                                '&:hover': {
                                    bgcolor: 'transparent',
                                    color: mode === 'light' ? `${colors.light.primary} !important` : `${colors.dark.primary} !important`,
                                    '& svg': {
                                        transform: 'translateY(-2px)',
                                        color: mode === 'light' ? colors.light.primary : colors.dark.primary,
                                    }

                                },
                                '&.active': {
                                    bgcolor: 'transparent',
                                    color: mode === 'light' ? `${colors.light.primary} !important` : `${colors.dark.primary} !important`,
                                    '& svg, & Typography': {
                                        color: mode === 'light' ? colors.light.primary : colors.dark.primary,
                                    }
                                }
                            }}
                        >
                            {React.cloneElement(item.icon, {
                                style: {
                                    transition: 'all 0.2s ease',
                                    color: location.pathname.endsWith(item.to)
                                        ? (mode === 'light' ? colors.light.primary : colors.dark.primary)
                                        : undefined
                                }
                            })}
                            <Typography
                                level="body-xs"
                                sx={{
                                    fontSize: '0.7rem',
                                    transition: 'color 0.2s ease',
                                    color: location.pathname.endsWith(item.to)
                                        ? (mode === 'light' ? colors.light.primary : colors.dark.primary)
                                        : undefined
                                }}
                            >
                                {item.label}
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Sheet>
    );

    return (
        <>
            {renderSideNav()}
            {renderBottomNav()}
        </>
    );
};

export default BlogifyNav;