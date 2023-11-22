import { TagsInput } from "@mantine/core";
import { useUrlQueryParam } from "utils";

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
      label="Specific ingredients to exclude"
      placeholder="Exclude ingredients"
      defaultValue={
        excludeIngredients ? excludeIngredients.split(",") : undefined
      }
      clearable
      onChange={handleEnter}
    />
  );
};

export default ExcludeIngredsInput;
