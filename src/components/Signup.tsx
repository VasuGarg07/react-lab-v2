// src/components/Signup.tsx
import { Avatar, Dropdown, IconButton, Menu, MenuButton, MenuItem, Typography } from '@mui/joy';
import React from 'react';
import { useAuth } from '../shared/AuthContext';
import { LogIn } from 'lucide-react';

const Signup: React.FC = () => {
    const { user, signOut, signInWithGoogle } = useAuth();

    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{
                    root: {
                        color: 'neutral',
                        sx: {
                            padding: 0,
                            borderRadius: '50%',
                        },
                    },
                }}
            >
                {user ? (
                    <Avatar
                        size="sm"
                        variant="soft"
                        src={user.photoURL!}
                        children={user.displayName}
                    />
                ) : (
                    <LogIn />
                )}
            </MenuButton>
            <Menu>
                {user ? (
                    <>
                        <MenuItem>
                            <Typography level="title-md">{user.displayName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={signOut}>Logout</MenuItem>
                    </>
                ) : (
                    <>
                        {/* <MenuItem>Signin with Email</MenuItem> */}
                        <MenuItem onClick={signInWithGoogle}>Google SignIn</MenuItem>
                    </>
                )}
            </Menu>
        </Dropdown>
    );
};

export default Signup;
