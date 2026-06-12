import { useEffect } from 'react';

/**
 * Warns the user (native browser confirm dialog) before they reload or navigate
 * away while `enabled` is true — used to protect unsaved invoice data.
 */
export const useUnloadGuard = (enabled: boolean) => {
    useEffect(() => {
        if (!enabled) return;

        const handler = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            // Required for the prompt to show in some browsers; the actual
            // message is fixed by the browser and cannot be customized.
            e.returnValue = '';
            return '';
        };

        window.addEventListener('beforeunload', handler);
        return () => window.removeEventListener('beforeunload', handler);
    }, [enabled]);
};
