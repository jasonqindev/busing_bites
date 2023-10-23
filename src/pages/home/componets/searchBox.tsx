import { ActionIcon, Collapse, Autocomplete } from "@mantine/core";
import styles from "./components.module.scss";

import { BsFilter } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { useUrlQueryParam } from "utils";
import { useLoadAutoComplete } from "hooks/useLoadRecipe";
import { AutoCompleteItemProps } from "types/recipe";
import { useNavigate } from "react-router-dom";
import { RECIPES_PAGE } from "const";

const SearchBox = () => {
  const nav = useNavigate();
  const [panelStatus, setPanelStatus] = useState(false);
  const [{ query }, setParams] = useUrlQueryParam(["query"]);
  const [autoCompleteList, setAutoCompleteList] = useState<string[]>([]);

  const { run: autoComplete } = useLoadAutoComplete(AutoCompleteListFilter);

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

  const handlePanelOpen = () => {
    setPanelStatus(!panelStatus);
  };

  const handleInput = (query: string) => {
    setParams({
      query,
    });
    if (query) {
      autoComplete(query);
    } else {
      setAutoCompleteList([]);
    }
  };

  const handleSearch = () => {
    if (query) {
      nav(RECIPES_PAGE + window.location.search);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchYield}>
        <ActionIcon
          className={styles.filterBtn}
          variant="subtle"
          size="xl"
          aria-label="Filter"
          onClick={handlePanelOpen}
        >
          <BsFilter />
        </ActionIcon>
        <Autocomplete
          className={styles.InputControl}
          variant="unstyled"
          placeholder="Find 333,000+ recipes"
          onChange={handleInput}
          value={query}
          data={autoCompleteList}
        />
        <ActionIcon
          className={styles.searchBtn}
          variant="subtle"
          size="xl"
          aria-label="Search"
          onClick={handleSearch}
        >
          <BiSearch />
        </ActionIcon>
      </div>
      <Collapse in={panelStatus} transitionDuration={500}>
        <div className={styles.advancedOptions}></div>
      </Collapse>
    </div>
  );
};

export default SearchBox;
