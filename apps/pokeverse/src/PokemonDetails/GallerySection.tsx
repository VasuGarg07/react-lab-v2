import { useState } from 'react';
import { getOfficialSprite, getOfficialSpriteShiny, getHomeSprite, getHomeSpriteShiny } from '../helpers/constants';
import type { Pokemon } from '../helpers/types';

export default function GallerySection({ pokemon }: { pokemon: Pokemon }) {
    const [selectedImage, setSelectedImage] = useState(getOfficialSprite(pokemon.id));

    const spriteItems = [
        { label: 'Official Artwork', url: getOfficialSprite(pokemon.id), key: 'official' },
        { label: 'Official Shiny', url: getOfficialSpriteShiny(pokemon.id), key: 'official_shiny' },
        { label: 'Home', url: getHomeSprite(pokemon.id), key: 'home' },
        { label: 'Home Shiny', url: getHomeSpriteShiny(pokemon.id), key: 'home_shiny' },
    ];

    return (
        <div className="space-y-4">
            <div className="relative max-w-sm mx-auto aspect-square bg-white rounded-xl border border-silver/40 overflow-hidden">
                <img src={selectedImage} alt={pokemon.name} className="w-full h-full object-contain p-8" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {spriteItems.map((item) => (
                    <button
                        key={item.key}
                        onClick={() => setSelectedImage(item.url)}
                        className={`relative aspect-square rounded-lg border-2 transition-all duration-200 overflow-hidden ${selectedImage === item.url
                            ? 'border-crimson bg-crimson/5'
                            : 'border-silver/40 bg-white hover:border-silver'
                            }`}
                    >
                        <img src={item.url} alt={item.label} className="w-full h-full object-contain p-2" />
                    </button>
                ))}
            </div>
        </div>
    );
}
