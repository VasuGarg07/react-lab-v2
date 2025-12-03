/**
 * Strip HTML tags from content
 */
const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, '');
};

/**
 * Truncate content to a specified length
 */
export const truncateContent = (
    content: string,
    maxLength = 150,
    stripTags = true
): string => {
    const cleanContent = stripTags ? stripHtml(content) : content;
    if (cleanContent.length <= maxLength) return cleanContent;
    return cleanContent.substring(0, maxLength).trim() + '...';
};

/**
 * Calculate estimated reading time
 */
export const calculateReadTime = (content: string, wordsPerMinute = 200): number => {
    const text = stripHtml(content);
    const wordCount = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

/**
 * Generate DiceBear avatar URL
 */
export const generateAvatarUrl = (seed: string): string => {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}`;
};

/**
 * Generate placeholder cover image URL
 */
export const generatePlaceholderCover = (title: string): string => {
    const encoded = encodeURIComponent(title.slice(0, 30));
    return `https://placehold.co/800x400/e5e5e5/737373?text=${encoded}`;
};

/**
 * Validate image URL format
 */
export const isValidImageUrl = (url: string): boolean => {
    try {
        const parsed = new URL(url);

        // Check for valid HTTP/HTTPS protocol
        if (!['http:', 'https:'].includes(parsed.protocol)) {
            return false;
        }

        // Allow common image hosting domains without extension check
        const trustedDomains = [
            'images.unsplash.com',
            'unsplash.com',
            'cdn.pixabay.com',
            'images.pexels.com',
            'i.imgur.com',
            'cloudinary.com',
            'cloudfront.net',
            'amazonaws.com',
        ];

        if (trustedDomains.some(domain => parsed.hostname.includes(domain))) {
            return true;
        }

        // For other URLs, check file extension
        return /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(parsed.pathname);
    } catch {
        return false;
    }
};

/**
 * Get blog count label
 */
export const getBlogCountLabel = (count: number): string => {
    if (count === 0) return 'No blogs';
    if (count === 1) return '1 blog';
    return `${count} blogs`;
};