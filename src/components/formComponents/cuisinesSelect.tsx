import { Select } from "@mantine/core";
import { cuisines } from "utils/recipeData";
import { useUrlQueryParam } from "utils";
import { FC } from "react";
import { IProps } from ".";

const CuisinesSelect: FC<IProps> = ({ disabled }) => {
  const [{ cuisine = "" }, setParams] = useUrlQueryParam(["cuisine"]);

  return (
    <Select
      placeholder="Select a cuisine type"
      value={cuisine}
      label="Cuisine"
      data={cuisines}
      clearable
      disabled={disabled}
      onChange={(value) => {
        setParams({
          cuisine: value,
        });
      }}
    />
  );
};

export default CuisinesSelect;
