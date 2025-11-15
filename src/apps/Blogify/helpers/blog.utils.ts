/**
 * Strip HTML tags from content
 */
export const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, '');
};

/**
 * Truncate content to a specified length
 */
export const truncateContent = (
    content: string,
    maxLength: number = 150,
    stripTags: boolean = true
): string => {
    const cleanContent = stripTags ? stripHtml(content) : content;

    if (cleanContent.length <= maxLength) return cleanContent;

    return cleanContent.substring(0, maxLength).trim() + '...';
};

/**
 * Calculate estimated reading time
 */
export const calculateReadTime = (
    content: string,
    wordsPerMinute: number = 200
): number => {
    const text = stripHtml(content);
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);

    return Math.max(1, minutes); // Minimum 1 minute
};

/**
 * Generate DiceBear avatar URL
 */
export const generateAvatarUrl = (seed: string): string => {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}`;
};

/**
 * Validate image URL
 */
export const isValidImageUrl = (url: string): boolean => {
    try {
        const urlObj = new URL(url);
        return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(urlObj.pathname);
    } catch {
        return false;
    }
};

/**
 * Get first paragraph from HTML content
 */
export const getExcerpt = (html: string, maxLength: number = 200): string => {
    // Try to find first paragraph
    const pMatch = html.match(/<p[^>]*>(.*?)<\/p>/i);

    if (pMatch && pMatch[1]) {
        const text = stripHtml(pMatch[1]);
        return truncateContent(text, maxLength, false);
    }

    return truncateContent(html, maxLength, true);
};