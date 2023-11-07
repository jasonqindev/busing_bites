import { cuisines } from "utils/recipeData";
import styles from "./cuisinesSelect.module.scss";
import { Select } from "@mantine/core";
import { useUrlQueryParam } from "utils";

const CuisinesSelect = () => {
  const [{ cuisine = "" }, setParams] = useUrlQueryParam(["cuisine"]);

  return (
    <Select
      placeholder="pick a cuisine type"
      value={cuisine}
      label="cuisine"
      data={cuisines}
      clearable
      onChange={(value) => {
        setParams({
          cuisine: value,
        });
      }}
    />
  );
};

export default CuisinesSelect;
