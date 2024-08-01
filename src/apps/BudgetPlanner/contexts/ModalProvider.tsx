// context/ModalContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Modal, ModalDialog, ModalClose } from '@mui/joy';

interface ModalContextProps {
    showModal: (title: string, component: ReactNode) => void;
    hideModal: () => void;
    modalTitle: string | null;
    modalComponent: ReactNode;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modalTitle, setModalTitle] = useState<string | null>(null);
    const [modalComponent, setModalComponent] = useState<ReactNode>(null);

    const showModal = (title: string, component: ReactNode) => {
        setModalTitle(title);
        setModalComponent(component);
    };

    const hideModal = () => {
        setModalTitle(null);
        setModalComponent(null);
    };

    return (
        <ModalContext.Provider value={{ showModal, hideModal, modalTitle, modalComponent }}>
            {children}
            <Modal open={!!modalTitle} onClose={hideModal}>
                <ModalDialog>
                    <ModalClose />
                    <h2>{modalTitle}</h2>
                    {modalComponent}
                </ModalDialog>
            </Modal>
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
