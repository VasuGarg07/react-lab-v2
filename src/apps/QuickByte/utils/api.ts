import axios from "axios";
import { LoaderFunctionArgs } from "react-router";
import { Meal, MealDetails } from "./helpers";

const axiosInstance = axios.create({ baseURL: 'https://www.themealdb.com/api/json/v1/1' });

export const categoryList = async (): Promise<string[]> => {
  const { data } = await axiosInstance.get('/list.php?c=list');
  return data.meals.map((item: { strCategory: string }) => item.strCategory)
}

export const areaList = async (): Promise<string[]> => {
  const { data } = await axiosInstance.get('/list.php?a=list');
  return data.meals.map((item: { strArea: string }) => item.strArea)
}

const getMeals = async (url: string) => {
  const { data } = await axiosInstance.get(url);
  const meals: Meal[] = data.meals ? data.meals.map((meal: any) => {
    return {
      id: meal.idMeal,
      name: meal.strMeal,
      image: meal.strMealThumb,
    }
  }) : []
  return meals
}

export const searchMeals = async ({ params }: LoaderFunctionArgs) => {
  const url = `/search.php?s=${params.searchTerm}`;
  const meals = await getMeals(url)
  const title = `Found ${meals.length} results for "${params.searchTerm}"...`;
  return { title, meals }
}

export const alphabetMeals = async ({ params }: LoaderFunctionArgs) => {
  const url = `/search.php?f=${params.letter}`;
  const meals = await getMeals(url)
  const title = `Found ${meals.length} dishes for "${params.letter}"...`;
  return { title, meals }
}

export const categoryMeals = async ({ params }: LoaderFunctionArgs) => {
  const url = `/filter.php?c=${params.categoryId}`;
  const meals = await getMeals(url)
  const title = `Found ${meals.length} dishes in "${params.categoryId}"...`;
  return { title, meals }
}

export const regionalMeals = async ({ params }: LoaderFunctionArgs) => {
  const url = `/filter.php?a=${params.areaId}`;
  const meals = await getMeals(url)
  const title = `Found ${meals.length} "${params.areaId}" dishes...`;
  return { title, meals }
}

export const random = async () => {
  const url = `/random.php`;
  const meals = await getMeals(url);
  return meals[0].id;
}


export const mealDetails = async ({ params }: LoaderFunctionArgs) => {
  const url = params.mealId ? `/lookup.php?i=${params.mealId}` : `/random.php`;
  const { data } = await axiosInstance.get(url);

  const meal: MealDetails = {
    id: data.meals[0].idMeal,
    name: data.meals[0].strMeal,
    image: data.meals[0].strMealThumb,
    category: data.meals[0].strCategory,
    area: data.meals[0].strArea,
    tags: data.meals[0].strTags?.split(',') || [],
    source: data.meals[0].strSource,
    youtube: data.meals[0].strYoutube,

    instructions: data.meals[0].strInstructions.replace(/[0-9]\./g, '')
      .replace(/STEP\s[0-9]/g, '')
      .split('.'),

    ingredients: [],
  }

  for (let i = 1; i <= 20; i++) {
    if (data.meals[0][`strIngredient${i}`]) {
      meal.ingredients.push(`${data.meals[0][`strMeasure${i}`]} ${data.meals[0][`strIngredient${i}`]}`);
    }
  }

  return meal
}