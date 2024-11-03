import GalleryPage from '@/components/RecipeHaven/GalleryPage';
import { categoryMeals } from '@/components/RecipeHaven/utils/api';
import { Meal } from '@/components/RecipeHaven/utils/helpers';
import { GetServerSideProps } from 'next';

interface PageProps {
    meals: Meal[];
    title: string;
}

export default function MealPage({ meals, title }: PageProps) {
    return (
        <GalleryPage meals={meals} title={title} />
    );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ params }) => {
    try {
        const mealId = params?.id as string;
        const meals = await categoryMeals(mealId);
        return { props: meals };
    } catch (error) {
        return { notFound: true };
    }
};
