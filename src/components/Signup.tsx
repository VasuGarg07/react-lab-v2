import { Avatar, Dropdown, IconButton, Menu, MenuButton, MenuItem, Typography } from '@mui/joy'
import React from 'react'
import { MatIcon } from './Utils'
import { useAuth } from '../shared/AuthContext';

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
                            borderRadius: '50%'
                        }
                    }
                }}
            >
                {user
                    ? <Avatar
                        size='sm'
                        variant='soft'
                        srcSet={user.photoURL!}
                    >
                        {user.displayName}
                    </Avatar>
                    : <MatIcon icon='account_circle' />}
            </MenuButton>
            <Menu>
                {
                    user
                        ? <>
                            <MenuItem>
                                <Typography level='title-md'>{user.displayName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={signOut}>Logout</MenuItem>
                        </>
                        : <>
                            <MenuItem>Signin with Email</MenuItem>
                            <MenuItem onClick={signInWithGoogle}>Google SignIn</MenuItem>
                        </>
                }
            </Menu>
        </Dropdown >
    )
}

export default Signup