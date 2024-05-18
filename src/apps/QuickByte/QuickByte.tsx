import { Sheet, Stack, Typography } from '@mui/joy';
import Background from '../../assets/cookbook.webp';
import { BgCenteredBox } from '../../components/shared/BgCenteredBox';
import DrawerMenu from './DrawerMenu';

const QuickByte = () => {

  return (
    <>
      <BgCenteredBox bg={Background}>
        <Stack component={Sheet} spacing={1} padding={3} borderRadius="md" boxShadow="lg" alignItems='center'>
          <Typography level='h1' fontFamily={'Kanit'} fontSize={32}>QUICK BYTE</Typography>
          <Typography level='h2' fontFamily={'Inter'} fontSize={20} fontWeight={400}>
            Easy Eats, Big Treats!
          </Typography>
          <Typography sx={{ maxWidth: 840, textAlign: 'center' }} level='title-lg' fontWeight={300}>
            Welcome to QuickByte, where every moment in the kitchen is a delightful adventure. Discover an array of quick and easy recipes that transform everyday ingredients into extraordinary meals, making cooking a breeze and savoring the flavors a joy.
          </Typography>
          <DrawerMenu iconOnly={false} />
        </Stack>
      </BgCenteredBox>
    </>
  )
}

export default QuickByte