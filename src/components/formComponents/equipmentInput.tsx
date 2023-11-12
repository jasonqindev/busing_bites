import { useUrlQueryParam } from "utils";
import { TagsInput } from "@mantine/core";

const EquipmentInput = () => {
  const [{ equipment = undefined }, setParams] = useUrlQueryParam([
    "equipment",
  ]);

  const handleEnter = (value: string[]) => {
    setParams({
      equipment: value.join(","),
    });
  };

  return (
    <TagsInput
      label="Press Enter a equipment"
      placeholder="Enter equipment"
      defaultValue={equipment ? equipment.split(",") : undefined}
      clearable
      onChange={handleEnter}
    />
  );
};

export default EquipmentInput;
