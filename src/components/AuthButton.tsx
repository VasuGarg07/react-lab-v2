import React from 'react';
import { Avatar, Dropdown, IconButton, Menu, MenuButton, MenuItem, Stack, Typography, Divider } from '@mui/joy';
import { LogIn, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const AuthButton: React.FC = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return (
            <IconButton
                color="neutral"
                variant="soft"
                onClick={() => navigate('/login')}
                sx={{
                    p: 0,
                    borderRadius: '50%',
                    '--IconButton-size': '40px',
                }}
            >
                <LogIn size={20} />
            </IconButton>
        );
    }

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{
                    root: {
                        color: 'neutral',
                        variant: 'soft',
                        sx: {
                            p: 0,
                            borderRadius: '50%',
                            '--IconButton-size': '40px',
                            '&:hover': {
                                background: 'background.body'
                            }
                        },
                    },
                }}
            >
                <Avatar
                    size="sm"
                    variant="soft"
                    src={user.photoURL ?? undefined}
                >
                    {!user.photoURL && user.displayName?.[0]?.toUpperCase()}
                </Avatar>
            </MenuButton>
            <Menu
                placement="bottom-end"
                size="sm"
                sx={{
                    minWidth: 240,
                    p: 1,
                    '--ListItem-radius': '8px',
                }}
            >
                <MenuItem
                    sx={{
                        py: 1.5,
                        alignItems: 'flex-start',
                        cursor: 'default',
                        '&:hover': {
                            backgroundColor: 'transparent'
                        }
                    }}
                >
                    <Stack spacing={1} direction="row" alignItems="center" width="100%">
                        <Avatar
                            size="lg"
                            variant="soft"
                            src={user.photoURL ?? undefined}
                        >
                            {!user.photoURL && user.displayName?.[0]?.toUpperCase()}
                        </Avatar>
                        <Stack spacing={0.5}>
                            <Typography level="title-sm">{user.displayName || 'User'}</Typography>
                            <Typography level="body-xs" sx={{ wordBreak: 'break-all' }}>
                                {user.email}
                            </Typography>
                        </Stack>
                    </Stack>
                </MenuItem>

                <Divider sx={{ my: 1 }} />

                <MenuItem
                    onClick={() => navigate('/profile')}
                    sx={{
                        py: 1,
                        gap: 1
                    }}
                >
                    <User size={18} />
                    <Typography level="body-sm">Profile</Typography>
                </MenuItem>

                <MenuItem
                    onClick={handleLogout}
                    color="danger"
                    sx={{
                        py: 1,
                        gap: 1
                    }}
                >
                    <LogOut size={18} />
                    <Typography level="body-sm">Sign out</Typography>
                </MenuItem>
            </Menu>
        </Dropdown>
    );
};

export default AuthButton;