export interface Meal {
    id: string;
    name: string;
    image: string;
}

export interface Category {
    id: string;
    name: string;
    image: string;
    description: string;
}

export interface MealDetails extends Meal {
    category: string;
    area: string;
    tags: string[];
    instructions: string[];
    ingredients: string[];
    source?: string;
    youtube?: string;
}

export const ALPHABETS = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(65 + index)
);
