import { useRequest } from "ahooks";
import { PageToOffset } from "pages/recipe/recipe-list/utils";
import { useLocation } from "react-router-dom";
import {
  loadAutocompleteService,
  loadComplexSearchService,
  loadRecipeInformation,
} from "services/recipe";
import {
  AutoCompleteItemProps,
  RecipeProps,
  RecipeResultsProps,
} from "types/recipeAjax";

export const useLoadRecipeData = (page: number) => {
  const { search } = useLocation();
  const offset = PageToOffset(page);
  const pack = async () => {
    return await loadComplexSearchService(offset);
  };
  const { loading, error, data } = useRequest(pack, {
    refreshDeps: [search, page],
    debounceWait: 500,
  });

  const { results, totalResults } = (data as RecipeResultsProps) || {};

  return { error, results, loading, totalResults };
};

export const useLoadAutoComplete = (
  onSuccess?: (res: AutoCompleteItemProps[]) => void
) => {
  const pack = async (query: string) => {
    return await loadAutocompleteService(query);
  };

  const { loading, run, error, data } = useRequest(pack, {
    manual: true,
    debounceWait: 800,
    onSuccess: (res) => {
      onSuccess && onSuccess(res);
    },
  });

  return { run, error, data, loading };
};

export const useLoadRecipeInfo = (id: string) => {
  const pack = async () => {
    return await loadRecipeInformation(id);
  };

  const { loading, run, error, data } = useRequest(pack, {
    debounceWait: 500,
  });

  const recipeData = (data ?? {}) as RecipeProps;

  return { run, error, recipeData, loading };
};
