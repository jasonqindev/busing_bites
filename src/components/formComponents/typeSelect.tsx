import { Select } from "@mantine/core";
import { foodType } from "utils/recipeData";
import { useUrlQueryParam } from "utils";

const TypeSelect = () => {
  const [{ type = "" }, setParams] = useUrlQueryParam(["type"]);

  return (
    <Select
      placeholder="Select a dish type"
      value={type}
      label="Type"
      data={foodType}
      clearable
      onChange={(value) => {
        setParams({
          type: value,
        });
      }}
    />
  );
};

export default TypeSelect;
