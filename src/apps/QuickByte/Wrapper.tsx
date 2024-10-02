import { Box, useTheme } from '@mui/joy';
import { ReactNode } from 'react';
import { BgCenteredBox } from '../../components/BgCenteredBox';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box sx={{
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #1a472a 0%, #2e8b57 100%)'
        : 'linear-gradient(-60deg, #f09819 0%, #ff5858 100%)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
            linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%)
          `,
        backgroundSize: '40px 40px',
        backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px',
        opacity: 0.3,
      },
    }}>
      <BgCenteredBox>
        <Box
          sx={{
            mx: 'auto',
            maxWidth: 840,
            p: 2
          }}>
          {children}
        </Box>
      </BgCenteredBox>
    </Box>
  )
}

export default Wrapper