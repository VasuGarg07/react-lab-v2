import { Box } from '@mui/joy';
import { ReactNode } from 'react';
import { BgCenteredBox } from '../../components/BgCenteredBox';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {

  return (
    <Box className="gradient-food">
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