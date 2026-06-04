import { X } from "lucide-react";
import type { ReactNode } from "react";
import { createPortal } from 'react-dom';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    showClose: boolean
};

export function GlobalModal({ isOpen, onClose, children, showClose = true }: Props) {

    const handleBackdrop = () => {
        if (!showClose) return;
        onClose();
    }

    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 transition-opacity duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            onClick={handleBackdrop}
        >
            <div
                className={`relative bg-white dark:bg-neutral-900 w-full md:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl md:rounded-2xl p-4 md:p-6 transform shadow-xl ${isOpen ? "translate-y-0 md:scale-100" : "translate-y-full md:scale-95"}`}
                onClick={e => e.stopPropagation()}
            >
                {showClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}

                {children}
            </div>
        </div>,
        document.getElementById('portal-root')!
    );
}
