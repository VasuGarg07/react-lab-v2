import {
    Avatar,
    Box,
    Button,
    Container,
    Dropdown,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    Sheet,
    Stack,
    Typography,
    useColorScheme
} from '@mui/joy';
import { LogOut, Menu as MenuIcon, Moon, Sun, User, User2, UserRoundPlus } from 'lucide-react';
import { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { useJobscape } from '../JobscapeProvider';
import { ApplicantResponse, EmployerResponse, JobRoles } from '../helpers/job.types';

interface NavbarProps {
    userType: JobRoles | 'none';
    onLogout?: () => void;
}

const Navbar = ({ userType, onLogout }: NavbarProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { mode, setMode } = useColorScheme();

    const { profile, role } = useJobscape();

    const getAvatar = (): string => {
        if (!role) {
            return `https://api.dicebear.com/7.x/initials/svg?seed=${'Guest User'}`;
        }

        if (role === 'employer') {
            return (profile as EmployerResponse).logoURL;
        } else {
            return (profile as ApplicantResponse).photoUrl
                || `https://api.dicebear.com/7.x/initials/svg?seed=${(profile as ApplicantResponse).fullName}`;
        }
    }

    const toggleColorMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };

    // Role-based navigation items
    const navItems = {
        none: [
            { label: 'Home', path: 'home' },
            { label: 'Find Job', path: 'jobs' },
            { label: 'About Us', path: 'about' },
            { label: 'Contact Us', path: 'support' },
        ],
        employer: [
            { label: 'Home', path: 'home' },
            { label: 'Dashboard', path: 'employer-dashboard' },
            { label: 'Candidates', path: 'candidates' },
            { label: 'Contact Us', path: 'support' },
        ],
        applicant: [
            { label: 'Home', path: 'home' },
            { label: 'Dashboard', path: 'applicant-dashboard' },
            { label: 'Find Job', path: 'jobs' },
            { label: 'Companies', path: 'companies' },
            { label: 'Contact Us', path: 'support' },
        ],
    };

    const currentNavItems = navItems[userType];

    const isActive = (path: string): boolean => {
        const paths = location.pathname.split('/');
        return paths[paths.length - 1] == path;
    }

    return (
        <Box component="header" sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
            {/* Top Navigation */}
            <Box
                sx={{
                    bgcolor: 'background.level1',
                    boxShadow: 'md',
                    py: 1
                }}
            >
                <Stack
                    component={Container}
                    maxWidth='xl'
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ minHeight: '48px' }}
                >
                    <Stack direction="row" alignItems="center" spacing={2}>
                        {/* Mobile Menu Button */}
                        <IconButton
                            onClick={() => setMobileOpen(!mobileOpen)}
                            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <BrandLogo />
                    </Stack>

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
                                variant={isActive(item.path) ? 'soft' : 'plain'}
                                color={isActive(item.path) ? 'primary' : 'neutral'}
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

                    <Dropdown>
                        <MenuButton
                            slots={{ root: IconButton }}
                            slotProps={{
                                root: {
                                    variant: 'outline',
                                    sx: { p: 0 }
                                },
                            }}
                        >
                            {
                                userType == 'none'
                                    ? <User2 />
                                    : <Avatar
                                        size="md"
                                        variant="soft"
                                        src={getAvatar()}
                                    />
                            }
                        </MenuButton>
                        <Menu
                            sx={{
                                minWidth: 200,
                                bgcolor: 'background.surface',
                                borderRadius: 'md',
                                boxShadow: 'md',
                                p: 0,
                            }}>
                            <Stack sx={{ p: 1.5 }} spacing={1.5}>
                                {
                                    userType === 'none'
                                        ?
                                        <MenuItem
                                            onClick={() => navigate('/jobscape/register')}
                                            color='primary'
                                            variant='soft'
                                            sx={{
                                                borderRadius: 'sm',
                                                px: 2,
                                                '&:hover': {
                                                    bgcolor: 'background.level2'
                                                }
                                            }}
                                        >
                                            <UserRoundPlus size={18} />
                                            <Typography textColor='inherit' sx={{ ml: 1, fontWeight: 'md' }}> Register</Typography>
                                        </MenuItem>
                                        : <>
                                            <MenuItem
                                                onClick={() => navigate('/jobscape/profile')}
                                                sx={{
                                                    borderRadius: 'sm',
                                                    px: 2,
                                                    '&:hover': {
                                                        bgcolor: 'background.level2'
                                                    }
                                                }}
                                            >
                                                <User size={18} />
                                                <Typography sx={{ ml: 1, fontWeight: 'md' }}>Profile</Typography>
                                            </MenuItem>
                                            <MenuItem
                                                onClick={onLogout}
                                                color="danger"
                                                sx={{
                                                    borderRadius: 'sm',
                                                    px: 2,
                                                    '&:hover': {
                                                        bgcolor: 'danger.softHoverBg'
                                                    }
                                                }}
                                            >
                                                <LogOut size={18} />
                                                <Typography sx={{ ml: 1, fontWeight: 'md' }}>Logout</Typography>
                                            </MenuItem>
                                        </>
                                }
                                <MenuItem
                                    onClick={toggleColorMode}
                                    sx={{
                                        borderRadius: 'sm',
                                        px: 2,
                                        '&:hover': {
                                            bgcolor: 'background.level2'
                                        }
                                    }}
                                >
                                    {mode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                                    <Typography sx={{ ml: 1, fontWeight: 'md' }}> {mode === 'light' ? "Dark Mode" : "Light Mode"}</Typography>
                                </MenuItem>
                            </Stack>
                        </Menu>
                    </Dropdown>
                </Stack>
            </Box>

            {/* Mobile Menu */}
            <Sheet
                variant="soft"
                sx={{
                    display: { xs: mobileOpen ? 'block' : 'none', md: 'none' },
                    position: 'fixed',
                    top: '80px',
                    left: '16px',
                    width: 'calc(100% - 32px)',
                    bgcolor: 'background.surface',
                    maxWidth: '320px',
                    borderRadius: 'md',
                    boxShadow: 'md',
                    zIndex: 1000,
                    overflow: 'hidden',
                    animation: mobileOpen ? 'slideIn 0.2s ease-out' : 'none',
                    '@keyframes slideIn': {
                        from: {
                            opacity: 0,
                            transform: 'translate(0, -20px)'
                        },
                        to: {
                            opacity: 1,
                            transform: 'translate(0, 0)'
                        }
                    }
                }}
            >
                <Box sx={{ p: 1.5 }}>
                    <Stack spacing={1.5}>
                        {currentNavItems.map((item) => (
                            <Button
                                key={item.path}
                                component={RouterLink}
                                to={item.path}
                                variant={location.pathname === item.path ? 'soft' : 'plain'}
                                color={location.pathname === item.path ? 'primary' : 'neutral'}
                                fullWidth
                                size="sm"
                                sx={{
                                    justifyContent: 'flex-start',
                                    px: 2,
                                    py: 1,
                                    borderRadius: 'md',
                                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                                    '&:hover': {
                                        bgcolor: 'background.level2'
                                    }
                                }}
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Stack>
                </Box>
            </Sheet>
        </Box>
    );
};

export default Navbar;