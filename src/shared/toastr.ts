// src/services/toast.ts
import { Toast } from '@base-ui-components/react/toast';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default';

// Toast manager instance that will be set by the provider
let toastManager: ReturnType<typeof Toast.useToastManager> | null = null;

export const setToastManager = (manager: ReturnType<typeof Toast.useToastManager>) => {
    toastManager = manager;
};

const createToastContent = (type: ToastType, message: string) => {
    const getTitle = (type: ToastType) => {
        switch (type) {
            case 'success':
                return 'Success';
            case 'error':
                return 'Error';
            case 'warning':
                return 'Warning';
            case 'info':
                return 'Info';
            default:
                return 'Notification';
        }
    };

    return {
        title: getTitle(type),
        description: message,
        type,
    };
};

export const toastService = {
    success: (message: string) => {
        if (toastManager) {
            toastManager.add(createToastContent('success', message));
        }
    },

    error: (message: string) => {
        if (toastManager) {
            toastManager.add(createToastContent('error', message));
        }
    },

    warning: (message: string) => {
        if (toastManager) {
            toastManager.add(createToastContent('warning', message));
        }
    },

    info: (message: string) => {
        if (toastManager) {
            toastManager.add(createToastContent('info', message));
        }
    },

    message: (message: string) => {
        if (toastManager) {
            toastManager.add(createToastContent('default', message));
        }
    },
} as const;

// Hook for components that want to use toast manager directly
export const useToast = () => {
    const manager = Toast.useToastManager();

    return {
        success: (message: string) => manager.add(createToastContent('success', message)),
        error: (message: string) => manager.add(createToastContent('error', message)),
        warning: (message: string) => manager.add(createToastContent('warning', message)),
        info: (message: string) => manager.add(createToastContent('info', message)),
        message: (message: string) => manager.add(createToastContent('default', message)),
    };
};