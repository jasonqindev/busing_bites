import { TagsInput } from "@mantine/core";
import { useUrlQueryParam } from "utils";

const IncludeIngredsInput = () => {
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
    />
  );
};

export default IncludeIngredsInput;
