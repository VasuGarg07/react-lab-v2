import { MoreVertical } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export interface MenuAction {
    label: string;
    icon: ReactNode;
    onClick: () => void;
    variant?: 'default' | 'danger';
    disabled?: boolean;
}

interface OptionsMenuProps {
    actions: MenuAction[];
    className?: string;
}

export default function OptionsMenu({ actions, className = '' }: OptionsMenuProps) {
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
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpen((prev) => !prev);
                }}
                className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                aria-haspopup="true"
                aria-expanded={open}
                aria-label="Options"
            >
                <MoreVertical className="w-5 h-5" />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 min-w-48 bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-800 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {actions.map((action, index) => {
                        const isDanger = action.variant === 'danger';

                        return (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    action.onClick();
                                    setOpen(false);
                                }}
                                disabled={action.disabled}
                                className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${isDanger
                                        ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                    }`}
                            >
                                <span className="w-4 h-4">{action.icon}</span>
                                <span>{action.label}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}