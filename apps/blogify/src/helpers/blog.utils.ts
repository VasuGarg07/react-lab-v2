const stripHtml = (html: string): string => html.replace(/<[^>]*>/g, '');

export const truncateContent = (content: string, maxLength = 150, stripTags = true): string => {
    const cleanContent = stripTags ? stripHtml(content) : content;
    if (cleanContent.length <= maxLength) return cleanContent;
    return cleanContent.substring(0, maxLength).trim() + '...';
};

export const calculateReadTime = (content: string, wordsPerMinute = 200): number => {
    const text = stripHtml(content);
    const wordCount = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

export const generateAvatarUrl = (seed: string): string =>
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}`;

export const generatePlaceholderCover = (title: string): string => {
    const encoded = encodeURIComponent(title.slice(0, 30));
    return `https://placehold.co/800x400/e5e5e5/737373?text=${encoded}`;
};

export const isValidImageUrl = (url: string): boolean => {
    try {
        const parsed = new URL(url);
        if (!['http:', 'https:'].includes(parsed.protocol)) return false;

        const trustedDomains = [
            'images.unsplash.com', 'unsplash.com', 'cdn.pixabay.com',
            'images.pexels.com', 'i.imgur.com', 'cloudinary.com',
            'cloudfront.net', 'amazonaws.com',
        ];
        if (trustedDomains.some(domain => parsed.hostname.includes(domain))) return true;

        return /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(parsed.pathname);
    } catch {
        return false;
    }
};

export const getBlogCountLabel = (count: number): string => {
    if (count === 0) return 'No blogs';
    if (count === 1) return '1 blog';
    return `${count} blogs`;
};
