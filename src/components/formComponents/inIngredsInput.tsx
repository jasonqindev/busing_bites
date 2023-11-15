import { useUrlQueryParam } from "utils";
import { TagsInput } from "@mantine/core";

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
      label="Press Enter ingredients in the recipe"
      placeholder="Enter ingredients"
      defaultValue={
        includeIngredients ? includeIngredients.split(",") : undefined
      }
      clearable
      onChange={handleEnter}
    />
  );
};

export default IncludeIngredsInput;
