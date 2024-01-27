// Cookbook
export interface Meal {
  id: string,
  name: string,
  image: string,
}

export interface MealDetails extends Meal {
  category: string,
  area: string,
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
  }
]

export const alphabets = Array.from({ length: 26 }, (_, index) =>
  String.fromCharCode(65 + index)
);