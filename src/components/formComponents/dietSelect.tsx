import { diets } from "utils/recipeData";
import { Select } from "@mantine/core";
import { useUrlQueryParam } from "utils";

const DietSelect = () => {
  const [{ diet = "" }, setParams] = useUrlQueryParam(["diet"]);

  return (
    <Select
      placeholder="pick a diet type"
      value={diet}
      label="diet"
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
