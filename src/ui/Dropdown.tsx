import { useEffect, useRef, useState, type ReactNode } from 'react';

export interface DropdownItem {
    label: string;
    icon?: ReactNode;
    onClick: () => void;
    destructive?: boolean;
    separatorBefore?: boolean;
}

interface DropdownProps {
    trigger: ReactNode;
    items: DropdownItem[];
    align?: 'left' | 'right';
    width?: string;
}

export default function Dropdown({ trigger, items, align = 'right', width = 'min-w-44' }: DropdownProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    const handleItemClick = (item: DropdownItem) => {
        item.onClick();
        setOpen(false);
    };

    return (
        <div className="relative" ref={ref}>
            <div onClick={() => setOpen(o => !o)}>{trigger}</div>

            {open && (
                <div
                    className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} top-full mt-2 ${width} bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-800 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200`}
                >
                    {items.map((item, i) => (
                        <div key={i}>
                            {item.separatorBefore && (
                                <hr className="my-1 border-neutral-200 dark:border-neutral-800" />
                            )}
                            <button
                                onClick={() => handleItemClick(item)}
                                className={`w-[calc(100%-0.5rem)] flex items-center gap-3 mx-1 px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                                    item.destructive
                                        ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100'
                                }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}