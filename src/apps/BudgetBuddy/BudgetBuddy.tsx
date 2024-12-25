import { Box, useColorScheme } from '@mui/joy';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import BudgetProvider from './BudgetContext';
import AuthPrompt from './components/AuthPrompt';
import SideNav from './components/SideNav';

const BudgetBuddy: React.FC = () => {

    const { mode } = useColorScheme();
    const { isLoggedIn } = useAuth();
    const [mobileOpen, setMobileOpen] = React.useState(false);


    if (!isLoggedIn) {
        return <AuthPrompt mode={mode} />
    }

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 52px)',
                background: mode === 'light'
                    ? `
                        radial-gradient(circle at 30% 20%, rgba(0, 255, 179, 0.2), transparent 70%),
                        radial-gradient(circle at 70% 80%, rgba(30, 255, 0, 0.2), transparent 70%),
                        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.4), transparent 70%)
                      `
                    : `
                        radial-gradient(circle at 30% 20%, rgba(0, 70, 29, 0.4), transparent 70%),
                        radial-gradient(circle at 70% 80%, rgba(3, 100, 93, 0.4), transparent 70%),
                        radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.4), transparent 70%)
                      `,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' }
            }}>
            <SideNav
                mobileOpen={mobileOpen}
                onMobileToggle={() => setMobileOpen(!mobileOpen)}
            />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { sm: 'calc(100% - 280px)' },
                    minHeight: 'calc(100vh - 52px)',
                    height: { xs: 'auto', sm: 'calc(100vh - 52px)' },
                    overflow: 'auto'
                }}
            >
                <BudgetProvider>
                    <Outlet />
                </BudgetProvider>
            </Box>
        </Box>
    )
}

export default BudgetBuddy;