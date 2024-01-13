import { DialogTitle, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemContent, ModalClose, Sheet } from '@mui/joy'
import { useState } from 'react'
import { Apps } from '../shared/apps'
import { MatIcon, MatIconOutlined } from './Utils'

const SideNav = () => {
  const [open, setOpen] = useState(false)

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <IconButton children={<MatIconOutlined icon='menu' />} onClick={openDrawer} />

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
          <DialogTitle>React Lab</DialogTitle>
          <ModalClose />
          <Divider />

          <List
            color="neutral"
            size='sm'
          >
            {Apps.map((app, index) => (
              <ListItem key={index}>
                <ListItemButton>
                  <ListItemContent>{app.name}</ListItemContent>
                  <MatIcon icon="keyboard_arrow_right" />
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