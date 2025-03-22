import React from 'react';
import ImageSection from '@/apps/Pokeverse/components/ImageSection';
import { GRADIENTS } from '@/apps/Pokeverse/helpers/constant';
import { useNavigate } from 'react-router';

const Pokeverse: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-[calc(100vh-54px)] md:flex-row">
            {/* Pokedex Section */}
            <div className="flex-1 h-1/2 md:h-full">
                <ImageSection
                    backgroundImage="/backgrounds/pokedex.jpg"
                    buttonText="Perfect Pokédex"
                    onButtonClick={() => navigate('pokedex')}
                    gradientColors={GRADIENTS.blue}
                />
            </div>

            {/* Battle Simulator Section */}
            <div className="flex-1 h-1/2 md:h-full">
                <ImageSection
                    backgroundImage="/backgrounds/battle-sim.webp"
                    buttonText="Battle Simulator"
                    onButtonClick={() => navigate('battle-sim')}
                    gradientColors={GRADIENTS.ruby}
                />
            </div>
        </div>
    );
};

export default Pokeverse;