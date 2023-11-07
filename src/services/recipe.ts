import { autoCompleteSize } from "const";
import axios from "./ajax";
import {
  AutoCompleteItemProps,
  RecipeProps,
  RecipeResultsProps,
} from "types/recipeAjax";

export const loadAutocompleteService = async (query: string) => {
  const url = `/recipes/autocomplete?query=${query}&number=${autoCompleteSize}`;

  const data = (await axios.get(url)) as AutoCompleteItemProps[];
  return data;
};

export const loadComplexSearchService = async (offset: number) => {
  const url = "/recipes/complexSearch";
  const search = window.location.search
    .appendQueryParam("offset", offset.toString())
    .appendQueryParam("number", "20")
    .appendQueryParam("addRecipeInformation", "true");
  const data = (await axios.get(url + search)) as RecipeResultsProps;
  return data;
};

export const loadRecipeInformation = async (id: string) => {
  const url = `/recipes/${id}/information`.appendQueryParam(
    "includeNutrition",
    "true"
  );

  const data = (await axios.get(url)) as RecipeProps;
  return data;
};
