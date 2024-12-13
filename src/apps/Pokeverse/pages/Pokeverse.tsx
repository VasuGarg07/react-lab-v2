import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/joy';
import ImageSection from '../components/ImageSection';
import { GRADIENTS } from '../helpers/constant';
import { useNavigate } from 'react-router-dom';

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    // gap: '16px',
    // padding: '16px',
    height: 'calc(100vh - 52px)',

    '@media (min-width: 900px)': {
        flexDirection: 'row',
    },
});

const Section = styled(Box)({
    flex: 1,
    height: '100%',
});

const Pokeverse: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Section>
                <ImageSection
                    backgroundImage="/backgrounds/pokedex.jpg"
                    buttonText="Perfect Pokédex"
                    onButtonClick={() => navigate('pokedex')}
                    gradientColors={GRADIENTS.blue}
                />
            </Section>
            <Section>
                <ImageSection
                    backgroundImage="/backgrounds/battle-sim.webp"
                    buttonText="Battle Simulator"
                    onButtonClick={() => navigate('battle-sim')}
                    gradientColors={GRADIENTS.ruby}
                />
            </Section>
        </Container>
    )
}

export default Pokeverse