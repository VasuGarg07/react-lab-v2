import Box from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import Typography from '@mui/joy/Typography';
import { Briefcase, Layers, LogOut, PlusCircle, Settings, UserCircle, Users } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useJobscape } from '../JobscapeProvider';
import CompactFooter from '../components/CompactFooter';
import JobNav from '../components/JobNav';
import Button from '@mui/joy/Button';

const navItems = [
    { icon: Layers, label: 'Overview', path: 'overview' },
    { icon: UserCircle, label: 'Employer Profile', path: 'profile' },
    { icon: PlusCircle, label: 'Post a Job', path: 'post-job' },
    { icon: Briefcase, label: 'My Jobs', path: 'jobs' },
    { icon: Users, label: 'Saved Candidates', path: 'candidates' },
    { icon: Settings, label: 'Settings', path: 'settings' }
];


const EmployerDashboard: React.FC = () => {
    const { role } = useJobscape();

    return (
        <>
            <JobNav userType={role || 'none'} />
            <Container maxWidth="lg" sx={{
                display: 'flex'
            }}>

                <Box sx={{
                    width: '240px',
                    height: "calc(100vh - 120px)",
                    borderRight: '1px solid',
                    borderColor: "neutral.200"
                }}>
                    <Typography
                        level='body-sm'
                        sx={{
                            color: 'neutral.400',
                            textTransform: 'uppercase',
                            p: 2,
                        }}>
                        Employer Dashboard
                    </Typography>
                    {navItems.map(({ icon: Icon, label, path }) => (
                        <NavLink
                            key={path}
                            to={`/jobscape/employer/${path}`}
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '8px',
                                borderRadius: '4px 0 0 4px',
                                borderLeft: isActive ? '4px solid' : '',
                                color: isActive ? 'var(--joy-palette-primary-600)' : 'inherit',
                                backgroundColor: isActive ? 'var(--joy-palette-primary-50)' : 'transparent',
                                textDecoration: 'none',
                                '&:hover': {
                                    color: 'var(--joy-palette-primary-600)',
                                    backgroundColor: 'var(--joy-palette-primary-50)'
                                }
                            })}
                        >
                            <Icon size={20} />
                            {label}
                        </NavLink>
                    ))}
                    <Button
                        variant='plain'
                        color='danger'
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            gap: '12px',
                            padding: '8px',
                            borderRadius: '4px 0 0 4px',
                            '&:hover': {
                                borderLeft: '4px solid'
                            }
                        }}>
                        <LogOut size={20} />
                        Logout
                    </Button>
                </Box>

                {/* Main Content */}
                <Box sx={{
                    flex: 1,
                    p: 4,
                    height: "calc(100vh - 120px)",
                    overflow: 'auto',
                    scrollSnapType: 'y mandatory',
                    '&::-webkit-scrollbar': { display: 'none' }
                }}>
                    <Outlet />
                </Box>
            </Container>
            <CompactFooter />
        </>
    )
}

export default EmployerDashboard