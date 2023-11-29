import {
  Box,
  Button,
  ComboboxItem,
  FileButton,
  Group,
  Image,
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
import { useUpdateUserinfo } from "hooks/useLoadUserinfo";
import toast from "react-hot-toast";
import { useAuthCheck } from "hooks/useAuthCheck";
import { useUploadImg } from "hooks/useUpload";
import { default_avatar } from "const";

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
  const { currentUser, setCurrentUser } = useAuth();
  const [disabled, setDisabled] = useState(true);
  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      avatar: default_avatar,
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

  const { run: upload } = useUploadImg((res) => {
    form.setValues({
      avatar: res.url,
    });
  });

  const { run: updateUserinfo, loading } = useUpdateUserinfo((data) => {
    setDisabled(!disabled);
    toast.success("update userinfo successfully");
    setCurrentUser({ ...currentUser, ...data });
  });

  useEffect(() => {
    if (currentUser) {
      const {
        username = "",
        email = "",
        avatar = default_avatar,
        gender = "male",
        age = 18,
        height = "",
        weight = "",
        dietPlan = "",
        firstName = "",
        lastName = "",
      } = currentUser;

      form.setValues({
        username,
        email,
        firstName,
        lastName,
        avatar,
        gender,
        age,
        height,
        weight,
        dietPlan,
      });
    }
  }, [currentUser]); // eslint-disable-line

  const handleAvatar = (file: File | null) => {
    if (file) {
      upload(file);
    }
  };

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
    <div className={styles.mainPage}>
      <LoadingOverlay visible={loading} zIndex={1000} />
      <Group className={styles.title}>
        <Title mr={50}>Profile</Title>
        <Switch
          checked={disabled}
          label={disabled ? "Edit" : "Save"}
          size="md"
          onChange={handleSwitch}
        />
      </Group>
      <form className={styles.form}>
        <Box mb={30}>
          <Text fw={500} mb={15}>
            avatar
          </Text>
          <Image mb={15} src={form.values.avatar}></Image>
          <FileButton onChange={handleAvatar} accept="image/png,image/jpeg">
            {(props) => (
              <Button disabled={disabled} {...props} size="xs">
                Upload image
              </Button>
            )}
          </FileButton>
        </Box>
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
    </div>
  );
}

export default UserinfoPage;
