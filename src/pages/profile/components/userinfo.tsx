import {
  Box,
  ComboboxItem,
  Group,
  NumberInput,
  Select,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import styles from "../profile.module.scss";
import { isEmail, isInRange, isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";

const dietPlan: ComboboxItem[] = [
  {
    label: "Lose Weight",
    value: "0",
  },
  {
    label: "Maintain Weight",
    value: "1",
  },
  {
    label: "Gain Weight",
    value: "2",
  },
];

function Userinfo() {
  const [disabled, setDisabled] = useState(true);
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: 18,
      gender: "male",
      height: "",
      weight: "",
      dietPlan: "",
    },

    validate: {
      firstName: isNotEmpty("first name can not be empty"),
      lastName: isNotEmpty("last name can not be empty"),
      email: isEmail("Invalid email"),
      age: isInRange({ min: 5, max: 99 }, "You must set 5-99"),
      height: isNotEmpty("height can not be empty"),
      weight: isNotEmpty("weight can not be empty"),
      dietPlan: isNotEmpty("diet plan can not be empty"),
    },
  });

  const handleSwitch = () => {
    if (disabled) {
      setDisabled(!disabled);
      return;
    }

    const { hasErrors } = form.validate();
    if (hasErrors) return;
    const data = form.getTransformedValues();
    console.log(data);

    setDisabled(!disabled);
  };

  return (
    <>
      <Group mb={30}>
        <Title mr={50}>Profile</Title>
        <Switch
          checked={disabled}
          label={disabled ? "Edit" : "Save"}
          size="md"
          onChange={handleSwitch}
        />
      </Group>
      <form>
        <Box className={styles.fromItemGroup} mb={30}>
          <TextInput
            disabled={disabled}
            label="first name"
            maxLength={20}
            mr={30}
            {...form.getInputProps("firstName")}
          />
          <TextInput
            disabled={disabled}
            label="last name"
            maxLength={20}
            {...form.getInputProps("lastName")}
          />
        </Box>
        <Box className={styles.fromItemGroup} mb={30}>
          <TextInput
            disabled={disabled}
            style={{ width: "400px" }}
            label="email"
            {...form.getInputProps("email")}
          />
        </Box>
        <Box className={styles.fromItemGroup} mb={30}>
          <Select
            disabled={disabled}
            label="gender"
            data={["male", "female"]}
            {...form.getInputProps("gender")}
          />
        </Box>
        <Box className={styles.fromItemGroup} mb={30}>
          <NumberInput
            disabled={disabled}
            mr={20}
            label="age"
            maxLength={2}
            hideControls
            {...form.getInputProps("age")}
          />
        </Box>
        <Box className={styles.fromItemGroup} mb={30}>
          <NumberInput
            disabled={disabled}
            rightSection={<Text style={{ flex: "0 0 40px" }}>cm</Text>}
            mr={20}
            label="height"
            maxLength={3}
            {...form.getInputProps("height")}
          />
          <NumberInput
            disabled={disabled}
            rightSection={<Text style={{ flex: "0 0 40px" }}>kg</Text>}
            label="weight"
            maxLength={3}
            {...form.getInputProps("weight")}
          />
        </Box>
        <Box className={styles.fromItemGroup}>
          <Select
            disabled={disabled}
            label="diet plan"
            data={dietPlan}
            {...form.getInputProps("dietPlan")}
          />
        </Box>
      </form>
    </>
  );
}

export default Userinfo;
