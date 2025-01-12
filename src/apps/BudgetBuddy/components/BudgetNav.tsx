import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemDecorator, Sheet, Typography } from '@mui/joy';
import { BarChart3, History, LayoutGrid, PieChart } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const SIDEBAR_WIDTH = '280px';

const NAVIGATION_ITEMS = [
    { to: 'home', icon: <LayoutGrid size={18} />, label: 'Home' },
    { to: 'overview', icon: <History size={18} />, label: 'Overview' },
    { to: 'statistics', icon: <PieChart size={18} />, label: 'Statistics' },
    { to: 'timeline', icon: <BarChart3 size={18} />, label: 'Timeline' }
];


const BudgetNav = ({ mode = 'light' }) => {
    const location = useLocation();

    const colors = {
        light: '#16CC87',
        dark: '#01DEAB'
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
                        src="/money.png"
                        alt="Budget Logo"
                        style={{
                            width: 40,
                            height: 40,
                        }}
                    />
                    <Typography
                        level="title-lg"
                        sx={{
                            background: mode === 'light' ? colors.light : colors.dark,
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        BudgetBuddy
                    </Typography>
                </Box>

                <List
                    size="sm"
                    sx={{
                        gap: 1,
                        '--List-decoratorSize': '32px',
                    }}
                >
                    {NAVIGATION_ITEMS.map((item) => (
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
                                            ? 'rgba(122, 233, 183, 0.1) !important'
                                            : 'rgba(163, 255, 198, 0.1) !important',
                                        color: mode === 'light' ? `${colors.light} !important` : `${colors.dark} !important`,
                                        transform: 'translateX(4px)',
                                        '& svg': {
                                            transform: 'scale(1.1)',
                                            color: mode === 'light' ? colors.light : colors.dark,
                                        }
                                    },

                                    '&.active': {
                                        bgcolor: mode === 'light'
                                            ? 'rgba(122, 233, 183, 0.1) !important'
                                            : 'rgba(163, 255, 198, 0.1) !important',
                                        color: mode === 'light' ? `${colors.light} !important` : `${colors.dark} !important`,
                                        '& svg': {
                                            color: mode === 'light' ? colors.light : colors.dark,
                                        }
                                    },

                                    '& svg': {
                                        transition: 'all 0.2s ease',
                                        color: location.pathname === item.to
                                            ? (mode === 'light' ? colors.light : colors.dark)
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
                {NAVIGATION_ITEMS.map((item) => (
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
                                    color: mode === 'light' ? `${colors.light} !important` : `${colors.dark} !important`,
                                    '& svg': {
                                        transform: 'translateY(-2px)',
                                        color: mode === 'light' ? colors.light : colors.dark,
                                    }

                                },
                                '&.active': {
                                    bgcolor: 'transparent',
                                    color: mode === 'light' ? `${colors.light} !important` : `${colors.dark} !important`,
                                    '& svg, & Typography': {
                                        color: mode === 'light' ? colors.light : colors.dark,
                                    }
                                }
                            }}
                        >
                            {React.cloneElement(item.icon, {
                                style: {
                                    transition: 'all 0.2s ease',
                                    color: location.pathname.endsWith(item.to)
                                        ? (mode === 'light' ? colors.light : colors.dark)
                                        : undefined
                                }
                            })}
                            <Typography
                                level="body-xs"
                                sx={{
                                    fontSize: '0.7rem',
                                    transition: 'color 0.2s ease',
                                    color: location.pathname.endsWith(item.to)
                                        ? (mode === 'light' ? colors.light : colors.dark)
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

export default BudgetNav;