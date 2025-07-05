import { X } from 'lucide-react';
import { Dialog as BaseDialog } from '@base-ui-components/react/dialog';
import React, { ReactNode } from 'react';
import { cn } from '@/shared/cn';

type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

interface DialogProps {
    open: boolean;
    onClose: (open: boolean) => void;
    children: ReactNode;
    size?: DialogSize;
    title?: string;
    showCloseButton?: boolean;
    className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
    open,
    onClose,
    children,
    size = 'md',
    title,
    showCloseButton = true,
    className,
}) => {
    // Simplified size classes
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
    };

    return (
        <BaseDialog.Root open={open} onOpenChange={onClose}>
            <BaseDialog.Portal>
                <BaseDialog.Backdrop
                    className="fixed inset-0 z-40 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                />

                <BaseDialog.Popup
                    className={cn(
                        // Base positioning and z-index
                        "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",

                        // Size and layout - flex column for proper height distribution
                        "w-full max-h-[85vh] flex flex-col rounded-lg border",
                        sizeClasses[size],

                        // Colors and styling
                        "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm",

                        // Animations
                        "data-[state=open]:animate-in data-[state=closed]:animate-out",
                        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
                        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
                        "duration-200",

                        // Mobile responsive
                        "mx-4 sm:mx-0",

                        className
                    )}
                >
                    {/* Header */}
                    {(title || showCloseButton) && (
                        <div className="flex items-center justify-between p-2 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                            {title && (
                                <BaseDialog.Title className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    {title}
                                </BaseDialog.Title>
                            )}
                            {showCloseButton && (
                                <BaseDialog.Close
                                    className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                                    aria-label="Close"
                                >
                                    <X size={16} />
                                </BaseDialog.Close>
                            )}
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 overflow-auto min-h-0">
                        {children}
                    </div>
                </BaseDialog.Popup>
            </BaseDialog.Portal>
        </BaseDialog.Root>
    );
};

// Trigger component for external use
export const DialogTrigger = BaseDialog.Trigger;

export default Dialog;