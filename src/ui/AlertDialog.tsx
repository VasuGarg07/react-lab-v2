import React from 'react';
import { AlertDialog as BaseAlertDialog } from '@base-ui-components/react/alert-dialog';
import { cn } from '@/shared/cn';

interface AlertDialogProps {
    trigger: React.ReactNode;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
    cancelLabel?: string;
    confirmLabel?: string;
    className?: string;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
    trigger,
    title,
    message,
    onConfirm,
    onCancel,
    cancelLabel = 'Cancel',
    confirmLabel = 'Confirm',
    className
}) => {
    return (
        <BaseAlertDialog.Root>
            <BaseAlertDialog.Trigger>
                {trigger}
            </BaseAlertDialog.Trigger>

            <BaseAlertDialog.Portal>
                <BaseAlertDialog.Backdrop className="fixed inset-0 z-40 bg-black/40" />

                <BaseAlertDialog.Popup
                    className={cn(
                        "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
                        "w-full max-w-md rounded-lg border p-6 mx-4 sm:mx-0",
                        "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 shadow-md",
                        className
                    )}
                >
                    <BaseAlertDialog.Title className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {title}
                    </BaseAlertDialog.Title>

                    <BaseAlertDialog.Description className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                        {message}
                    </BaseAlertDialog.Description>

                    <div className="flex justify-end gap-3">
                        <BaseAlertDialog.Close
                            onClick={onCancel}
                            className={cn(
                                "px-4 py-2 text-sm font-medium rounded-lg",
                                "border border-gray-300 dark:border-zinc-600",
                                "text-gray-700 dark:text-gray-300",
                                "hover:bg-gray-50 dark:hover:bg-zinc-800"
                            )}
                        >
                            {cancelLabel}
                        </BaseAlertDialog.Close>

                        <BaseAlertDialog.Close
                            onClick={onConfirm}
                            className={cn(
                                "px-4 py-2 text-sm font-medium rounded-lg",
                                "bg-blue-600 text-white hover:bg-blue-700"
                            )}
                        >
                            {confirmLabel}
                        </BaseAlertDialog.Close>
                    </div>
                </BaseAlertDialog.Popup>
            </BaseAlertDialog.Portal>
        </BaseAlertDialog.Root>
    );
};

export default AlertDialog;