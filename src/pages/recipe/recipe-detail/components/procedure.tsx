import { RecipeProps } from "types/recipeAjax";
import styles from "./components.module.scss";
import {
  Timeline,
  Text,
  Group,
  Title,
  Image,
  Flex,
  Tooltip,
} from "@mantine/core";

const Procedure = ({ analyzedInstructions = [] }: RecipeProps) => {
  return (
    <div className={styles.procedureContainer}>
      <Title order={2} mb={50}>
        Cooking Instructions
      </Title>
      {analyzedInstructions.map((instruction, index) => {
        return (
          <Timeline
            key={index}
            color="green"
            active={instruction.steps.length}
            bulletSize={30}
            lineWidth={2}
          >
            {instruction.steps.map((procedure: any, index: number) => {
              const { step = "", ingredients = [], equipment = [] } = procedure;
              return (
                <Timeline.Item bullet={index + 1} key={procedure.number}>
                  <Title order={4}>{step}</Title>
                  {!!ingredients.length && (
                    <Group mt={10}>
                      <Text size="sm" mr={1} component="span" fw={500}>
                        Ingredients:
                      </Text>
                      <Flex gap="md">
                        {ingredients.map((item: any) => {
                          return (
                            <Tooltip
                              key={item.id}
                              arrowOffset={50}
                              arrowSize={4}
                              label={item.name}
                              withArrow
                              position="top"
                              color="gray"
                            >
                              <Image
                                mr={10}
                                height={50}
                                src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
                                alt={item.name}
                              />
                            </Tooltip>
                          );
                        })}
                      </Flex>
                    </Group>
                  )}
                  {!!equipment.length && (
                    <Group mt={10} gap="xs">
                      <Text size="sm" mr={1} component="span" fw={500}>
                        Equipment:
                      </Text>
                      <Flex gap="md">
                        {equipment.map((item: any) => {
                          return (
                            <Tooltip
                              key={item.id}
                              arrowOffset={50}
                              arrowSize={4}
                              label={item.name}
                              withArrow
                              position="top"
                              color="gray"
                            >
                              <Image
                                height={50}
                                src={`https://spoonacular.com/cdn/equipment_100x100/${item.image}`}
                                alt={item.name}
                              />
                            </Tooltip>
                          );
                        })}
                      </Flex>
                    </Group>
                  )}
                </Timeline.Item>
              );
            })}
          </Timeline>
        );
      })}
    </div>
  );
};

export default Procedure;
