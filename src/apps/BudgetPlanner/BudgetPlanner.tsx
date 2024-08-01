import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { ModalProvider } from './contexts/ModalProvider';
import { Box, Stack, useTheme } from '@mui/joy';
import { useMediaQuery } from 'react-responsive';
import Navigation from './components/Navigation'

const BudgetPlanner: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery({ query: `(max-width: ${theme.breakpoints.values.sm}px)` });

    return (
        <Provider store={store}>
            <ModalProvider>
                <Stack direction={isMobile ? 'column-reverse' : 'row'}>
                    <Navigation isMobile={isMobile} />
                    <Box sx={{
                        width: 1,
                        height: `calc(100dvh - ${isMobile ? 104 : 52}px)`,
                        overflowY: 'auto'
                    }}>
                        <Outlet />
                        <ScrollRestoration />
                    </Box>
                </Stack>
            </ModalProvider>
        </Provider>
    )
}

export default BudgetPlanner