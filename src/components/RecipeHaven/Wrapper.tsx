import { BgCenteredBox } from '@/shared/components/BgCenteredBox';
import { useTheme } from '@mui/joy/styles';
import React from 'react';

const darkBg = '/backgrounds/abstract-dark.webp';
const lightBg = '/backgrounds/abstract.webp';

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <BgCenteredBox bg={isDark ? darkBg : lightBg}>
            {children}
        </BgCenteredBox>
    )
}

export default Wrapper