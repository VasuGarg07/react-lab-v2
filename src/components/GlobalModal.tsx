import { X } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export function GlobalModal({ isOpen, onClose, children }: Props) {
    return (
        <div
            className={`fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 transition-opacity duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
            {/* Backdrop click closes modal */}
            <div className="absolute inset-0" onClick={onClose}></div>

            {/* Modal container */}
            <div
                className={`relative bg-white dark:bg-neutral-900 w-full md:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl md:rounded-2xl p-4 md:p-6 transform transition-all duration-300 shadow-xl ${isOpen ? "translate-y-0 md:scale-100" : "translate-y-full md:scale-95"}`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5" />
                </button>

                {children}
            </div>
        </div>
    );
}