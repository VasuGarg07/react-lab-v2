import { Button, Divider, IconButton, Sheet, Stack, Tooltip, useColorScheme } from "@mui/joy";
import { CircleGauge, Cog, Gem, LayoutList, Moon, Sun } from 'lucide-react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Spacer } from '../../../components/Spacer';
import ThemeToggle from '../../../components/ThemeToggle';

interface NavigationProps {
    isMobile: boolean
}


interface LinkBtnProps {
    path: string,
    label: string,
    icon: React.ReactNode,
    isMobile: boolean
}

const NavLinks: Omit<LinkBtnProps, 'isMobile'>[] = [
    { path: '', label: 'Dashboard', icon: <CircleGauge size={20} /> },
    { path: 'budgets', label: 'Budgets', icon: <LayoutList size={20} /> },
    { path: 'investments', label: 'Investments', icon: <Gem size={20} /> },
    { path: 'settings', label: 'Settings', icon: <Cog size={20} /> }
];

const Navigation: React.FC<NavigationProps> = ({ isMobile }) => {
    const { mode, setMode } = useColorScheme();

    const switchTheme = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    }

    const Separator = () => {
        return <Divider orientation={!isMobile ? "horizontal" : "vertical"} />
    }

    return (
        <Stack
            direction={isMobile ? 'row' : 'column'}
            divider={<Separator />}
            component={Sheet}
            sx={{
                ...(isMobile && {
                    p: 1,
                    borderRadius: '16px 16px 0 0'
                }),
                alignItems: "center",
                justifyContent: "space-evenly"
            }}>
            {NavLinks.slice(0, NavLinks.length - 1).map((link, idx) => (
                <NavBtn
                    key={idx}
                    path={link.path}
                    label={link.label}
                    icon={link.icon}
                    isMobile={isMobile} />
            ))}
            {!isMobile && <Spacer />}
            {
                isMobile ? (
                    <ThemeToggle />
                ) : (
                    <Button
                        startDecorator={
                            mode == 'light'
                                ? <Moon size={20} />
                                : <Sun size={20} />
                        }
                        variant='plain'
                        color='neutral'
                        onClick={switchTheme}
                        sx={{
                            justifyContent: 'flex-start',
                            px: 3, py: 1.5, width: 180,
                            borderRadius: 0
                        }}
                    >
                        {mode == 'light' ? 'Dark' : 'Light'} Mode
                    </Button>
                )
            }
            <NavBtn path={NavLinks[NavLinks.length - 1].path}
                label={NavLinks[NavLinks.length - 1].label}
                icon={NavLinks[NavLinks.length - 1].icon}
                isMobile={isMobile} />
        </Stack>
    )
}

export default Navigation;

const NavBtn: React.FC<LinkBtnProps> = ({ path, label, icon, isMobile }) => {
    if (isMobile) {
        return (
            <Tooltip title={label} variant="soft">
                <IconButton component={RouterLink} to={path}>
                    {icon}
                </IconButton>
            </Tooltip>
        )
    }

    return (
        <Button
            startDecorator={icon}
            variant='plain'
            component={RouterLink}
            to={path}
            color='neutral'
            sx={{
                justifyContent: 'flex-start',
                px: 3, py: 1.5, width: 1,
                borderRadius: 0
            }}
        >
            {label}
        </Button>
    )
}
