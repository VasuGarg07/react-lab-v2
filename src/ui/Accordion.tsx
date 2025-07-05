import React, { ReactNode } from 'react';
import { Collapsible as BaseCollapsible } from '@base-ui-components/react/collapsible';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/cn';

interface AccordionItemProps {
    value: string;
    trigger: ReactNode;
    children: ReactNode;
    isOpen?: boolean;
    onToggle?: () => void;
    className?: string;
    triggerClassName?: string;
    contentClassName?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
    trigger,
    children,
    isOpen,
    onToggle,
    className,
    triggerClassName,
    contentClassName
}) => {
    return (
        <BaseCollapsible.Root open={isOpen} onOpenChange={onToggle}>
            <div className={cn(
                "mb-2 rounded-md border border-slate-200 dark:border-slate-700 overflow-hidden",
                className
            )}>
                <BaseCollapsible.Trigger
                    className={cn(
                        "flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium transition-colors",
                        "text-slate-800 dark:text-slate-200",
                        "hover:bg-slate-50 dark:hover:bg-slate-800/50",
                        "focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-800/50",
                        triggerClassName
                    )}
                >
                    {trigger}
                    <ChevronDown
                        size={16}
                        className={cn(
                            "transform transition-transform duration-200",
                            isOpen && "rotate-180"
                        )}
                    />
                </BaseCollapsible.Trigger>

                <BaseCollapsible.Panel
                    className={cn(
                        "overflow-hidden text-sm",
                        "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top",
                        "data-[state=open]:animate-in data-[state=open]:slide-in-from-top"
                    )}
                >
                    <div className={cn(
                        "px-3 py-2 bg-slate-50/50 dark:bg-slate-900/50",
                        contentClassName
                    )}>
                        {children}
                    </div>
                </BaseCollapsible.Panel>
            </div>
        </BaseCollapsible.Root>
    );
};

type AccordionProps = {
    items: {
        value: string;
        trigger: ReactNode;
        content: ReactNode;
    }[];
    type?: 'single';
    defaultValue?: string;
    collapsible?: boolean;
    className?: string;
    itemClassName?: string;
    triggerClassName?: string;
    contentClassName?: string;
    onValueChange?: (value: string | string[]) => void;
};

const Accordion: React.FC<AccordionProps> = ({
    items,
    type = 'single',
    defaultValue,
    collapsible = true,
    className = '',
    itemClassName,
    triggerClassName,
    contentClassName,
    onValueChange,
}) => {
    const [openItems, setOpenItems] = React.useState<Set<string>>(() => {
        const initialOpen = new Set<string>();
        if (defaultValue) {
            initialOpen.add(defaultValue);
        }
        return initialOpen;
    });

    const handleToggle = (value: string) => {
        const newOpenItems = new Set(openItems);

        if (type === 'single') {
            // Single mode: only one item can be open
            if (openItems.has(value)) {
                // Close if already open and collapsible
                if (collapsible) {
                    newOpenItems.clear();
                }
            } else {
                // Open new item and close others
                newOpenItems.clear();
                newOpenItems.add(value);
            }
        } else {
            // Multiple mode: toggle individual items
            if (openItems.has(value)) {
                newOpenItems.delete(value);
            } else {
                newOpenItems.add(value);
            }
        }

        setOpenItems(newOpenItems);

        // Call onValueChange if provided
        if (onValueChange) {
            if (type === 'single') {
                const openValue = newOpenItems.size > 0 ? Array.from(newOpenItems)[0] : '';
                onValueChange(openValue);
            } else {
                onValueChange(Array.from(newOpenItems));
            }
        }
    };

    return (
        <div className={className}>
            {items.map((item) => (
                <AccordionItem
                    key={item.value}
                    value={item.value}
                    trigger={item.trigger}
                    isOpen={openItems.has(item.value)}
                    onToggle={() => handleToggle(item.value)}
                    className={itemClassName}
                    triggerClassName={triggerClassName}
                    contentClassName={contentClassName}
                >
                    {item.content}
                </AccordionItem>
            ))}
        </div>
    );
};

export { Accordion, AccordionItem };