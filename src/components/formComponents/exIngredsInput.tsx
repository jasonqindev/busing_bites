import { TagsInput } from "@mantine/core";
import { FC } from "react";
import { useUrlQueryParam } from "utils";
import { IProps } from ".";

const ExcludeIngredsInput: FC<IProps> = ({ disabled }) => {
  const [{ excludeIngredients = undefined }, setParams] = useUrlQueryParam([
    "excludeIngredients",
  ]);

  const handleEnter = (value: string[]) => {
    setParams({
      excludeIngredients: value.join(","),
    });
  };

  return (
    <TagsInput
      label="Ingredients to exclude"
      placeholder="Exclude ingredients"
      defaultValue={
        excludeIngredients ? excludeIngredients.split(",") : undefined
      }
      clearable
      onChange={handleEnter}
      disabled={disabled}
    />
  );
};

export default ExcludeIngredsInput;
