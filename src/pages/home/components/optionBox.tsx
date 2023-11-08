import { FC } from "react";
import styles from "./components.module.scss";
import { Collapse, Group, Box } from "@mantine/core";
import { getFormComponents } from "components/formComponents";

interface PropsType {
  panelStatus: boolean;
}

const formCompLayout = [
  ["cuisines", "diet"],
  ["intolerances", "type"],
  ["equipment"],
  ["includeIngreds"],
  ["excludeIngreds"],
];

const OptionBox: FC<PropsType> = ({ panelStatus }) => {
  return (
    <Collapse in={panelStatus} transitionDuration={500}>
      <Box className={styles.advancedOptions}>
        {formCompLayout.map((rows, index) => (
          <Group key={index} grow>
            {rows.map((c, c_index) => (
              <Box key={c_index} className={styles.formControl}>
                {getFormComponents(c)}
              </Box>
            ))}
          </Group>
        ))}
      </Box>
    </Collapse>
  );
};

export default OptionBox;
