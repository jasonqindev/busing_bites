import { Box, Group } from "@mantine/core";
import { FC } from "react";
import GaugeBox from "./gauge";

interface ItemType {
  name: string;
  amount: number;
}

interface PropsType {
  gIndex: ItemType;
  gLoad: ItemType;
}

const GlycemicInfo: FC<PropsType> = ({ gIndex, gLoad }) => {
  return (
    <Group grow>
      <Box>
        <GaugeBox {...gIndex} />
      </Box>
      <Box>
        <GaugeBox {...gLoad} />
      </Box>
    </Group>
  );
};

export default GlycemicInfo;
