import { Box, Sheet } from '@mui/joy';
import { ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {

  return (
    <Sheet sx={{
      bgcolor: 'transparent',
      justifyContent: 'center',
      overflow: 'auto',
      minHeight: 'calc(100dvh - 53px)'
    }}>
      <Box
        sx={{
          mx: 'auto',
          maxWidth: 840,
          p: 2
        }}>
        {children}
      </Box>
    </Sheet>
  )
}

export default Wrapper