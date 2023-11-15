import { useUrlQueryParam } from "utils";
import { TagsInput } from "@mantine/core";

const ExcludeIngredsInput = () => {
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
      label="Press Enter ingredients out the recipe"
      placeholder="Enter ingredients"
      defaultValue={
        excludeIngredients ? excludeIngredients.split(",") : undefined
      }
      clearable
      onChange={handleEnter}
    />
  );
};

export default ExcludeIngredsInput;
