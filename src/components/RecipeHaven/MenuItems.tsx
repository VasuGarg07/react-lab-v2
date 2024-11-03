import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ALPHABETS, TABS } from "./utils/helpers";
import { areaList, categoryList } from "./utils/api";
import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Button, Grid, ListItemContent } from "@mui/joy";
import { BookA, Salad, TreePalm } from "lucide-react";

const MenuItems: React.FC<{ closeDrawer: () => void }> = ({ closeDrawer }) => {

    const [index, setIndex] = useState<number | null>(0);

    const [areas, setAreas] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    const router = useRouter();

    const handleRoute = (key: string) => {
        router.push(`/recipe-haven/${TABS[index!].path}/${key}`)
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

export default MenuItems