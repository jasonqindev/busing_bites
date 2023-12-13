import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  MultiSelect,
  NumberInput,
  Paper,
  TagsInput,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { diets, foodType } from "utils/recipeData";
import { isNotEmpty, useForm } from "@mantine/form";

import { BsFillTrashFill } from "react-icons/bs";
import ImageUpload from "./components/imageUpload";
import { PROFILE_PAGE } from "const";
import styles from "./recipeCreate.module.scss";
import toast from "react-hot-toast";
import { useAuthCheck } from "hooks/useAuthCheck";
import { useNavigate } from "react-router-dom";
import { useUploadRecipe } from "hooks/useUpload";
import { useEffect } from "react";
import { useAuth } from "context/auth-context";

const RecipeCreate = () => {
  const nav = useNavigate();
  const { checkAuth } = useAuthCheck();
  const { currentUser } = useAuth();

  const form = useForm({
    initialValues: {
      userId: "",
      title: "",
      image: "",
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
      title: isNotEmpty("Recipe name can not be empty"),
      image: isNotEmpty("Recipe image has to be uploaded"),
      // diets: isNotEmpty("diets can not be empty"),
      dishTypes: isNotEmpty("Dish type can not be empty"),
      readyInMinutes: isNotEmpty("Time can not be empty"),
      servings: isNotEmpty("Servings can not be empty"),
      ingredients: isNotEmpty("Ingredients can not be empty"),
      steps: {
        step: isNotEmpty("Must include a step description"),
      },
    },
  });

  useEffect(() => {
    if (currentUser) {
      form.setValues({
        userId: currentUser.uid,
      });
    }
  }, [currentUser]); //eslint-disable-line

  const { run: submit } = useUploadRecipe(() => {
    toast.success("Recipe submitted successfully!", { duration: 2000 });
    setTimeout(() => {
      nav(PROFILE_PAGE);
    }, 2000);
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

  const handleImage = (image: string) => {
    form.setValues({
      image,
    });
  };

  const handleSubmit = () => {
    if (!checkAuth()) return;
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    const data = form.getTransformedValues();
    submit(data);
  };

  return (
    <div className={styles.recipePage}>
      <Paper shadow="xl" radius="lg" className={styles.container}>
        <Title mb={20}>Submit your own Recipe</Title>

        <form>
          <Title order={3} pt={30} mb={20}>
            Basic
          </Title>
          <Box className={styles.formItem}>
            <TextInput
              label="Title"
              placeholder="Name your recpie"
              {...form.getInputProps("title")}
            />
          </Box>
          <Box className={styles.formItem}>
            <Text className={styles.title}>Recipe Cover Image</Text>
            <ImageUpload image={form.values.image} setImage={handleImage} />
          </Box>
          <Title order={3} pt={30} mb={20}>
            Options
          </Title>
          <Box className={[styles.formItem, styles.twoInLine].join(" ")}>
            <NumberInput
              label="Servings"
              placeholder="Servings"
              suffix="&nbsp;servings"
              hideControls
              allowNegative={false}
              mr={30}
              min={1}
              max={99}
              {...form.getInputProps("servings")}
            />
            <NumberInput
              label="Prep Time"
              placeholder="Minutes"
              suffix="&nbsp;minutes"
              allowNegative={false}
              hideControls
              {...form.getInputProps("readyInMinutes")}
            />
          </Box>
          <Group grow mb={20} align="start" className={styles.SelectBox}>
            <Box>
              <MultiSelect
                label="Diets"
                placeholder="Select diets"
                data={diets}
                mr={30}
                {...form.getInputProps("diets")}
              />
            </Box>
            <Box>
              <MultiSelect
                label="Cuisine"
                placeholder="Select cuisine"
                data={foodType}
                mr={30}
                {...form.getInputProps("dishTypes")}
              />
            </Box>
          </Group>
          <Box className={styles.formItem}>
            <TagsInput
              label="Ingredients"
              placeholder="Select ingredients"
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
                    placeholder="Explain this step"
                    minRows={2}
                    mb={20}
                    {...form.getInputProps(`steps.${index}.step`)}
                  />
                  <Box className={styles.twoInLine}>
                    <TagsInput
                      placeholder="Select ingredients"
                      mr={30}
                      {...form.getInputProps(`steps.${index}.ingredients`)}
                    />
                    <TagsInput
                      placeholder="Select equipment"
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
            <Button onClick={handleSubmit} color="indigo" size="lg">
              Submit Recipe
            </Button>
          </Center>
        </form>
      </Paper>
    </div>
  );
};

export default RecipeCreate;
