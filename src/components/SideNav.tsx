import { Drawer, IconButton, List, ListItem, ListItemButton, Typography, Sheet, Divider, Stack } from '@mui/joy';
import { useState } from 'react';
import { Menu, ChevronRight, Home, X } from 'lucide-react';
import { Apps } from '../shared/apps';
import { navigate } from '../shared/Router';
import { Spacer } from './Spacer';

const SideNav = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleRouting = (path: string) => {
    navigate(path);
    closeDrawer();
  };

  return (
    <>
      <IconButton onClick={openDrawer}>
        <Menu />
      </IconButton>

      <Drawer
        open={open}
        onClose={closeDrawer}
        anchor="left"
        variant="plain"
        slotProps={{
          content: {
            sx: {
              m: 2,
              width: '80%',
              maxWidth: '300px',
              bgcolor: 'background.body',
              boxShadow: 'lg',
              height: 'calc(100% - 32px)',
              borderRadius: 'lg',
            },
          },
        }}
      >
        <Sheet
          sx={{
            p: 2,
            bgcolor: 'background.surface',
            borderRadius: 'lg',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Header with Close Button */}
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Typography level="h4" fontWeight="bold">
              React Lab
            </Typography>
            <IconButton onClick={closeDrawer}>
              <X />
            </IconButton>
          </Stack>
          <Divider sx={{ mt: 1 }} />

          {/* Navigation List */}
          <List sx={{ mt: 1 }}>
            <ListItem>
              <ListItemButton
                onClick={() => handleRouting('/')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '&:hover': {
                    bgcolor: 'primary.lightBg',
                  },
                  transition: 'background-color 0.3s ease-in-out',
                }}
              >
                <Home />
                <Typography level="body-sm" sx={{ ml: 1, fontWeight: 800 }}>
                  Dashboard
                </Typography>
                <Spacer />
                <ChevronRight />
              </ListItemButton>
            </ListItem>

            {Apps.filter(app => app.visible).map((app, index) => (
              <ListItem key={index}>
                <ListItemButton
                  onClick={() => handleRouting(app.path)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:hover': {
                      bgcolor: 'primary.lightBg',
                    },
                    transition: 'background-color 0.3s ease-in-out',
                  }}
                >
                  <app.icon />
                  <Typography level="body-sm" sx={{ fontWeight: 'bold', ml: 1 }}>
                    {app.name}
                  </Typography>
                  <Spacer />
                  <ChevronRight />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Footer */}
          <Divider sx={{ mt: 1 }} />
          <Typography level="body-xs" textAlign="center" sx={{ mt: 1 }}>
            © 2024 React Lab
          </Typography>
        </Sheet>
      </Drawer>
    </>
  );
};

export default SideNav;
