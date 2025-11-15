import axios from "axios";
import type { Meal, MealDetails } from "./recipe.helpers";

const mealDbClient = axios.create({
    baseURL: 'https://www.themealdb.com/api/json/v1/1'
});

// Get list of all categories
export const categoryList = async (): Promise<string[]> => {
    const { data } = await mealDbClient.get('/list.php?c=list');
    return data.meals.map((item: { strCategory: string }) => item.strCategory);
};

// Get list of all areas/regions
export const areaList = async (): Promise<string[]> => {
    const { data } = await mealDbClient.get('/list.php?a=list');
    return data.meals.map((item: { strArea: string }) => item.strArea);
};

// Generic function to get meals from any endpoint
const getMeals = async (url: string): Promise<Meal[]> => {
    const { data } = await mealDbClient.get(url);

    if (!data.meals) return [];

    return data.meals.map((meal: any) => ({
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
    }));
};

// Search meals by name
export const searchMeals = async (searchTerm: string): Promise<Meal[]> => {
    return getMeals(`/search.php?s=${searchTerm}`);
};

// Get meals by first letter
export const alphabetMeals = async (letter: string): Promise<Meal[]> => {
    return getMeals(`/search.php?f=${letter}`);
};

// Get meals by category
export const categoryMeals = async (categoryId: string): Promise<Meal[]> => {
    return getMeals(`/filter.php?c=${categoryId}`);
};

// Get meals by region/area
export const regionalMeals = async (areaId: string): Promise<Meal[]> => {
    return getMeals(`/filter.php?a=${areaId}`);
};

// Get random meal ID
export const randomMealId = async (): Promise<string> => {
    const meals = await getMeals('/random.php');
    return meals[0].id;
};

// Get meal details by ID
export const mealDetails = async (mealId: string): Promise<MealDetails> => {
    const url = `/lookup.php?i=${mealId}`;
    const { data } = await mealDbClient.get(url);

    if (!data.meals || data.meals.length === 0) {
        throw new Error('Meal not found');
    }

    const mealData = data.meals[0];

    const meal: MealDetails = {
        id: mealData.idMeal,
        name: mealData.strMeal,
        image: mealData.strMealThumb,
        category: mealData.strCategory,
        area: mealData.strArea,
        tags: mealData.strTags?.split(',').filter(Boolean) || [],
        source: mealData.strSource,
        youtube: mealData.strYoutube,
        instructions: mealData.strInstructions
            .replace(/[0-9]\./g, '')
            .replace(/STEP\s[0-9]/g, '')
            .split('.')
            .map((step: string) => step.trim())
            .filter(Boolean),
        ingredients: [],
    };

    // Extract ingredients and measurements
    for (let i = 1; i <= 20; i++) {
        const ingredient = mealData[`strIngredient${i}`];
        const measure = mealData[`strMeasure${i}`];

        if (ingredient && ingredient.trim()) {
            meal.ingredients.push(`${measure?.trim() || ''} ${ingredient.trim()}`.trim());
        }
    }

    return meal;
};