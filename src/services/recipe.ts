import { autoCompleteSize } from "const";
import axios from "./ajax";
import {
  AnalystProps,
  AutoCompleteItemProps,
  RecipeProps,
  RecipeResultsProps,
  UploadProps,
  UploadRecipeProps,
} from "types/recipeAjax";
import queryString from "query-string";
import { FileWithPath } from "@mantine/dropzone";

export interface ComplexSearchPropsType {
  offset?: number;
  number?: number;
  addRecipeInformation?: boolean;
}

const Init_complexSearchProps = {
  offset: 0,
  number: 20,
  addRecipeInformation: false,
};

export const loadComplexSearchService = async (
  props: ComplexSearchPropsType
) => {
  const params = { ...Init_complexSearchProps, ...props };

  const url = "/recipes/complexSearch";
  const search = queryString.parse(window.location.search);
  const newParams = queryString.stringify({ ...search, ...params });
  const data = (await axios.get(url + "?" + newParams)) as RecipeResultsProps;
  return data;
};

export const loadAutocompleteService = async (query: string) => {
  const url = `/recipes/autocomplete?query=${query}&number=${autoCompleteSize}`;

  const data = (await axios.get(url)) as AutoCompleteItemProps[];
  return data;
};

export const loadRecipeInformation = async (id: string) => {
  const url = `/recipes/${id}/information`;

  const data = (await axios.get(url)) as RecipeProps;
  return data;
};

export const loadBulkRecipeInformation = async (ids: string) => {
  const url = "/recipes/informationBulk"
    .appendQueryParam("ids", ids)
    .appendQueryParam("includeNutrition", "true");

  const data = (await axios.get(url)) as RecipeProps;
  return data;
};

export const loadNutritionInformation = async (id: string) => {
  const url = `/recipes/${id}/nutritionWidget.json`;

  const data = (await axios.get(url)) as AnalystProps;
  return data;
};

export const uploadImg = async (file: FileWithPath) => {
  const url = "/api/submit-image";

  return (await axios.post(url, file, {
    headers: {
      "Content-Type": "application/octet-stream",
    },
  })) as UploadProps;
};

export const uploadRecipe = async (data: UploadRecipeProps) => {
  const url = "/api/submit-recipe";

  return await axios.post(url, data);
};
