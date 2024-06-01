import { Box } from '@mui/joy';
import React from 'react'

interface BgCenteredBoxProps {
    bg?: string;
    children: React.ReactNode;
}
export const BgCenteredBox: React.FC<BgCenteredBoxProps> = ({ bg, children }) => {
    return (
        <Box
            sx={{
                p: { md: 4, sm: 3, xs: 2 },
                minHeight: 'calc(100dvh - 53px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                ...(bg && {
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                })
            }}>
            {children}
        </Box>
    )
}
