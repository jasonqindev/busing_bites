import { Select } from "@mantine/core";
import { cuisines } from "utils/recipeData";
import { useUrlQueryParam } from "utils";

const CuisinesSelect = () => {
  const [{ cuisine = "" }, setParams] = useUrlQueryParam(["cuisine"]);

  return (
    <Select
      placeholder="Select a cuisine type"
      value={cuisine}
      label="Cuisine"
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
