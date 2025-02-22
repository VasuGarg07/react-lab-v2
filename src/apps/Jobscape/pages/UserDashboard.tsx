import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Container from '@mui/joy/Container';
import Typography from '@mui/joy/Typography';
import { Bookmark, Briefcase, Layers, LogOut, PlusCircle, Settings, Sparkles, UserCircle } from 'lucide-react';
import { NavLink, Outlet } from 'react-router';
import { useJobscape } from '../JobscapeProvider';
import CompactFooter from '../components/CompactFooter';
import JobNav from '../components/JobNav';
import { useAuth } from '../../../auth/AuthProvider';

const employerNavItems = [
    { icon: Layers, label: 'Overview', path: 'overview' },
    { icon: UserCircle, label: 'Employer Profile', path: 'profile' },
    { icon: PlusCircle, label: 'Post a Job', path: 'post-job' },
    { icon: Briefcase, label: 'My Jobs', path: 'jobs' },
    { icon: Settings, label: 'Settings', path: 'settings' }
];

const applicantNavItems = [
    { icon: Sparkles, label: 'Recommendations', path: 'recommendations' },
    { icon: Briefcase, label: 'Applied Jobs', path: 'applications' },
    { icon: UserCircle, label: 'Applicant Profile', path: 'profile' },
    { icon: Bookmark, label: 'Saved Jobs', path: 'saved-jobs' },
    { icon: Settings, label: 'Settings', path: 'settings' }
]

const UserDashboard: React.FC = () => {
    const { role } = useJobscape();
    const { logout } = useAuth();

    const renderNavItems = () => {
        const navItems = role === 'applicant' ? applicantNavItems : employerNavItems;

        return navItems.map(({ icon: Icon, label, path }) => (
            <NavLink
                key={path}
                to={`/jobscape/${role}/${path}`}
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
        ))
    }

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
                        {role === 'applicant' ? 'Applicant' : 'Employer'} Dashboard
                    </Typography>
                    {renderNavItems()}
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
                        }}
                        onClick={logout}
                    >
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

export default UserDashboard