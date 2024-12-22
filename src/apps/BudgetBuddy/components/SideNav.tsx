import {
    Avatar,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemDecorator,
    Sheet,
    Typography
} from '@mui/joy';
import { BarChart3, History, LayoutGrid, Menu, PieChart, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const SIDEBAR_WIDTH = '280px';

const NAVIGATION_ITEMS = [
    { to: 'home', icon: <LayoutGrid size={18} />, label: 'Home' },
    { to: 'overview', icon: <History size={18} />, label: 'Overview' },
    { to: 'statistics', icon: <PieChart size={18} />, label: 'Statistics' },
    { to: 'timeline', icon: <BarChart3 size={18} />, label: 'Timeline' }
];

interface SideNavProps {
    mobileOpen: boolean;
    onMobileToggle: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ mobileOpen, onMobileToggle }) => {
    const location = useLocation();

    const renderNavItems = (
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
                            transition: 'all 0.15s ease-in-out',

                            '&:hover': {
                                bgcolor: `${theme.vars.palette.success.softBg}`,
                                transform: 'translateX(4px)',
                                '& svg': {
                                    transform: 'scale(1.1)',
                                }
                            },

                            '&.active': {
                                bgcolor: theme.vars.palette.success.softBg,
                                '& svg': {
                                    color: theme.vars.palette.neutral[500],
                                }
                            },

                            '& svg': {
                                transition: 'transform 0.2s ease',
                                color: theme.vars.palette.neutral.solidBg
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
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <Box
                component="nav"
                sx={{
                    width: { sm: SIDEBAR_WIDTH },
                    flexShrink: { sm: 0 },
                    display: { xs: 'none', sm: 'block' }
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
                        gap: 2,
                        boxShadow: 'sm'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar size="sm" variant="soft" color="success">BB</Avatar>
                        <Typography
                            level="title-lg"
                            sx={{
                                background: 'linear-gradient(45deg, var(--joy-palette-success-400), var(--joy-palette-success-700))',
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            Budget Buddy
                        </Typography>
                    </Box>
                    {renderNavItems}
                </Sheet>
            </Box>

            {/* Mobile Navigation */}
            <Box
                component="nav"
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    zIndex: 1200,
                    width: '100%',
                    height: mobileOpen ? 'calc(100vh - 52px)' : 'auto',
                }}
            >
                <Sheet
                    sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        background: 'transparent',
                        borderBottom: '1px solid white'
                    }}
                >
                    <IconButton
                        onClick={onMobileToggle}
                        variant="soft"
                        color="success"
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </IconButton>
                    <Typography level="title-lg" color='success'>Budget Buddy</Typography>
                </Sheet>

                {mobileOpen && (
                    <Sheet
                        sx={{
                            position: 'fixed',
                            top: '52px',
                            left: 0,
                            width: '100%',
                            height: '100%',
                            bgcolor: 'background.surface',
                            p: 2,
                            animation: 'slideIn 0.2s ease-out',
                            '@keyframes slideIn': {
                                from: {
                                    opacity: 0,
                                    transform: 'translateY(-10px)'
                                },
                                to: {
                                    opacity: 1,
                                    transform: 'translateY(0)'
                                }
                            }
                        }}
                        onClick={onMobileToggle}
                    >
                        {renderNavItems}
                    </Sheet>
                )}
            </Box>
        </>
    );
};

export default SideNav;