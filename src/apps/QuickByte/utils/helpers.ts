// Cookbook
export interface Meal {
  id: string,
  name: string,
  image: string,
  category: string,
  area: string,
}

export interface MealDetails extends Meal {
  tags: string[],
  instructions: string[],
  ingredients: string[],
  source?: string,
  youtube?: string
}

export const tabs = [
  {
    name: 'Categories',
    path: 'category',
    icon: 'local_dining'
  },
  {
    name: 'Regional Dishes',
    path: 'region',
    icon: 'public',
  },
  {
    name: 'Dictionary',
    path: 'alphabet',
    icon: 'abc',
  },
  {
    name: 'Surprise Me!',
    path: 'random',
    icon: 'star_border'
  },
]

export const alphabets = (): string[] => {
  const arr = new Array(26);
  return arr.map((_, i) => String.fromCharCode(65 + i))
}