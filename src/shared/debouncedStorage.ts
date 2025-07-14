import { createJSONStorage } from "zustand/middleware";
import debounce from "lodash/debounce";

// Custom storage helper for Zustand that debounces writes using lodash
const createDebouncedStorage = (delay: number = 3000) => {
    let pendingData: any = null;

    const actualSave = (key: string, data: any) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            console.log('Auto-saved to localStorage');
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    };

    const debouncedSave = debounce((key: string, data: any) => {
        actualSave(key, data);
        pendingData = null;
    }, delay);

    return createJSONStorage(() => ({
        getItem: (key: string) => {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        },
        setItem: (key: string, value: any) => {
            pendingData = value;
            debouncedSave(key, pendingData);
        },
        removeItem: (key: string) => {
            localStorage.removeItem(key);
            debouncedSave.cancel();
            pendingData = null;
        },
    }));
};

export default createDebouncedStorage;
