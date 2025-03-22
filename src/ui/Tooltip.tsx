import { cn } from '@/shared/cn';
import { Tooltip as RadixTooltip } from 'radix-ui';
import { ReactNode } from 'react';

interface TooltipProps {
    children: ReactNode;
    content: ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    className?: string;
    contentClassName?: string;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}

/**
 * A reusable tooltip component built on Radix UI's Tooltip primitive.
 * Automatically provides the TooltipProvider context.
 */
const Tooltip = ({
    children,
    content,
    side = "top",
    align = "center",
    sideOffset = 5,
    className,
    contentClassName,
    open,
    defaultOpen,
    onOpenChange
}: TooltipProps) => {
    return (
        <RadixTooltip.Provider delayDuration={300}>
            <RadixTooltip.Root
                open={open}
                defaultOpen={defaultOpen}
                onOpenChange={onOpenChange}
            >
                <RadixTooltip.Trigger asChild className={className}>
                    {children}
                </RadixTooltip.Trigger>
                <RadixTooltip.Portal>
                    <RadixTooltip.Content
                        side={side}
                        align={align}
                        sideOffset={sideOffset}
                        className={cn(
                            "z-50 overflow-hidden",
                            "max-w-xs rounded-lg",
                            "bg-white/95 dark:bg-neutral-800/95",
                            "text-neutral-900 dark:text-neutral-100",
                            "p-3 text-xs",
                            "shadow-lg",
                            "border border-neutral-200 dark:border-neutral-700",
                            "backdrop-blur-sm",
                            "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                            contentClassName
                        )}
                    >
                        {content}
                        <RadixTooltip.Arrow className="fill-white/95 dark:fill-neutral-800/95" />
                    </RadixTooltip.Content>
                </RadixTooltip.Portal>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    );
};

export default Tooltip;