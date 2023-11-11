import { isNotEmpty, useForm } from "@mantine/form";
import {
  Title,
  TextInput,
  NumberInput,
  Box,
  Text,
  MultiSelect,
  TagsInput,
  Textarea,
  Center,
  Button,
  Paper,
  ActionIcon,
  Group,
} from "@mantine/core";
import styles from "./recipeCreate.module.scss";
import { BsFillTrashFill } from "react-icons/bs";
import ImageUpload from "./components/imageUpload";
import { diets, foodType } from "utils/recipeData";

const RecipeCreate = () => {
  const form = useForm({
    initialValues: {
      title: "",
      readyInMinutes: 30,
      servings: 1,
      dishTypes: [],
      diets: [],
      ingredients: [],
      steps: [
        {
          step: "",
          ingredients: [],
          equipment: [],
        },
      ],
    },

    validate: {
      title: isNotEmpty("recipe name can not be empty"),
      diets: isNotEmpty("diets can not be empty"),
      dishTypes: isNotEmpty("dish type can not be empty"),
      ingredients: isNotEmpty("ingredients can not be empty"),
    },
  });

  const handleAddStep = () => {
    form.insertListItem("steps", {
      step: "",
      ingredients: [],
      equipment: [],
    });
  };

  const handleRemoveStep = (index: number) => {
    form.removeListItem("steps", index);
  };

  return (
    <div className={styles.recipePage}>
      <Paper shadow="xl" radius="lg" className={styles.container}>
        <Title mb={20}>Create your own Recipe</Title>

        <form
          onSubmit={form.onSubmit((values) => {
            console.log(values);
          })}
        >
          <Title order={3} pt={30} mb={20}>
            Basic
          </Title>
          <Box className={styles.formItem}>
            <TextInput
              withAsterisk
              label="recipe name"
              placeholder="name a recipe"
              {...form.getInputProps("title")}
            />
          </Box>
          <Box className={styles.formItem}>
            <Text className={styles.title}>Upload recipe image</Text>
            <ImageUpload />
          </Box>
          <Title order={3} pt={30} mb={20}>
            Options
          </Title>
          <Box className={[styles.formItem, styles.twoInLine].join(" ")}>
            <NumberInput
              label="food serving"
              placeholder="serving"
              suffix="&nbsp;serving"
              hideControls
              allowNegative={false}
              mr={30}
              min={1}
              max={99}
              {...form.getInputProps("servings")}
            />
            <NumberInput
              label="cooking times"
              placeholder="minutes"
              suffix="&nbsp;minutes"
              allowNegative={false}
              hideControls
              {...form.getInputProps("readyInMinutes")}
            />
          </Box>
          <Group grow mb={20} align="start" className={styles.SelectBox}>
            <Box>
              <MultiSelect
                label="diet"
                placeholder="select food's diets"
                data={diets}
                mr={30}
                {...form.getInputProps("diets")}
              />
            </Box>
            <Box>
              <MultiSelect
                label="cuisine"
                placeholder="select cuisine"
                data={foodType}
                mr={30}
                {...form.getInputProps("dishTypes")}
              />
            </Box>
          </Group>
          <Box className={styles.formItem}>
            <TagsInput
              label="include ingredients"
              placeholder="Enter ingredients"
              {...form.getInputProps("ingredients")}
            />
          </Box>

          <Title order={3} pt={30} mb={30}>
            Cooking Instructions
          </Title>
          <Box className={styles.formItem}>
            {form.values.steps.map((step, index) => (
              <Box className={styles.step} key={index} mb={40}>
                <Text className={styles.no} mr={80}>
                  {index + 1}
                </Text>
                <Box className={styles.content}>
                  <Textarea
                    autosize
                    placeholder="instruct each step"
                    minRows={2}
                    mb={20}
                    {...form.getInputProps(`steps.${index}.step`)}
                  />
                  <Box className={styles.twoInLine}>
                    <TagsInput
                      placeholder="Enter ingredients"
                      mr={30}
                      {...form.getInputProps(`steps.${index}.ingredients`)}
                    />
                    <TagsInput
                      placeholder="Enter equipment"
                      {...form.getInputProps(`steps.${index}.equipment`)}
                    />
                  </Box>
                </Box>
                <Center
                  className={styles.deleteBox}
                  style={index > 0 ? { visibility: "visible" } : undefined}
                >
                  <ActionIcon
                    color="red"
                    radius="md"
                    onClick={() => {
                      handleRemoveStep(index);
                    }}
                  >
                    <BsFillTrashFill />
                  </ActionIcon>
                </Center>
              </Box>
            ))}
            <Center mt={50}>
              <Button onClick={handleAddStep}>Add instructions</Button>
            </Center>
          </Box>
          <Center mt={100}>
            <Button type="submit" color="indigo" size="lg">
              Submit Recipe
            </Button>
          </Center>
        </form>
      </Paper>
    </div>
  );
};

export default RecipeCreate;
