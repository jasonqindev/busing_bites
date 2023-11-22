import { TagsInput } from "@mantine/core";
import { useUrlQueryParam } from "utils";

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
      label="equipment"
      placeholder="enter equipment"
      defaultValue={equipment ? equipment.split(",") : undefined}
      clearable
      onChange={handleEnter}
    />
  );
};

export default EquipmentInput;
