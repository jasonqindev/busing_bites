import { Select } from "@mantine/core";
import { intolerances as intolerancesList } from "utils/recipeData";
import { useUrlQueryParam } from "utils";

const IntolerancesSelect = () => {
  const [{ intolerances = "" }, setParams] = useUrlQueryParam(["intolerances"]);

  return (
    <Select
      placeholder="Select allergens"
      value={intolerances}
      label="Allergens"
      data={intolerancesList}
      clearable
      onChange={(value) => {
        setParams({
          intolerances: value,
        });
      }}
    />
  );
};

export default IntolerancesSelect;
