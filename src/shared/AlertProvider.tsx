import { Snackbar, SnackbarProps } from '@mui/joy';
import { Ban } from 'lucide-react';
import React, { createContext, useContext, useState } from 'react';

interface AlertContextType {
    alert: (message: string, color?: SnackbarProps['color']) => void;
}

interface AlertProviderProps {
    children: React.ReactNode
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [color, setColor] = useState<SnackbarProps['color']>('neutral');

    const alert = (message: string, color: SnackbarProps['color'] = 'success') => {
        setColor(color);
        setMessage(message);
        setOpen(true);
    };

    return (
        <AlertContext.Provider value={{ alert }}>
            {children}
            <Snackbar
                autoHideDuration={3000}
                open={open}
                variant='solid'
                color={color}
                startDecorator={<Ban />}
                onClose={(_, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    }
                    setOpen(false);
                }}
            >
                {message}
            </Snackbar>
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within a AlertProvider');
    }
    return context;
};
