import { useUrlQueryParam } from "utils";
import { FC, useState } from "react";
import { useLoadAutoComplete } from "hooks/useLoadRecipe";
import { AutoCompleteItemProps } from "types/recipeAjax";
import { Autocomplete, AutocompleteProps } from "@mantine/core";
import { useDebounceEffect } from "ahooks";

const RecipeInput: FC<AutocompleteProps> = (props) => {
  const [{ query = "" }, setParams] = useUrlQueryParam(["query"]);
  const [autoCompleteList, setAutoCompleteList] = useState<string[]>([]);

  const { run: autoComplete } = useLoadAutoComplete(AutoCompleteListFilter);

  useDebounceEffect(
    () => {
      if (!query) {
        setAutoCompleteList([]);
      }
      query && autoComplete(query);
    },
    [query],
    {
      wait: 200,
    }
  );

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
