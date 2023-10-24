export interface AutoCompleteItemProps {
  id: number;
  title: string;
  imageType: string;
}

export interface RecipeResultsProps {
  number: number;
  offset: number;
  results: RecipeCardProps[];
  totalResults: number;
}

export interface RecipeCardProps {
  id: number;
  dishTypes: string[];
  image: string;
  title: string;
  readyInMinutes: number;
  servings: number;
}

export interface RecipeProps {
  id: number;
  dishTypes: string[];
  diets: string[];
  image: string;
  title: string;
  readyInMinutes: number;
  servings: number;
  analyzedInstructions: any[];
  summary: string;
  instructions?: string;
  vegetarian: string;
  vegan: string;
  glutenFree: string;
  dairyFree: string;
  veryHealthy: string;
  cheap: string;
  veryPopular: string;
  sustainable: string;
  lowFodmap: string;
  extendedIngredients: any[];
}
