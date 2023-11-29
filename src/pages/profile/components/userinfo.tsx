import {
  Box,
  ComboboxItem,
  Group,
  LoadingOverlay,
  NumberInput,
  Select,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import styles from "../profile.module.scss";
import { isInRange, isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useAuth } from "context/auth-context";
import { useGetUserinfo, useUpdateUserinfo } from "hooks/useLoadUserinfo";
import toast from "react-hot-toast";
import { useAuthCheck } from "hooks/useAuthCheck";

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

function UserinfoPage() {
  const { checkAuth } = useAuthCheck();
  const { currentUser } = useAuth();
  const [disabled, setDisabled] = useState(true);
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      age: 18,
      gender: "male",
      height: "",
      weight: "",
      dietPlan: "",
    },

    validate: {
      firstName: isNotEmpty("first name can not be empty"),
      lastName: isNotEmpty("last name can not be empty"),
      age: isInRange({ min: 5, max: 99 }, "You must set 5-99"),
      height: isNotEmpty("height can not be empty"),
      weight: isNotEmpty("weight can not be empty"),
      dietPlan: isNotEmpty("diet plan can not be empty"),
    },
  });
  const { data: userinfo, run: getUserinfo } = useGetUserinfo();
  const { run: updateUserinfo, loading } = useUpdateUserinfo(() => {
    setDisabled(!disabled);
    toast.success("update userinfo successfully");
  });

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      getUserinfo(currentUser.uid);
    }
  }, [currentUser]); // eslint-disable-line

  useEffect(() => {
    if (userinfo) {
      const {
        username = "",
        email = "",
        gender = "male",
        age = 18,
        height = "",
        weight = "",
        dietPlan = "",
        firstName = "",
        lastName = "",
      } = userinfo;

      form.setValues({
        username,
        email,
        firstName,
        lastName,
        gender,
        age,
        height,
        weight,
        dietPlan,
      });
    }
  }, [userinfo]); // eslint-disable-line

  const handleSwitch = () => {
    if (!checkAuth()) return;

    if (disabled) {
      setDisabled(!disabled);
      return;
    }

    const { hasErrors } = form.validate();
    if (hasErrors) return;
    const data = form.getTransformedValues();
    if (currentUser && currentUser.uid) {
      updateUserinfo(currentUser.uid, data);
    }
  };

  return (
    <>
      <LoadingOverlay visible={loading} zIndex={1000} />
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
            readOnly
            style={{ width: "400px" }}
            label="email"
            {...form.getInputProps("email")}
            description={"readonly"}
          />
        </Box>
        <Box className={styles.fromItemGroup} mb={30}>
          <TextInput
            readOnly
            label="username"
            {...form.getInputProps("username")}
            description={"readonly"}
          />
        </Box>
        <Box className={styles.fromItemGroup} mb={30}>
          <TextInput
            readOnly={disabled}
            label="first name"
            maxLength={20}
            mr={30}
            {...form.getInputProps("firstName")}
          />
          <TextInput
            readOnly={disabled}
            label="last name"
            maxLength={20}
            {...form.getInputProps("lastName")}
          />
        </Box>
        <Box className={styles.fromItemGroup} mb={30}>
          <Select
            readOnly={disabled}
            label="gender"
            data={["male", "female"]}
            {...form.getInputProps("gender")}
          />
        </Box>
        <Box className={styles.fromItemGroup} mb={30}>
          <NumberInput
            readOnly={disabled}
            mr={20}
            label="age"
            maxLength={2}
            hideControls
            {...form.getInputProps("age")}
          />
        </Box>
        <Box className={styles.fromItemGroup} mb={30}>
          <NumberInput
            readOnly={disabled}
            rightSection={<Text style={{ flex: "0 0 40px" }}>cm</Text>}
            mr={20}
            label="height"
            maxLength={3}
            {...form.getInputProps("height")}
          />
          <NumberInput
            readOnly={disabled}
            rightSection={<Text style={{ flex: "0 0 40px" }}>kg</Text>}
            label="weight"
            maxLength={3}
            {...form.getInputProps("weight")}
          />
        </Box>
        <Box className={styles.fromItemGroup}>
          <Select
            readOnly={disabled}
            label="diet plan"
            data={dietPlan}
            {...form.getInputProps("dietPlan")}
          />
        </Box>
      </form>
    </>
  );
}

export default UserinfoPage;
