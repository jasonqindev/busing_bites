import { ActionIcon } from "@mantine/core";
import styles from "./components.module.scss";

import { BsFilter } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { FC } from "react";
import { useUrlQueryParam } from "utils";
import { useNavigate } from "react-router-dom";
import { RECIPES_PAGE } from "const";
import RecipeInput from "components/formComponents/recipeInput";

interface PropsType {
  panelStatus: boolean;
  handlePanelStatus: (status: boolean) => void;
   }

const SearchBox: FC<PropsType> = ({ panelStatus, handlePanelStatus }) => {
  const nav = useNavigate();
  const [{ query }] = useUrlQueryParam(["query"]);

  const handlePanelOpen = () => {
    handlePanelStatus(!panelStatus);
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
        <RecipeInput
          label=""
          className={styles.InputControl}
          variant="unstyled"
          placeholder="Find 333,000+ recipes"
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
    </div>
  );
};

export default SearchBox;
