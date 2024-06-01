import { DialogTitle, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemContent, ModalClose, Sheet } from '@mui/joy'
import { useState } from 'react'
import { Apps } from '../../shared/apps'
import { navigate } from '../../shared/Router'
import { ChevronRight, Home, Menu } from 'lucide-react'

const SideNav = () => {
  const [open, setOpen] = useState(false)

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleRouting = (path: string) => {
    navigate(path)
    closeDrawer();
  }

  return (
    <>
      <IconButton children={<Menu />} onClick={openDrawer} />

      <Drawer
        size="md"
        variant="plain"
        open={open}
        onClose={closeDrawer}
        slotProps={{
          content: {
            sx: {
              bgcolor: 'transparent',
              p: { md: 3, sm: 2, xs: 1 },
              boxShadow: 'none',
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: 'md',
            height: '100%',
            p: { md: 3, sm: 2, xs: 1 },
            overflow: 'auto',
          }}
          className="flex-column pad-16 margin"
        >
          <DialogTitle>React Lab</DialogTitle>
          <ModalClose />
          <Divider />

          <List
            color="neutral"
            size='sm'
            sx={{ mt: 1 }}
          >
            <ListItem>
              <ListItemButton component="a" href="/">
                <ListItemContent>Dashboard</ListItemContent>
                <Home />
              </ListItemButton>
            </ListItem>
            {Apps.map((app, index) => (
              <ListItem key={index}>
                <ListItemButton onClick={() => handleRouting(app.path)}>
                  <ListItemContent>{app.name}</ListItemContent>
                  <ChevronRight />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

        </Sheet>
      </Drawer>
    </>
  )
}

export default SideNav