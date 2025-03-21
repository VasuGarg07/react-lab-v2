import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tooltip from '@radix-ui/react-tooltip';
import { areaList, categoryList } from '@/apps/QuickByte/utils/recipe.api';
import { ALPHABETS, TABS } from '@/apps/QuickByte/utils/recipe.helpers';

interface MenuButtonProps {
    label: string;
    startDecorator: React.ReactNode;
    openMenu: string | null;
    handleOpenMenu: (label: string) => void;
    handleCloseMenu: () => void;
}

const NavMenuButton: React.FC<MenuButtonProps> = ({
    label,
    startDecorator,
    openMenu,
    handleOpenMenu,
    handleCloseMenu
}) => {
    const [items, setItems] = useState<string[]>([]);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile viewport on mount and window resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // md breakpoint in Tailwind
        };

        // Initial check
        checkMobile();

        // Add resize listener
        window.addEventListener('resize', checkMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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
        <DropdownMenu.Root open={openMenu === label} onOpenChange={(open) => {
            if (open) {
                handleOpenMenu(label);
            } else {
                handleCloseMenu();
            }
        }}>
            <Tooltip.Provider delayDuration={300}>
                <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                        <DropdownMenu.Trigger asChild>
                            {!isMobile ? (
                                <button
                                    className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                    onClick={() => handleOpenMenu(label)}
                                >
                                    <span className="text-amber-600 dark:text-amber-400">{startDecorator}</span>
                                    <span>{label}</span>
                                </button>
                            ) : (
                                <button
                                    className="flex items-center justify-center w-10 h-10 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                    onClick={() => handleOpenMenu(label)}
                                >
                                    <span className="text-amber-600 dark:text-amber-400">{startDecorator}</span>
                                </button>
                            )}
                        </DropdownMenu.Trigger>

                        <Tooltip.Portal>
                            <Tooltip.Content
                                className="bg-white dark:bg-zinc-800 text-sm px-3 py-1.5 rounded-lg shadow-md z-50 animate-fadeIn"
                                sideOffset={5}
                            >
                                {label}
                                <Tooltip.Arrow className="fill-white dark:fill-zinc-800" />
                            </Tooltip.Content>
                        </Tooltip.Portal>
                    </Tooltip.Trigger>
                </Tooltip.Root>
            </Tooltip.Provider>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="bg-white dark:bg-zinc-800 p-2 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-screen max-w-md overflow-hidden z-50 animate-slideDownAndFade"
                    sideOffset={5}
                >
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-1">
                        {items.map(item => (
                            <button
                                key={item}
                                onClick={() => handleRoute(item)}
                                className="px-3 py-2 text-sm text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-lg transition-colors text-left"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default NavMenuButton;