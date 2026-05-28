import { Menu as MenuIcon, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

export type NavLink = {
    name: string;
    path: string;
    icon: LucideIcon;
}

interface NavMenuProps {
    links: NavLink[];
    className?: string;
}

export function NavMenu({ links, className = '' }: NavMenuProps) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [open]);

    return (
        <div className={`relative ${className}`} ref={menuRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200 border border-neutral-300 dark:border-neutral-700"
                aria-haspopup="true"
                aria-expanded={open}
                aria-label="Menu"
            >
                <MenuIcon className="w-4 h-4" />
            </button>

            {open && (
                <div className="absolute left-0 mt-2 min-w-48 bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-800 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 mx-1 rounded-md px-3 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-150"
                        >
                            <link.icon size={16} className="text-blue-600 dark:text-blue-500" />
                            <span>{link.name}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
