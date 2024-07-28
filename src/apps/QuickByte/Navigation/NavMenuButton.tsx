import { useEffect, useState } from 'react';
import { Button, Sheet, Grid, Dropdown, MenuButton, Menu, useTheme, IconButton } from '@mui/joy';
import { areaList, categoryList } from '../utils/api';
import { ALPHABETS, TABS } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

interface MenuButtonProps {
    label: string;
    startDecorator: React.ReactNode;
    openMenu: string | null;
    handleOpenMenu: (label: string) => void;
    handleCloseMenu: () => void;
}

const NavMenuButton: React.FC<MenuButtonProps> = ({ label, startDecorator, openMenu, handleOpenMenu, handleCloseMenu }) => {
    const [items, setItems] = useState<string[]>([]);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMdDown = useMediaQuery({ query: `(max-width: ${theme.breakpoints.values.md}px)` });


    useEffect(() => {
        const fetchData = async () => {
            let array: string[] = [];
            try {
                switch (label) {
                    case 'Categories':
                        array = await categoryList();
                        break;
                    case 'Regionals':
                        array = await areaList();
                        break;
                    case 'Dictionary':
                        array = ALPHABETS;
                        break;
                    default:
                        break;
                }
                setItems(array);
            } catch (_) { }
        };

        fetchData();
    }, [label]);

    const handleRoute = (key: string) => {
        const path = TABS.find(tab => tab.name === label)?.path;
        navigate(`/recipe-haven/${path}/${key}`);
        handleCloseMenu();
    };

    return (
        <Dropdown
            open={openMenu === label}>
            {
                !isMdDown ? (
                    <MenuButton variant='plain'
                        onClick={() => handleOpenMenu(label)}
                        startDecorator={startDecorator}
                    >
                        {label}
                    </MenuButton>
                ) : (
                    <MenuButton
                        slots={{ root: IconButton }}
                        slotProps={{ root: { color: 'neutral' } }}
                    >
                        {startDecorator}
                    </MenuButton>
                )
            }

            <Menu>
                <Sheet
                    sx={{
                        p: 1,
                        backgroundColor: 'transparent',
                    }}
                >
                    <Grid container maxWidth={400} spacing={0.5} flexWrap='wrap' alignItems='center'>
                        {items.map(item => (
                            <Grid key={item}>
                                <Button variant='plain' color='warning' size='sm' onClick={() => handleRoute(item)}>
                                    {item}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Sheet>
            </Menu>
        </Dropdown>
    );
};

export default NavMenuButton;
