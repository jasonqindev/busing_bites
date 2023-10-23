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
