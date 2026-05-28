import { marked } from 'marked';

export function shuffleArray<T>(array: T[]): T[] {
    const result = [...array]; // create a shallow copy to avoid mutating the original
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export const markdownToHtml = (text: string) => {
    return marked(text, {
        gfm: true,
        breaks: true,
    });
};

/**
 * Format a date string/timestamp to a readable format
 */
export const formatDate = (
    dateString: string | number | Date,
    format: 'short' | 'long' | 'relative' = 'short'
): string => {
    const date = new Date(dateString);

    if (format === 'relative') {
        return formatRelativeTime(date);
    }

    const options: Intl.DateTimeFormatOptions =
        format === 'long'
            ? { year: 'numeric', month: 'long', day: 'numeric' }
            : { year: 'numeric', month: 'short', day: 'numeric' };

    return date.toLocaleDateString('en-US', options);
};

/**
 * Format date as relative time (e.g., "2 days ago")
 */
export const formatRelativeTime = (date: Date | number): string => {
    const now = new Date();
    const targetDate = date instanceof Date ? date : new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;

    return formatDate(targetDate, 'short');
};


/**
 * Format currency in Indian Rupees
 */
export const formatCurrency = (
    amount: number,
    showDecimals: boolean = false
): string => {
    const formatted = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: showDecimals ? 2 : 0,
        maximumFractionDigits: showDecimals ? 2 : 0,
    }).format(amount);

    return formatted;
};
