import { useRouter } from "next/navigation";
import { Meal } from "./utils/helpers";
import { AspectRatio, Card, CardContent, CardOverflow, IconButton, Stack, Typography } from "@mui/joy";
import { BookOpenText } from "lucide-react";

const MealCard: React.FC<{ meal: Meal }> = ({ meal }) => {

    const router = useRouter();

    const handleMealNav = (id: string) => {
        router.push(`/recipe-haven/meal/${id}`)
    }

    return (
        <Card sx={{
            border: 'none',
            '&:hover': {
                boxShadow: 'lg',
                cursor: 'pointer',
                transform: 'translateY(-4px)',
                transition: 'transform 0.2s linear',
            }
        }}
            onClick={() => handleMealNav(meal.id)}>
            <CardOverflow>
                <AspectRatio ratio={4 / 3} objectFit='cover'>
                    <img
                        src={meal.image} srcSet={meal.image} alt={meal.name}
                    />
                </AspectRatio>
            </CardOverflow>
            <CardContent>
                <Stack direction='row' alignItems='center' sx={{ mt: 1 }} spacing={1}>
                    <Typography level="title-lg"
                        sx={{
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            flexGrow: 1,
                            fontFamily: 'Overlock',
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            overflow: 'hidden'
                        }}>
                        {meal.name}
                    </Typography>
                    <IconButton size='sm' color='primary' variant='soft' sx={{ borderRadius: 'xl' }}>
                        <BookOpenText size={20} />
                    </IconButton>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default MealCard;