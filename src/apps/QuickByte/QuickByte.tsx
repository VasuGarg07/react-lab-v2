import { Box, Button, Card, DialogTitle, Divider, Drawer, Grid, IconButton, Input, ListItemButton, ModalClose, Sheet, Typography } from '@mui/joy';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../../assets/cookbook.jpg';
import { MatIcon, MatIconOutlined } from '../../components/Utils';
import { tabs } from './utils/helpers';

const QuickByte = () => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false)

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleRouting = (path: string) => {
    navigate(`/quick-byte/${path}`)
    closeDrawer();
  }

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

        <div
          className='flex-centered'
          style={{ marginTop: 8, gap: 16, flexWrap: 'wrap' }}
        >

          <Button
            color="danger"
            startDecorator={<MatIconOutlined icon='menu_book' />}
            onClick={openDrawer}
            sx={{ mb: 4 }}
          >
            Explore Recipes
          </Button>

        </div>
      </Box>

      <Drawer
        size="md"
        variant="plain"
        open={open}
        onClose={closeDrawer}
        slotProps={{
          content: {
            sx: {
              bgcolor: 'transparent',
              p: { md: 3, sm: 0 },
              boxShadow: 'none',
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: 'md',
            height: '100%',
            overflow: 'auto',
          }}
          className="flex-column pad-16 margin"
        >
          <DialogTitle>Quick Byte</DialogTitle>
          <ModalClose />
          <Divider />

          <Input
            size="lg"
            placeholder="Search..."
            endDecorator={
              <IconButton
                variant='solid'
                color='danger'
                size='sm'>
                <MatIcon icon="search" />
              </IconButton>
            }
            sx={{
              bgcolor: 'background.level2',
              my: 1
            }} />

          <Grid
            container
            spacing={2}
          >
            {tabs.map((tab, index) => (
              <Grid key={index} xs={12} lg={6}>
                <Card
                  variant="outlined"
                  onClick={() => handleRouting(tab.path)}
                  sx={{
                    bgcolor: 'background.level1',
                    '&:hover': {
                      cursor: 'pointer',
                    }
                  }}>
                  <MatIcon icon={tab.icon} />
                  <Typography level="title-md">{tab.name}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

        </Sheet>
      </Drawer>
    </>
  )
}

export default QuickByte