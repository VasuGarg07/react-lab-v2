import { Box, useColorScheme } from '@mui/joy';
import { ReactNode } from 'react';
import { BgCenteredBox } from '../../components/BgCenteredBox';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const { mode } = useColorScheme();
  const isDarkMode = mode === 'dark';

  return (
    <Box sx={{
      background: isDarkMode
        ? 'linear-gradient(to top, #0f0f1e 0%, #1a1a3a 50%, #252550 100%)'
        : 'linear-gradient(to bottom, #D5DEE7 0%, #E8EBF2 50%, #E2E7ED 100%), linear-gradient(to bottom, rgba(0,0,0,0.02) 50%, rgba(255,255,255,0.02) 61%, rgba(0,0,0,0.02) 73%), linear-gradient(33deg, rgba(255,255,255,0.20) 0%, rgba(0,0,0,0.20) 100%)',
      backgroundBlendMode: 'normal, color-burn',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
            linear-gradient(135deg, ${isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.5)'} 25%, 
            transparent 25%,
            transparent 50%, 
            ${isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.5)'} 50%,
            ${isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.5)'} 75%,
            transparent 75%,
            transparent)
          `,
        backgroundSize: '60px 60px',
        opacity: isDarkMode ? 0.4 : 0.2,
      },
    }}>
      <BgCenteredBox>
        <Box
          sx={{
            mx: 'auto',
            maxWidth: 1000,
            p: 2
          }}>
          {children}
        </Box>
      </BgCenteredBox>
    </Box>
  )
}

export default Wrapper