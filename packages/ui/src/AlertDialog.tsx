import { type ReactNode, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useModal } from './ModalContext';

interface AlertDialogProps {
    title?: string;
    message: string | ReactNode;
    cancelText?: string;
    confirmText?: string;
    onConfirm: () => void | Promise<void>;
}

export function AlertDialog({
    title,
    message,
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    onConfirm,
}: AlertDialogProps) {
    const { close } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            await onConfirm();
            close();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-2">
            <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-neutral-600" />
                </div>
            </div>

            <h3 className="text-lg font-bold text-neutral-900 text-center mb-2">
                {title}
            </h3>

            <div className="text-sm text-neutral-600 text-center mb-6">
                {message}
            </div>

            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={close}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {cancelText}
                </button>
                <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {confirmText}
                </button>
            </div>
        </div>
    );
}

export const openAlertDialog = (
    modal: ReturnType<typeof useModal>,
    props: AlertDialogProps
) => {
    modal.open(<AlertDialog {...props} />);
};