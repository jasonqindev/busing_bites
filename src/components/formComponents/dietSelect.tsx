import { Select } from "@mantine/core";
import { diets } from "utils/recipeData";
import { useUrlQueryParam } from "utils";

const DietSelect = () => {
  const [{ diet = "" }, setParams] = useUrlQueryParam(["diet"]);

  return (
    <Select
      placeholder="Select a diet type"
      value={diet}
      label="Diet"
      data={diets}
      clearable
      onChange={(value) => {
        setParams({
          diet: value,
        });
      }}
    />
  );
};

export default DietSelect;
