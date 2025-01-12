import {
    Box,
    Button,
    Container,
    Dropdown,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    Sheet,
    Stack,
    Typography
} from '@mui/joy';
import { Menu as MenuIcon, Search, X } from 'lucide-react';
import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ThemeToggle from '../../../components/ThemeToggle';

interface NavbarProps {
    userType: 'none' | 'employer' | 'applicant';
    onLogout?: () => void;
}

const Navbar = ({ userType, onLogout }: NavbarProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    // Role-based navigation items
    const navItems = {
        none: [
            { label: 'Home', path: '/' },
            { label: 'Find Job', path: '/jobs' },
            { label: 'Employers', path: '/employers' },
            { label: 'Contact Us', path: '/support' },
        ],
        employer: [
            { label: 'Home', path: '/' },
            { label: 'Dashboard', path: '/employer-dashboard' },
            { label: 'Candidates', path: '/candidates' },
            { label: 'Contact Us', path: '/support' },
        ],
        applicant: [
            { label: 'Home', path: '/' },
            { label: 'Dashboard', path: '/applicant-dashboard' },
            { label: 'Find Job', path: '/jobs' },
            { label: 'Companies', path: '/companies' },
            { label: 'Contact Us', path: '/support' },
        ],
    };

    const currentNavItems = navItems[userType];

    return (
        <Box component="header" sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
            {/* Top Navigation */}
            <Box
                sx={{
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.level1',
                    display: { xs: 'none', md: 'block' }, // Hide on mobile
                }}
            >
                <Container maxWidth="lg">
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ minHeight: '48px' }}
                    >
                        {/* Navigation Links */}
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ display: { xs: 'none', md: 'flex' } }}
                        >
                            {currentNavItems.map((item) => (
                                <Button
                                    key={item.path}
                                    component={RouterLink}
                                    to={item.path}
                                    variant="plain"
                                    color={location.pathname === item.path ? 'primary' : 'neutral'}
                                    size="sm"
                                    sx={{
                                        fontSize: 'sm',
                                        fontWeight: 'md',
                                        '&:hover': { bgcolor: 'transparent', color: 'primary.main' },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Stack>

                        <ThemeToggle />
                    </Stack>
                </Container>
            </Box>

            {/* Main Navigation */}
            <Box sx={{ py: { xs: 1, md: 2 } }}>
                <Container maxWidth="lg">
                    <Stack direction="row" spacing={4} alignItems="center">
                        {/* Logo */}
                        <Stack
                            component={RouterLink}
                            to="/"
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{ textDecoration: 'none' }}
                        >
                            <img src="/briefcase.png" alt="Jobscape" style={{ height: 32 }} />
                            <Typography
                                level="title-lg"
                                sx={{
                                    color: 'primary.main',
                                    fontWeight: 'xl',
                                    display: { xs: 'none', sm: 'block' }
                                }}
                            >
                                Jobscape
                            </Typography>
                        </Stack>

                        <Input
                            size="sm"
                            placeholder="Job title, keyword, company"
                            startDecorator={<Search size={16} />}
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                flex: 1,
                                maxWidth: 'md',
                                mx: 2,
                                '--Input-focusedThickness': '2px',
                            }}
                        />

                        {/* Right Section */}
                        <Stack direction="row" spacing={2} alignItems="center">
                            {userType === 'none' ? (
                                <>
                                    <Button
                                        component={RouterLink}
                                        to="/login"
                                        variant="outlined"
                                        color="neutral"
                                        size="sm"
                                        sx={{
                                            display: { xs: 'none', md: 'flex' },
                                            fontWeight: 'md'
                                        }}
                                    >
                                        Sign In
                                    </Button>
                                    <Button
                                        component={RouterLink}
                                        to="/post-job"
                                        variant="solid"
                                        color="primary"
                                        size="sm"
                                    >
                                        Post A Job
                                    </Button>
                                </>
                            ) : (
                                <Dropdown>
                                    <MenuButton
                                        slots={{ root: IconButton }}
                                        slotProps={{ root: { variant: 'soft', size: 'sm' } }}
                                        sx={{ borderRadius: '50%' }}
                                    >
                                        <Box
                                            component="img"
                                            src="https://ui-avatars.com/api/?name=User&background=random"
                                            alt="User"
                                            sx={{ width: 32, height: 32, borderRadius: '50%' }}
                                        />
                                    </MenuButton>
                                    <Menu>
                                        <MenuItem onClick={onLogout}>Logout</MenuItem>
                                    </Menu>
                                </Dropdown>
                            )}

                            {/* Mobile Menu Button */}
                            <IconButton
                                variant="outlined"
                                color="neutral"
                                onClick={() => setMobileOpen(!mobileOpen)}
                                sx={{ display: { xs: 'flex', md: 'none' } }}
                            >
                                {mobileOpen ? <X /> : <MenuIcon />}
                            </IconButton>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            {/* Mobile Menu */}
            <Sheet
                variant="outlined"
                sx={{
                    display: { xs: mobileOpen ? 'block' : 'none', md: 'none' },
                    position: 'fixed',
                    top: '64px',
                    left: 0,
                    right: 0,
                    bgcolor: 'background.surface',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    zIndex: 1000,
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Stack spacing={1}>
                        {currentNavItems.map((item) => (
                            <Button
                                key={item.path}
                                component={RouterLink}
                                to={item.path}
                                variant={location.pathname === item.path ? 'soft' : 'plain'}
                                color={location.pathname === item.path ? 'primary' : 'neutral'}
                                fullWidth
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.label}
                            </Button>
                        ))}
                        {userType === 'none' && (
                            <Button
                                component={RouterLink}
                                to="/login"
                                variant="outlined"
                                color="neutral"
                                fullWidth
                            >
                                Sign In
                            </Button>
                        )}
                    </Stack>
                </Box>
            </Sheet>
        </Box>
    );
};

export default Navbar;