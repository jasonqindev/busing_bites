import { intolerances as intolerancesList } from "utils/recipeData";
import { Select } from "@mantine/core";
import { useUrlQueryParam } from "utils";

const IntolerancesSelect = () => {
  const [{ intolerances = "" }, setParams] = useUrlQueryParam(["intolerances"]);

  return (
    <Select
      placeholder="pick a intolerance type"
      value={intolerances}
      label="Intolerances"
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
