import { v4 as uuidv4 } from 'uuid';
import { ResumeModel } from './interfaces';
import { isValidResumeModel } from './validateJson';

export const generateUniqueId = (): string => {
    return uuidv4();
};

export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
    });
};

export const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(phone);
};

export const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

export const sortByDate = <T extends { startDate: string }>(array: T[], ascending: boolean = true): T[] => {
    return [...array].sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return ascending ? dateA - dateB : dateB - dateA;
    });
};

export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<F>): Promise<ReturnType<F>> => {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        return new Promise(resolve => {
            timeout = setTimeout(() => resolve(func(...args)), waitFor);
        });
    };
};

export const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();
};

export const importJSON = (file: File): Promise<ResumeModel> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);

                // Validate the JSON against our ResumeModel interface
                if (isValidResumeModel(json)) {
                    resolve(json);
                } else {
                    reject(new Error('Invalid JSON structure. Please ensure it matches the required format.'));
                }
            } catch (error) {
                reject(new Error('Error parsing JSON file.'));
            }
        };

        reader.onerror = () => {
            reject(new Error('Error reading file.'));
        };

        reader.readAsText(file);
    });
};
