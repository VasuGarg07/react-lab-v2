import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Dialog as RadixDialog } from 'radix-ui';
import React, { ReactNode } from 'react';

type DialogPosition =
    | 'left'
    | 'right'
    | 'center'
    | 'top'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';

type DialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    position?: DialogPosition;
    size?: DialogSize;
    showCloseButton?: boolean;
    title?: string;
    overlayClassName?: string;
    contentClassName?: string;
    hideBackdrop?: boolean;
    closeOnClickOutside?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
    isOpen,
    onClose,
    children,
    position = 'center',
    size = 'md',
    showCloseButton = true,
    title,
    overlayClassName = '',
    contentClassName = '',
    hideBackdrop = false,
    closeOnClickOutside = true,
}) => {
    // Size classes mapping
    const sizeClasses = {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'w-full h-full',
    };

    // Position classes and animations mapping
    const positionConfig: Record<DialogPosition, {
        containerClass: string,
        initial: any,
        animate: any,
        exit: any,
        transition: any
    }> = {
        left: {
            containerClass: 'fixed inset-y-0 left-0 p-4 flex items-center justify-start',
            initial: { x: -320, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            exit: { x: -320, opacity: 0 },
            transition: { type: 'spring', damping: 26, stiffness: 300 }
        },
        right: {
            containerClass: 'fixed inset-y-0 right-0 p-4 flex items-center justify-end',
            initial: { x: 320, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            exit: { x: 320, opacity: 0 },
            transition: { type: 'spring', damping: 26, stiffness: 300 }
        },
        center: {
            containerClass: 'fixed inset-0 p-4 flex items-center justify-center',
            initial: { scale: 0.95, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.95, opacity: 0 },
            transition: { type: 'spring', damping: 30, stiffness: 400 }
        },
        top: {
            containerClass: 'fixed inset-x-0 top-0 p-4 flex items-start justify-center',
            initial: { y: -100, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: -100, opacity: 0 },
            transition: { type: 'spring', damping: 26, stiffness: 300 }
        },
        bottom: {
            containerClass: 'fixed inset-x-0 bottom-0 p-4 flex items-end justify-center',
            initial: { y: 100, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: 100, opacity: 0 },
            transition: { type: 'spring', damping: 26, stiffness: 300 }
        },
        'top-left': {
            containerClass: 'fixed top-0 left-0 p-4 flex items-start justify-start',
            initial: { x: -100, y: -100, opacity: 0 },
            animate: { x: 0, y: 0, opacity: 1 },
            exit: { x: -100, y: -100, opacity: 0 },
            transition: { type: 'spring', damping: 26, stiffness: 300 }
        },
        'top-right': {
            containerClass: 'fixed top-0 right-0 p-4 flex items-start justify-end',
            initial: { x: 100, y: -100, opacity: 0 },
            animate: { x: 0, y: 0, opacity: 1 },
            exit: { x: 100, y: -100, opacity: 0 },
            transition: { type: 'spring', damping: 26, stiffness: 300 }
        },
        'bottom-left': {
            containerClass: 'fixed bottom-0 left-0 p-4 flex items-end justify-start',
            initial: { x: -100, y: 100, opacity: 0 },
            animate: { x: 0, y: 0, opacity: 1 },
            exit: { x: -100, y: 100, opacity: 0 },
            transition: { type: 'spring', damping: 26, stiffness: 300 }
        },
        'bottom-right': {
            containerClass: 'fixed bottom-0 right-0 p-4 flex items-end justify-end',
            initial: { x: 100, y: 100, opacity: 0 },
            animate: { x: 0, y: 0, opacity: 1 },
            exit: { x: 100, y: 100, opacity: 0 },
            transition: { type: 'spring', damping: 26, stiffness: 300 }
        }
    };

    // Get position configuration
    const { containerClass, initial, animate, exit, transition } = positionConfig[position];

    return (
        <RadixDialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <RadixDialog.Portal>
                {!hideBackdrop && (
                    <RadixDialog.Overlay asChild>
                        <motion.div
                            className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm dark:bg-black/40 ${overlayClassName}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={closeOnClickOutside ? onClose : undefined}
                        />
                    </RadixDialog.Overlay>
                )}

                <RadixDialog.Content asChild>
                    <motion.div
                        className={`z-50 ${containerClass}`}
                        initial={initial}
                        animate={animate}
                        exit={exit}
                        transition={transition}
                    >
                        <div className={`bg-white/90 dark:bg-[#111827]/95 backdrop-blur-xl rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-[0_0_15px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col ${sizeClasses[size]} ${contentClassName}`}>
                            {(title || showCloseButton) && (
                                <div className="px-4 py-3 flex items-center justify-between shrink-0">
                                    {title && (
                                        <RadixDialog.Title className="text-base font-semibold text-neutral-900 dark:text-white">
                                            {title}
                                        </RadixDialog.Title>
                                    )}
                                    {showCloseButton && (
                                        <RadixDialog.Close asChild>
                                            <button
                                                className="p-1 rounded-md text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800/70 transition-colors"
                                                aria-label="Close"
                                            >
                                                <X size={16} />
                                            </button>
                                        </RadixDialog.Close>
                                    )}
                                </div>
                            )}

                            <div className="flex-1 overflow-auto scrollbar-thin flex flex-col min-h-0">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </RadixDialog.Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
};

export default Dialog;