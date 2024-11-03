import MealDetailsPage from '@/components/RecipeHaven/MealDetailsPage';
import { mealDetails } from '@/components/RecipeHaven/utils/api';
import { MealDetails } from '@/components/RecipeHaven/utils/helpers';
import { GetServerSideProps } from 'next';

interface PageProps {
    meal: MealDetails;
}

export default function MealPage({ meal }: PageProps) {
    return (
        <MealDetailsPage meal={meal} />
    );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ params }) => {
    try {
        const mealId = params?.id as string;
        const meal = await mealDetails(mealId);
        return { props: { meal } };
    } catch (error) {
        return { notFound: true };
    }
};
