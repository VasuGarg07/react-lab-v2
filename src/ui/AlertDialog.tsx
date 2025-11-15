import { type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useModal } from '../components/ModalContext';

interface AlertDialogProps {
    title: string;
    message: string | ReactNode;
    cancelText?: string;
    confirmText?: string;
    onConfirm: () => void;
    isLoading?: boolean;
}

export default function AlertDialog({
    title,
    message,
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    onConfirm,
    isLoading = false,
}: AlertDialogProps) {
    const { close } = useModal();

    const handleConfirm = () => {
        onConfirm();
        close();
    };

    return (
        <div className="py-2">
            {/* Icon */}
            <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
                </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 text-center mb-2">
                {title}
            </h3>

            {/* Message */}
            <div className="text-sm text-neutral-600 dark:text-neutral-400 text-center mb-6">
                {message}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={close}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {cancelText}
                </button>
                <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {confirmText}
                </button>
            </div>
        </div>
    );
}


// ==================== Helper function to open alert dialog ====================

/**
 * Helper function to open confirmation dialog
 */
export const openAlertDialog = (
    modal: ReturnType<typeof useModal>,
    props: Omit<AlertDialogProps, 'isLoading'>
) => {
    modal.open(<AlertDialog {...props} />);
};