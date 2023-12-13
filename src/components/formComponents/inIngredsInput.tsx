import { TagsInput } from "@mantine/core";
import { FC } from "react";
import { useUrlQueryParam } from "utils";
import { IProps } from ".";

const IncludeIngredsInput: FC<IProps> = ({ disabled }) => {
  const [{ includeIngredients = undefined }, setParams] = useUrlQueryParam([
    "includeIngredients",
  ]);

  const handleEnter = (value: string[]) => {
    setParams({
      includeIngredients: value.join(","),
    });
  };

  return (
    <TagsInput
      label="Ingredients to include"
      placeholder="Include ingredients"
      defaultValue={
        includeIngredients ? includeIngredients.split(",") : undefined
      }
      clearable
      onChange={handleEnter}
      disabled={disabled}
    />
  );
};

export default IncludeIngredsInput;
