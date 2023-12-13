import { Select } from "@mantine/core";
import { diets } from "utils/recipeData";
import { useUrlQueryParam } from "utils";
import { FC } from "react";
import { IProps } from ".";

const DietSelect: FC<IProps> = ({ disabled }) => {
  const [{ diet = "" }, setParams] = useUrlQueryParam(["diet"]);

  return (
    <Select
      placeholder="Select a diet type"
      value={diet}
      label="Diet"
      data={diets}
      clearable
      disabled={disabled}
      onChange={(value) => {
        setParams({
          diet: value,
        });
      }}
    />
  );
};

export default DietSelect;
