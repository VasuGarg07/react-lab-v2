// src/services/toast.ts
import { toast, ToastOptions, ToastPosition } from 'react-toastify';

interface CustomToastOptions extends Partial<ToastOptions> {
    position?: ToastPosition;
}

const defaultOptions: ToastOptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
};

export const toastService = {
    success: (message: string, options?: CustomToastOptions) =>
        toast.success(message, { ...defaultOptions, ...options }),

    error: (message: string, options?: CustomToastOptions) =>
        toast.error(message, { ...defaultOptions, ...options, }),

    warning: (message: string, options?: CustomToastOptions) =>
        toast.warning(message, { ...defaultOptions, ...options, }),

    info: (message: string, options?: CustomToastOptions) =>
        toast.info(message, { ...defaultOptions, ...options, }),

    message: (message: string, options?: CustomToastOptions) =>
        toast(message, { ...defaultOptions, ...options, })
} as const;