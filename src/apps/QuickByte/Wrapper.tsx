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
        ? 'linear-gradient(-225deg,rgb(2, 91, 81) 0%,rgb(97, 0, 0) 100%)'
        : 'linear-gradient(-225deg, #69EACB 0%, #EACCF8 50%, #6654F1 100%)',
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