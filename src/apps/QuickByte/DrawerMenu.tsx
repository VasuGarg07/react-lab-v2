import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Button, DialogTitle, Divider, Drawer, Grid, IconButton, Input, ListItemContent, ModalClose, Sheet } from '@mui/joy';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MatIcon } from '../../components/Utils';
import { areaList, categoryList } from './utils/api';
import { alphabets, tabs } from './utils/helpers';

const DrawerMenu = ({ iconOnly }: { iconOnly: boolean }) => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false)

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleRandomRoute = () => {
    navigate(`/quick-byte/random`)
    closeDrawer();
  }

  return (
    <>
      {iconOnly ?
        <IconButton onClick={openDrawer}>
          <MatIcon outlined={true} icon='menu' />
        </IconButton>
        : <Button color="danger" sx={{ mb: 4 }} onClick={openDrawer}
          startDecorator={<MatIcon outlined={true} icon='menu_book' />} >
          Explore Recipes
        </Button>}

      <Drawer size="md" variant="plain"
        open={open} onClose={closeDrawer}
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
        <Sheet className="flex-column pad-16 margin"
          sx={{
            borderRadius: 'md',
            height: '100%',
            overflow: 'auto',
          }} >

          <DialogTitle>Quick Byte</DialogTitle>
          <ModalClose />
          <Divider />

          <Input size="sm" placeholder="Search..."
            endDecorator={<MatIcon icon="search" size={20} />}
            sx={{ bgcolor: 'background.level1', my: 1 }} />

          <Accordions closeDrawer={closeDrawer} />

          <Button
            variant="solid" color='warning' size="sm"
            onClick={handleRandomRoute}
            startDecorator={<MatIcon icon='star_border' size={20} />}>
            Surprise Me!
          </Button>
        </Sheet>
      </Drawer>
    </>
  )
}

export default DrawerMenu;


// Menu Items
export const Accordions = ({ closeDrawer }: { closeDrawer: () => void }) => {

  const [index, setIndex] = useState<number | null>(0);

  const [areas, setAreas] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleRoute = (key: string) => {
    navigate(`/quick-byte/${tabs[index!].path}/${key}`)
    closeDrawer();
  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        setCategories(await categoryList());
        setAreas(await areaList());
      } catch (error) {
        console.log(error)
      }
    }

    fetchData();
  }, [])

  return (
    <AccordionGroup size='sm' sx={{ height: 1, overflow: 'auto' }}>
      <Accordion
        onChange={(_, expanded) => setIndex(expanded ? 0 : null)}
        expanded={index === 0}>

        <AccordionSummary>
          <MatIcon icon='category' outlined size={20}></MatIcon>
          <ListItemContent>Categories</ListItemContent>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={1} flexWrap='wrap' sx={{ mt: 1 }}>
            {categories.map(char => (
              <Grid key={char}>
                <Button variant='outlined' color='primary' size='sm'
                  onClick={() => handleRoute(char)}>
                  {char}
                </Button>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion
        onChange={(_, expanded) => setIndex(expanded ? 1 : null)}
        expanded={index === 1}>

        <AccordionSummary>
          <MatIcon icon='public' outlined size={20}></MatIcon>
          <ListItemContent>Regional Dishes</ListItemContent>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={1} flexWrap='wrap' sx={{ mt: 1 }}>
            {areas.map(char => (
              <Grid key={char}>
                <Button variant='outlined' color='danger' size='sm'
                  onClick={() => handleRoute(char)}>
                  {char}
                </Button>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion
        onChange={(_, expanded) => setIndex(expanded ? 2 : null)}
        expanded={index === 2}>

        <AccordionSummary>
          <MatIcon icon='abc' outlined size={20}></MatIcon>
          <ListItemContent>Dictionary</ListItemContent>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={1} flexWrap='wrap' sx={{ mt: 1 }}>
            {alphabets.map(char => (
              <Grid key={char} xs={3}>
                <Button variant='outlined' color='success' size='sm'
                  sx={{ width: 1 }}
                  onClick={() => handleRoute(char)}>
                  {char}
                </Button>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  )
}
