import { Button, DialogTitle, Divider, Drawer, IconButton, Input, ModalClose, Sheet, Stack } from '@mui/joy';
import { HandPlatter, Search, Sparkle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { random as surpriseMeal } from './utils/api';
import MenuItems from './MenuItems';

const DrawerMenu = () => {

  const router = useRouter();
  const [open, setOpen] = useState(false)

  const [term, setTerm] = useState('');

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleRandomRoute = () => {
    surpriseMeal().then(id => {
      router.push(`/recipe-haven/meal/${id}`);
      closeDrawer();
    })
  }

  const handleSearch = () => {
    router.push(`/recipe-haven/search/${term}`);
    closeDrawer();
  }

  return (
    <>
      <Button color="primary" sx={{ mb: 4 }} onClick={openDrawer}
        startDecorator={<HandPlatter />} >
        Explore Recipes
      </Button>
      <Drawer size="md" variant="plain"
        open={open} onClose={closeDrawer}
        anchor='bottom'
        slotProps={{
          content: {
            sx: {
              bgcolor: 'transparent',
              p: { md: 3, sm: 0 },
              height: 1,
              boxShadow: 'none',
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: 'md',
            height: 1, maxWidth: 400,
            overflow: 'auto',
            p: 2, m: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }} >

          <DialogTitle>Quick Byte</DialogTitle>
          <ModalClose />
          <Divider />

          <Stack direction='row' spacing={1}>
            <Input size="sm" placeholder="Search..." value={term} onChange={e => setTerm(e.target.value)}
              sx={{ bgcolor: 'background.level1', my: 1, flexGrow: 1 }} />
            <IconButton variant='solid' onClick={handleSearch}>
              <Search size={20} />
            </IconButton>
          </Stack>

          <MenuItems closeDrawer={closeDrawer} />

          <Button
            variant="solid" color='warning' size="sm"
            onClick={handleRandomRoute}
            startDecorator={<Sparkle size={20} />}>
            Surprise Me!
          </Button>
        </Sheet>
      </Drawer>
    </>
  )
}

export default DrawerMenu;
