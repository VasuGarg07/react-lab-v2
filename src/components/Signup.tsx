// src/components/Signup.tsx
import {
    Dropdown,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    Avatar,
    Typography,
    Divider,
    Box
} from '@mui/joy';
import { LogIn, User, LogOut } from 'lucide-react';
import React from 'react';
import { navigate } from '@/shared/Router';
import { useAuth } from '@/auth/AuthProvider';

const Signup: React.FC = () => {
    const { isLoggedIn, user, logout } = useAuth();

    if (!isLoggedIn) {
        return (
            <IconButton
                size="sm"
                variant="plain"
                onClick={() => navigate('/auth/login')}
            >
                <LogIn />
            </IconButton>
        );
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{
                    root: {
                        variant: 'plain',
                        sx: { p: 0 }
                    },
                }}
            >
                <Avatar
                    size="sm"
                    variant="solid"
                    sx={{
                        bgcolor: 'primary.solidBg',
                        color: 'primary.solidColor',
                        textTransform: 'uppercase'
                    }}
                >
                    {user?.username.charAt(0)}
                </Avatar>
            </MenuButton>
            <Menu sx={{ minWidth: 280 }}>
                <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                        <Avatar
                            size="md"
                            variant="solid"
                            sx={{
                                bgcolor: 'primary.solidBg',
                                color: 'primary.solidColor',
                                textTransform: 'uppercase'
                            }}
                        >
                            {user?.username.charAt(0)}
                        </Avatar>
                        <Box>
                            <Typography level="title-sm">{user?.username}</Typography>
                            <Typography level="body-sm" sx={{ color: 'neutral.500' }}>
                                {user?.email}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem sx={{ borderRadius: 'sm' }} onClick={() => navigate('/profile')}>
                        <User size={18} />
                        <Typography sx={{ ml: 1 }}>Profile</Typography>
                    </MenuItem>
                    <MenuItem sx={{ borderRadius: 'sm' }} onClick={handleLogout} color="danger">
                        <LogOut size={18} />
                        <Typography sx={{ ml: 1 }}>Logout</Typography>
                    </MenuItem>
                </Box>
            </Menu>
        </Dropdown>
    );
};

export default Signup;