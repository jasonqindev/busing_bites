import { useRequest } from "ahooks";
import { recipes_pageSize } from "const";
import cloneDeep from "lodash.clonedeep";
import { PageToOffset } from "pages/recipe/recipe-list/utils";
import { useLocation } from "react-router-dom";
import {
  loadAutocompleteService,
  loadBulkRecipeInformation,
  loadComplexSearchService,
  loadNutritionInformation,
  loadRecipeDetailByRecipeId,
  loadRecipeInformation,
  loadRecipes,
  loadRecipesByUserId,
} from "services/recipe";
import {
  AutoCompleteItemProps,
  Nutrient,
  RecipeProps,
  RecipeResultsProps,
} from "types/recipeAjax";
import { deepMerge } from "utils";

export interface LoadRecipeDataType {
  page?: number;
  pageSize?: number;
  addRecipeInformation?: boolean;
}

export const useLoadRecipeData = ({
  page,
  pageSize = recipes_pageSize,
  addRecipeInformation,
}: LoadRecipeDataType) => {
  const { search } = useLocation();

  const offset = PageToOffset(page, pageSize);

  const pack = async () => {
    return await loadComplexSearchService({
      offset,
      number: pageSize,
      addRecipeInformation,
    });
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
    debounceWait: 400,
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

  const { loading, error, data } = useRequest(pack);

  const recipeData = (data ?? {}) as RecipeProps;

  return { error, recipeData, loading };
};

export const useLoadBulkRecipeInfo = () => {
  const pack = async (ids: string) => {
    return await loadBulkRecipeInformation(ids);
  };

  const { run, loading, error, data } = useRequest(pack, {
    debounceWait: 500,
    manual: true,
  });

  const recipeList = (data ?? []) as Partial<RecipeProps>[];

  let nutrients: Nutrient[] = [];

  try {
    const res = recipeList.map((r) => r.nutrition?.nutrients) || [];
    res.forEach((n = []) => {
      nutrients = deepMerge(cloneDeep(nutrients), cloneDeep(n));
    });
  } catch (error) {}

  return { run, error, nutrients, loading };
};

export const useLoadRecipeInfoByManual = (
  onSuccess?: (res: RecipeProps) => void
) => {
  const pack = async (id: string) => {
    return await loadRecipeInformation(id);
  };

  const { loading, run, error, data } = useRequest(pack, {
    debounceWait: 500,
    manual: true,
    onSuccess: (res) => {
      onSuccess && onSuccess(res);
    },
  });

  const recipeData = (data ?? {}) as RecipeProps;

  return { run, error, recipeData, loading };
};

export const useLoadNutritionInfo = () => {
  const pack = async (id: string) => {
    return await loadNutritionInformation(id);
  };

  const { loading, run, error, data } = useRequest(pack, {
    manual: true,
    debounceWait: 500,
  });

  return { run, error, recipeAnalyst: data, loading };
};

export const useLoadRecipes = () => {
  const { loading, run, error, data } = useRequest(loadRecipes);

  return { run, error, data, loading };
};

export const useLoadRecipesByUserId = () => {
  const pack = async (id: string) => {
    return await loadRecipesByUserId(id);
  };

  const { loading, run, error, data = [] } = useRequest(pack);

  const recipes = data.map((recipe: any) => {
    return {
      ...recipe,
      id: recipe.recipeId,
    };
  });

  return { run, error, recipes, loading };
};

export const useLoadRecipeDetailByRecipeId = (id: string) => {
  const pack = async () => {
    return await loadRecipeDetailByRecipeId(id);
  };

  const { loading, error, data } = useRequest(pack);

  const recipeData = (data ?? {}) as RecipeProps;

  return { error, recipeData, loading };
};
