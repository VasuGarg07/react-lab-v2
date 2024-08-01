import React from 'react';
import { Sheet } from '@mui/joy';

interface BarProps {
    width: string,
    height: number;
    animationSpeed: number
}

const Bar: React.FC<BarProps> = ({ width, height, animationSpeed }) => {

    return (
        <Sheet
            variant="solid"
            sx={{
                width,
                height,
                mx: '4px',
                backgroundColor: 'primary.300',
                transition: `height ${animationSpeed / 1000}s ease`
            }}
        ></Sheet>
    );
};

export default Bar;
