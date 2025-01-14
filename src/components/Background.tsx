import { useTheme } from '@mui/joy';
import React from 'react';

interface BackgroundProps {
    children: React.ReactNode
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <div className={`background gradient-${isDark ? 'dark' : 'light'}`}>
            {children}
        </div>
    );
};

export default Background;
