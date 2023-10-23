import { autoCompleteSize } from "const";
import axios from "./ajax";
import { AutoCompleteItemProps, RecipeResultsProps } from "types/recipe";

export const loadAutocompleteService = async (query: string) => {
  const url = `/recipes/autocomplete?query=${query}&number=${autoCompleteSize}`;

  const data = (await axios.get(url)) as AutoCompleteItemProps[];
  return data;
};

export const loadRecipeService = async () => {
  const url = "/recipes/complexSearch";
  const search = window.location.search
    .appendQueryParam("number", "20")
    .appendQueryParam("addRecipeInformation", "true");
  const data = (await axios.get(url + search)) as RecipeResultsProps;
  return data;
};
