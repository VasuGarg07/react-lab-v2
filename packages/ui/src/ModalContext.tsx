import { createContext, useContext, useState, type ReactNode } from "react";
import { GlobalModal } from "./GlobalModal";

type ModalContextType = {
    open: (content: ReactNode, showClose?: boolean) => void;
    close: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error("useModal must be used within ModalProvider");
    return ctx;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [content, setContent] = useState<ReactNode | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [showClose, setShowClose] = useState(true);

    const open = (c: ReactNode, showClose: boolean = true) => {
        setShowClose(showClose);
        setContent(c);
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
        setTimeout(() => setContent(null), 200);
    };

    return (
        <ModalContext.Provider value={{ open, close }}>
            {children}
            <GlobalModal isOpen={isOpen} onClose={close} showClose={showClose}>
                {content}
            </GlobalModal>
        </ModalContext.Provider>
    );
};
