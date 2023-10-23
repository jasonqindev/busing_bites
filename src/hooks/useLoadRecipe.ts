import { useRequest } from "ahooks";
import { loadAutocompleteService, loadRecipeService } from "services/recipe";
import { AutoCompleteItemProps, RecipeResultsProps } from "types/recipe";
import { useUrlQueryParam } from "utils";

export const useLoadRecipeData = () => {
  const [{ query, offset }] = useUrlQueryParam(["query", "offset"]);

  const { loading, error, data } = useRequest(loadRecipeService, {
    refreshDeps: [query, offset],
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
