import { Text, Progress, Box, Tooltip, Group } from "@mantine/core";
import { FC } from "react";
import { Nutrient } from "types/recipeAjax";

const ProgressBox: FC<Nutrient> = ({
  name,
  amount,
  unit,
  percentOfDailyNeeds,
}) => {
  const color =
    percentOfDailyNeeds < 20
      ? "yellow"
      : percentOfDailyNeeds < 80
      ? "green"
      : "red";
  const amountFixed = amount.toFixed(2);
  const percentOfDailyNeedsFixed = percentOfDailyNeeds.toFixed(2);
  return (
    <Box mb={10}>
      <Text fw={700} mb={5}>
        {name}
      </Text>
      <Group>
        <Progress.Root size={18} radius="xl" style={{ width: "80%" }}>
          <Tooltip label={`${amountFixed} ${unit}`}>
            <Progress.Section
              value={Number(percentOfDailyNeedsFixed)}
              color={color}
              style={{ transition: "all 0.5s" }}
            >
              <Progress.Label>{percentOfDailyNeedsFixed}%</Progress.Label>
            </Progress.Section>
          </Tooltip>
        </Progress.Root>
        <Text>
          {amountFixed} {unit}
        </Text>
      </Group>
    </Box>
  );
};

export default ProgressBox;
