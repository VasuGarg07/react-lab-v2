import { Box, Typography } from '@mui/joy';
import Background from '../../assets/cookbook.jpg';
import DrawerMenu from './DrawerMenu';

const QuickByte = () => {

  return (
    <>
      <Box
        className="flex-centered-column"
        sx={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          p: { md: 4, xs: 2 },
          height: 'calc(100vh - 53px)',
        }}>

        <Typography sx={{ color: '#f5f5f5' }} level='h1' fontFamily={'Montserrat'} fontSize={40}>QUICK BYTE</Typography>

        <Typography sx={{ color: '#f5f5f5' }} level='h2' fontFamily={'Overlock'} fontSize={28} fontStyle={'italic'} fontWeight={300}>
          Easy Eats, Big Treats!
        </Typography>

        <Typography sx={{ color: '#f5f5f5', maxWidth: 840, textAlign: 'center' }} level='title-lg' fontWeight={300}>
          Welcome to QuickByte, where every moment in the kitchen is a delightful adventure. Discover an array of quick and easy recipes that transform everyday ingredients into extraordinary meals, making cooking a breeze and savoring the flavors a joy.
        </Typography>

        <DrawerMenu />
      </Box>
    </>
  )
}

export default QuickByte