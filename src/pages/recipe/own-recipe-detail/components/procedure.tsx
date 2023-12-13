import styles from "./components.module.scss";
import { Timeline, Text, Group, Title } from "@mantine/core";

const Procedure = ({ steps = [] }: any) => {
  return (
    <div className={styles.procedureContainer}>
      <Title order={2} mb={50}>
        Cooking Instructions
      </Title>
      <Timeline
        active={steps.length}
        color="green"
        bulletSize={30}
        lineWidth={2}
      >
        {steps.map((procedure: any, index: number) => {
          const { step = "", ingredients = [], equipment = [] } = procedure;
          return (
            <Timeline.Item bullet={index + 1} key={index}>
              <Title order={4}>{step}</Title>
              {!!ingredients.length && (
                <Group mt={10}>
                  <Text size="sm" mr={1} component="span" fw={500}>
                    Ingredients:
                  </Text>
                  <Text>{ingredients.join(", ")}</Text>
                </Group>
              )}
              {!!equipment.length && (
                <Group mt={10} gap="xs">
                  <Text size="sm" mr={1} component="span" fw={500}>
                    Equipment:
                  </Text>
                  <Text>{equipment.join(", ")}</Text>
                </Group>
              )}
            </Timeline.Item>
          );
        })}
      </Timeline>
    </div>
  );
};

export default Procedure;
