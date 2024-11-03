import axios from "axios";
import { Meal, MealDetails } from "./helpers";

export const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';


// Transform API response to Meal interface
const transformToMeal = (meal: any): Meal => ({
  id: meal.idMeal,
  name: meal.strMeal,
  image: meal.strMealThumb,
});

// Get ingredients array from meal data
const extractIngredients = (meal: any): string[] => {
  return Array.from({ length: 20 }, (_, i) => i + 1)
    .reduce<string[]>((acc, i) => {
      const ingredient = meal[`strIngredient${i}`]?.trim();
      const measure = meal[`strMeasure${i}`]?.trim();

      if (ingredient) {
        acc.push(`${measure || ''} ${ingredient}`.trim());
      }
      return acc;
    }, []);
};

// Clean instructions text
const cleanInstructions = (instructions: string): string[] => {
  return instructions
    .replace(/[0-9]\./g, '')
    .replace(/STEP\s[0-9]/g, '')
    .split('.')
    .map(step => step.trim())
    .filter(Boolean);
};

// Transform API response to MealDetails interface
const transformToMealDetails = (meal: any): MealDetails => ({
  id: meal.idMeal,
  name: meal.strMeal,
  image: meal.strMealThumb,
  category: meal.strCategory || '',
  area: meal.strArea || '',
  tags: meal.strTags?.split(',').map((tag: string) => tag.trim()).filter(Boolean) || [],
  source: meal.strSource || '',
  youtube: meal.strYoutube || '',
  instructions: cleanInstructions(meal.strInstructions || ''),
  ingredients: extractIngredients(meal),
});

const getMeals = async (url: string): Promise<Meal[]> => {
  const { data } = await axios.get(url);
  return data.meals ? data.meals.map(transformToMeal) : [];
};

export const mealDetails = async (mealId?: string): Promise<MealDetails> => {
  const url = mealId ? `${BASE_URL}lookup.php?i=${mealId}` : `${BASE_URL}random.php`;
  const { data } = await axios.get(url);

  if (!data.meals?.[0]) {
    throw new Error('Meal not found');
  }

  return transformToMealDetails(data.meals[0]);
};



export const categoryList = async (): Promise<string[]> => {
  const { data } = await axios.get(`${BASE_URL}list.php?c=list`);
  return data.meals.map((item: { strCategory: string }) => item.strCategory);
}

export const areaList = async (): Promise<string[]> => {
  const { data } = await axios.get(`${BASE_URL}list.php?a=list`);
  return data.meals.map((item: { strArea: string }) => item.strArea);
}


export const searchMeals = async (searchTerm: string) => {
  const url = `${BASE_URL}search.php?s=${searchTerm}`;
  const meals = await getMeals(url);
  const title = `Found ${meals.length} results for "${searchTerm}"...`;
  return { title, meals };
}

export const alphabetMeals = async (letter: string) => {
  const url = `${BASE_URL}search.php?f=${letter}`;
  const meals = await getMeals(url);
  const title = `Found ${meals.length} dishes for "${letter}"...`;
  return { title, meals };
}

export const categoryMeals = async (categoryId: string) => {
  const url = `${BASE_URL}filter.php?c=${categoryId}`;
  const meals = await getMeals(url);
  const title = `Found ${meals.length} dishes in "${categoryId}"...`;
  return { title, meals };
}

export const regionalMeals = async (areaId: string) => {
  const url = `${BASE_URL}filter.php?a=${areaId}`;
  const meals = await getMeals(url);
  const title = `Found ${meals.length} "${areaId}" dishes...`;
  return { title, meals };
}

export const random = async (): Promise<string> => {
  const url = `${BASE_URL}random.php`;
  const meals = await getMeals(url);
  return meals[0].id;
}
