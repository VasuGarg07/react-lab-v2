import React from 'react';
import { Image } from '@/apps/SnapFind/snapfind.helper';
import ImageCard from '@/apps/SnapFind/ImageCard';

interface GalleryProps {
    images: Image[];
}

const ImageGallery: React.FC<GalleryProps> = ({ images }) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
                {images.map(item => (
                    <div
                        key={item.id}
                        className="mb-4 break-inside-avoid inline-block w-full transform hover:-translate-y-1 transition-transform duration-200"
                    >
                        <div className="bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow hover:shadow-md">
                            <ImageCard image={item} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;