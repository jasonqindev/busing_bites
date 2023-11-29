import {} from "firebase/auth";

import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { FC, useContext, useEffect, useState } from "react";
import {
  registerUser,
  signInUser,
  signOutUser,
  userStateListener,
} from "../../../firebase/firebase";

import { useAuth } from "context/auth-context";
import styles from "./register.module.scss";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useCreateUser } from "hooks/useLoadUserinfo";
import { HOME_PAGE } from "const";

const Login: FC = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate(HOME_PAGE);
    }
  }, [currentUser]); // eslint-disable-line

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      terms: false,
    },

    validate: {
      username: (val) =>
        val.length <= 3
          ? "Username should include at least 3 characters"
          : null,
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email addresss"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      confirm_password: (val, values) =>
        val !== values.password ? "Passwords do not match" : null,
      terms: (val) => (val === true ? null : "You must accept terms of use"),
    },
  });

  const { run: createUser } = useCreateUser();

  const handleRegister = async () => {
    form.validate();
    if (!form.isValid) return;

    setLoading(true);

    const username = form.values.username;
    const email = form.values.email;
    const password = form.values.password;
    try {
      const res = await registerUser(username, email, password);
      if (res && res.user) {
        await createUser(res.user.uid, { username, email, password });
      }
      navigate("/auth/verify");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className={styles.loginRoot}>
      <Paper radius="md" p="xl" maw="500px" className={styles.login}>
        <Title order={2} mb={10}>
          Register
        </Title>

        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <TextInput
              required
              label="Username"
              placeholder="john.doe.2131"
              radius="md"
              value={form.values.username}
              onChange={(event) =>
                form.setFieldValue("username", event.currentTarget.value)
              }
              error={form.errors.username}
            />

            <TextInput
              required
              label="Email"
              placeholder="john.doe@example.com"
              radius="md"
              type="email"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              radius="md"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={form.errors.password}
            />

            <PasswordInput
              required
              label="Confirm Password"
              placeholder="Confirm your password"
              radius="md"
              value={form.values.confirm_password}
              onChange={(event) =>
                form.setFieldValue(
                  "confirm_password",
                  event.currentTarget.value
                )
              }
              error={form.errors.confirm_password}
            />
          </Stack>

          <Group mt="sm">
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
              error={form.errors.terms}
            />
          </Group>

          <Group justify="space-between" mt="sm">
            <Button
              type="submit"
              onClick={handleRegister}
              disabled={loading}
              fullWidth
            >
              Register
            </Button>
          </Group>

          <Group mt="xs">
            <Anchor
              component="button"
              size="sm"
              onClick={() => navigate("/auth/login")}
            >
              Already have an account?
            </Anchor>
          </Group>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
