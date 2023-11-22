import { FC, useState, useEffect } from "react";
import { AutoCompleteItemProps } from "types/recipeAjax";
import { useLoadAutoComplete } from "hooks/useLoadRecipe";
import { useUrlQueryParam } from "utils";
import { Autocomplete, AutocompleteProps } from "@mantine/core";

const RecipeInput: FC<AutocompleteProps> = (props) => {
  const [{ query = "" }, setParams] = useUrlQueryParam(["query"]);
  const [autoCompleteList, setAutoCompleteList] = useState<string[]>([]);

  const { run: autoComplete } = useLoadAutoComplete(AutoCompleteListFilter);

  useEffect(() => {
    if (!query) {
      setAutoCompleteList([]);
    }
    query && autoComplete(query);
  }, [query]); // eslint-disable-line

  function AutoCompleteListFilter(data: AutoCompleteItemProps[]) {
    if (!query) {
      setAutoCompleteList([]);
      return;
    }
    if (data && data?.length) {
      const res: string[] = [];
      data.forEach((item) => {
        res.push(item.title);
      });
      setAutoCompleteList(res);
    }
  }

  const handleInput = (query: string) => {
    setParams({
      query,
    });
  };

  return (
    <Autocomplete
      {...props}
      onChange={handleInput}
      value={query}
      data={autoCompleteList}
    />
  );
};

export default RecipeInput;
