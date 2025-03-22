import React, { ReactNode } from 'react';
import { Accordion as RadixAccordion } from 'radix-ui';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
    value: string;
    trigger: ReactNode;
    children: ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ value, trigger, children }) => {
    return (
        <RadixAccordion.Item
            value={value}
            className="mb-2 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden"
        >
            <RadixAccordion.Header className="w-full">
                <RadixAccordion.Trigger className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                    {trigger}
                    <ChevronDown
                        size={16}
                        className="transform transition-transform duration-200 data-[state=open]:rotate-180"
                    />
                </RadixAccordion.Trigger>
            </RadixAccordion.Header>
            <RadixAccordion.Content className="overflow-hidden bg-neutral-50/50 dark:bg-neutral-900/50 text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="px-4 py-3">
                    {children}
                </div>
            </RadixAccordion.Content>
        </RadixAccordion.Item>
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
    onValueChange?: (value: string | string[]) => void;
};

const Accordion: React.FC<AccordionProps> = ({
    items,
    type = 'single',
    defaultValue,
    collapsible = true,
    className = '',
    onValueChange,
}) => {
    return (
        <RadixAccordion.Root
            type={type}
            defaultValue={defaultValue}
            collapsible={collapsible}
            className={className}
            onValueChange={onValueChange}
        >
            {items.map((item) => (
                <AccordionItem
                    key={item.value}
                    value={item.value}
                    trigger={item.trigger}
                >
                    {item.content}
                </AccordionItem>
            ))}
        </RadixAccordion.Root>
    );
};

export { Accordion, AccordionItem };