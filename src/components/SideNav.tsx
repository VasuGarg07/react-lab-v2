import { useState } from 'react'
import { MatIconOutlined } from './Utils'
import { DialogTitle, Divider, Drawer, ModalClose, Sheet, IconButton } from '@mui/joy'

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
          <DialogTitle>Filters</DialogTitle>
          <ModalClose />
          <Divider sx={{ mt: 'auto' }} />
        </Sheet>
      </Drawer>
    </>
  )
}

export default SideNav