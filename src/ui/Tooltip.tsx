import { cn } from '@/shared/cn';
import { Tooltip as BaseTooltip } from '@base-ui-components/react/tooltip';
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
 * A reusable tooltip component built on Base UI's Tooltip primitive.
 * Automatically provides the TooltipProvider context.
 */
const Tooltip = ({
    children,
    content,
    side = "top",
    align = "center",
    sideOffset = 8,
    className,
    contentClassName,
    open,
    defaultOpen,
    onOpenChange
}: TooltipProps) => {
    return (
        <BaseTooltip.Provider delay={700}>
            <BaseTooltip.Root
                open={open}
                defaultOpen={defaultOpen}
                onOpenChange={onOpenChange}
            >
                <BaseTooltip.Trigger className={className}>
                    {children}
                </BaseTooltip.Trigger>
                <BaseTooltip.Portal>
                    <BaseTooltip.Positioner
                        side={side}
                        align={align}
                        sideOffset={sideOffset}
                    >
                        <BaseTooltip.Popup
                            className={cn(
                                "z-50 max-w-xs rounded bg-neutral-700 px-3 py-2 text-xs text-white shadow-lg backdrop-blur-sm animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
                                contentClassName
                            )}
                        >
                            {content}
                            <BaseTooltip.Arrow className="fill-neutral-700" />
                        </BaseTooltip.Popup>
                    </BaseTooltip.Positioner>
                </BaseTooltip.Portal>
            </BaseTooltip.Root>
        </BaseTooltip.Provider>
    );
};

export default Tooltip;