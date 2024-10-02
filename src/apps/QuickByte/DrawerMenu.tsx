import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Button, DialogTitle, Divider, Drawer, Grid, IconButton, Input, ListItemContent, ModalClose, Sheet, Stack } from '@mui/joy';
import { BookA, HandPlatter, Salad, Search, Sparkle, TreePalm } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { areaList, categoryList, random as surpriseMeal } from './utils/api';
import { ALPHABETS, TABS } from './utils/helpers';

const DrawerMenu = () => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false)

  const [term, setTerm] = useState('');

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleRandomRoute = () => {
    surpriseMeal().then(id => {
      navigate(`/recipe-haven/meal/${id}`);
      closeDrawer();
    })
  }

  const handleSearch = () => {
    navigate(`/recipe-haven/search/${term}`);
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

          <Accordions closeDrawer={closeDrawer} />

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


// Menu Items
export const Accordions = ({ closeDrawer }: { closeDrawer: () => void }) => {

  const [index, setIndex] = useState<number | null>(0);

  const [areas, setAreas] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleRoute = (key: string) => {
    navigate(`/recipe-haven/${TABS[index!].path}/${key}`)
    closeDrawer();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategories(await categoryList());
        setAreas(await areaList());
      } catch (_) { }
    }

    fetchData();
  }, [])

  return (
    <AccordionGroup size='sm' sx={{ height: 1, overflow: 'auto' }}>
      <Accordion
        onChange={(_, expanded) => setIndex(expanded ? 0 : null)}
        expanded={index === 0}>

        <AccordionSummary>
          <Salad size={16} />
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
          <TreePalm size={16} />
          <ListItemContent>Regionals</ListItemContent>
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
          <BookA size={16} />
          <ListItemContent>Dictionary</ListItemContent>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={1} flexWrap='wrap' sx={{ mt: 1 }}>
            {ALPHABETS.map(char => (
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
