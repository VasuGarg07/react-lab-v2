import React, { ReactNode } from 'react';
import { Menu as BaseMenu } from '@base-ui-components/react/menu';
import { cn } from '@/shared/cn';

interface DropdownMenuItem {
    label: string;
    icon?: ReactNode;
    onClick: () => void;
    variant?: 'default' | 'warning' | 'danger';
    disabled?: boolean;
}

interface DropdownMenuProps {
    trigger: ReactNode;
    items: DropdownMenuItem[];
    align?: 'start' | 'center' | 'end';
    side?: 'top' | 'right' | 'bottom' | 'left';
    sideOffset?: number;
    className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
    trigger,
    items,
    align = 'end',
    side = 'bottom',
    sideOffset = 8,
    className
}) => {
    return (
        <BaseMenu.Root>
            <BaseMenu.Trigger className={className}>
                {trigger}
            </BaseMenu.Trigger>

            <BaseMenu.Portal>
                <BaseMenu.Positioner side={side} align={align} sideOffset={sideOffset}>
                    <BaseMenu.Popup
                        className={cn(
                            "min-w-[160px] rounded-lg border bg-white dark:bg-slate-800 shadow-sm py-1 z-50",
                            "border-slate-200 dark:border-slate-700",
                            "data-[state=open]:animate-in data-[state=closed]:animate-out",
                            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                            "data-[side=bottom]:slide-in-from-top-2"
                        )}
                    >
                        {items.map((item, index) => (
                            <BaseMenu.Item
                                key={index}
                                onClick={item.onClick}
                                disabled={item.disabled}
                                className={cn(
                                    "flex items-center px-3 py-2 text-sm cursor-pointer outline-none transition-colors",
                                    "hover:bg-slate-100 dark:hover:bg-slate-700",
                                    "focus:bg-slate-100 dark:focus:bg-slate-700",
                                    "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
                                    // Variant styles
                                    item.variant === 'default' && "text-slate-700 dark:text-slate-200",
                                    item.variant === 'warning' && "text-amber-600 dark:text-amber-400",
                                    item.variant === 'danger' && "text-red-600 dark:text-red-400"
                                )}
                            >
                                {item.icon && (
                                    <span className="mr-2 flex-shrink-0">
                                        {item.icon}
                                    </span>
                                )}
                                <span>{item.label}</span>
                            </BaseMenu.Item>
                        ))}
                    </BaseMenu.Popup>
                </BaseMenu.Positioner>
            </BaseMenu.Portal>
        </BaseMenu.Root>
    );
};

export default DropdownMenu;