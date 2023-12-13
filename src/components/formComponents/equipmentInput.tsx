import { TagsInput } from "@mantine/core";
import { FC } from "react";
import { useUrlQueryParam } from "utils";
import { IProps } from ".";

const EquipmentInput: FC<IProps> = ({ disabled }) => {
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
      label="Equipment"
      placeholder="Select equipment"
      defaultValue={equipment ? equipment.split(",") : undefined}
      clearable
      onChange={handleEnter}
      disabled={disabled}
    />
  );
};

export default EquipmentInput;
