import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/joy';
import ImageSection from './components/ImageSection';
import { GRADIENTS } from './helpers/constant';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    // gap: '16px',
    height: 'calc(100vh - 52px)',
    // padding: '16px',

    '@media (min-width: 900px)': {  // md breakpoint in Joy UI
        flexDirection: 'row',
    },
});

const Section = styled(Box)({
    flex: 1,
    height: '100%',
});

const Pokeverse: React.FC = () => {
    return (
        <Container>
            <Section>
                <ImageSection
                    backgroundImage="/backgrounds/pokedex.jpg"
                    buttonText="Pokédex"
                    onButtonClick={() => console.log('Button 1 clicked')}
                    gradientColors={GRADIENTS.ocean}
                />
            </Section>
            <Section>
                <ImageSection
                    backgroundImage="/backgrounds/battle-sim.webp"
                    buttonText="Battle Simulator"
                    onButtonClick={() => console.log('Button 2 clicked')}
                    gradientColors={GRADIENTS.red}
                />
            </Section>
        </Container>
    )
}

export default Pokeverse