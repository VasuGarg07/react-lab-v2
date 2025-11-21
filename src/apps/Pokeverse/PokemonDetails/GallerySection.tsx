import { useState } from 'react';
import { getOfficialSprite, getOfficialSpriteShiny, getHomeSprite, getHomeSpriteShiny } from '../helpers/constants';
import type { Pokemon } from '../helpers/types';

interface GallerySectionProps {
    pokemon: Pokemon;
}

export default function GallerySection({ pokemon }: GallerySectionProps) {
    const [selectedImage, setSelectedImage] = useState(getOfficialSprite(pokemon.id));

    const spriteItems = [
        { label: 'Official Artwork', url: getOfficialSprite(pokemon.id), key: 'official' },
        { label: 'Official Shiny', url: getOfficialSpriteShiny(pokemon.id), key: 'official_shiny' },
        { label: 'Home', url: getHomeSprite(pokemon.id), key: 'home' },
        { label: 'Home Shiny', url: getHomeSpriteShiny(pokemon.id), key: 'home_shiny' },
    ];

    return (
        <div className="space-y-4">
            {/* Large Preview */}
            <div className="relative max-w-sm mx-auto aspect-square bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                <img
                    src={selectedImage}
                    alt={pokemon.name}
                    className="w-full h-full object-contain p-8"
                />
            </div>

            {/* Sprite Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {spriteItems.map((item) => (
                    <button
                        key={item.key}
                        onClick={() => setSelectedImage(item.url)}
                        className={`relative aspect-square rounded-lg border-2 transition-all duration-200 overflow-hidden ${selectedImage === item.url
                            ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-600'
                            }`}
                    >
                        <img
                            src={item.url}
                            alt={item.label}
                            className="w-full h-full object-contain p-2"
                        />
                        {selectedImage === item.url && (
                            <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10" />
                        )}
                    </button>
                ))}
            </div>

            {/* Selected Sprite Label */}
            <div className="text-center">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {spriteItems.find(item => item.url === selectedImage)?.label || 'Sprite'}
                </p>
            </div>
        </div>
    );
}