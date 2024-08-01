import React from 'react';
import Signup from '../../../components/Signup';
import { Divider, IconButton, Stack, Typography, useTheme } from '@mui/joy';
import { CircleArrowLeft, Wallet } from 'lucide-react';
import { Spacer } from '../../../components/Spacer';
import { Link as RouterLink } from 'react-router-dom';


const Header: React.FC = () => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Stack direction='row' alignItems='center' spacing={1}
            sx={{
                boxShadow: 'sm',
                width: 1,
                py: 1, px: 2,
                backdropFilter: isDark ? 'brightness(0.6)' : 'contrast(0.9)'
            }}>
            <IconButton
                children={<CircleArrowLeft />}
                component={RouterLink}
                to="/" />
            <Divider orientation="vertical" />
            <Typography
                level="h4"
                component={RouterLink}
                to=""
                sx={{ cursor: 'pointer' }}
                startDecorator={<Wallet />}>
                Budget Planner
            </Typography>
            <Spacer />
            <Signup />
        </Stack>
    );
}

export default Header;