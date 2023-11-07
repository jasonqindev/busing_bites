import { foodType } from "utils/recipeData";
import { Select } from "@mantine/core";
import { useUrlQueryParam } from "utils";

const TypeSelect = () => {
  const [{ type = "" }, setParams] = useUrlQueryParam(["type"]);

  return (
    <Select
      placeholder="pick a dish type"
      value={type}
      label="type"
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
