import { Image } from '@/apps/SnapFind/snapfind.helper';
import { ExternalLink } from 'lucide-react';
import { FC, useState } from 'react';

interface ImageCardProps {
    image: Image;
}

const ImageCard: FC<ImageCardProps> = ({ image }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const navigateToExternalUrl = (url: string) => {
        if (url) {
            window.open(`https://www.instagram.com/${url}`, '_blank');
        }
    };

    return (
        <div className="group relative w-full overflow-hidden rounded-2xl">
            {/* Image placeholder */}
            {!isLoaded && (
                <div
                    className="absolute inset-0 w-full h-full animate-pulse"
                    style={{ backgroundColor: image.color || '#f3f4f6' }}
                />
            )}

            {/* Main image */}
            <img
                src={image.urls.regular}
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover rounded-2xl transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                alt={image.descripition || "Unsplash image"}
            />

            {/* Overlay - visible on hover */}
            <div
                className="absolute inset-0 p-4 flex flex-col justify-between bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ backgroundColor: `${image.color}a0` }}
            >
                {/* Top section with user info */}
                <div className="flex justify-between items-start">
                    <img
                        src={image.user.profile_image.large}
                        className="w-12 h-12 rounded-full border-2 border-white/70"
                        alt={image.user.name}
                    />

                    <button
                        onClick={() => navigateToExternalUrl(image.user.instagram_username)}
                        className="px-3 py-1 bg-white/90 dark:bg-black/60 text-xs font-medium rounded-lg text-neutral-800 dark:text-neutral-200 hover:bg-white/100 dark:hover:bg-black/80 transition-colors"
                    >
                        {image.user.name}
                    </button>
                </div>

                {/* Bottom section with actions */}
                <div className="flex justify-end z-10">
                    <a
                        href={image.links.download}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-green-600 hover:bg-green-700 transition-colors rounded-lg text-white shadow-md"
                    >
                        <ExternalLink size={16} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ImageCard;