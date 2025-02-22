import React from 'react';
import { Box, styled } from '@mui/joy';
import CustomButton from '@/apps/Pokeverse/components/CustomButton';

interface ImageSectionProps {
    backgroundImage: string;
    onButtonClick: () => void;
    buttonText: string;
    gradientColors?: {
        from: string;
        to: string;
    };
}

const Container = styled(Box)({
    position: 'relative',
    height: '100%',
    // borderRadius: '8px',
    overflow: 'hidden',

    '&:hover': {
        '& .background-image': {
            filter: 'grayscale(0)',
        },
        '& button': {
            padding: '8px 24px',
            transform: 'scale(1.2)',
        },
    },
});

const BackgroundImage = styled(Box)({
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'grayscale(1)',
    transition: 'all 0.3s ease',
});

const ButtonWrapper = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
});

const ImageSection: React.FC<ImageSectionProps> = ({
    backgroundImage,
    onButtonClick,
    buttonText,
    gradientColors = { from: '#1976d2', to: '#1565c0' }
}) => {
    return (
        <Container>
            <BackgroundImage
                className="background-image"
                sx={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <ButtonWrapper>
                <CustomButton
                    onClick={onButtonClick}
                    gradient={gradientColors}
                >
                    {buttonText}
                </CustomButton>
            </ButtonWrapper>
        </Container>
    );
};

export default ImageSection;