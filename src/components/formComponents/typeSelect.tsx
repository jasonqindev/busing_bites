import { Select } from "@mantine/core";
import { foodType } from "utils/recipeData";
import { useUrlQueryParam } from "utils";
import { FC } from "react";
import { IProps } from ".";

const TypeSelect: FC<IProps> = ({ disabled }) => {
  const [{ type = "" }, setParams] = useUrlQueryParam(["type"]);

  return (
    <Select
      placeholder="Select a dish type"
      value={type}
      label="Type"
      data={foodType}
      clearable
      disabled={disabled}
      onChange={(value) => {
        setParams({
          type: value,
        });
      }}
    />
  );
};

export default TypeSelect;
