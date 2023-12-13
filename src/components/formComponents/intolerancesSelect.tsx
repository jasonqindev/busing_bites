import { Select } from "@mantine/core";
import { intolerances as intolerancesList } from "utils/recipeData";
import { useUrlQueryParam } from "utils";
import { FC } from "react";
import { IProps } from ".";

const IntolerancesSelect: FC<IProps> = ({ disabled }) => {
  const [{ intolerances = "" }, setParams] = useUrlQueryParam(["intolerances"]);

  return (
    <Select
      placeholder="Select allergens"
      value={intolerances}
      label="Allergens"
      data={intolerancesList}
      clearable
      disabled={disabled}
      onChange={(value) => {
        setParams({
          intolerances: value,
        });
      }}
    />
  );
};

export default IntolerancesSelect;
