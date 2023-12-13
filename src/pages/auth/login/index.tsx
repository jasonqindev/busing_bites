import {} from "firebase/auth";

import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { AuthContext, AuthProvider, useAuth } from "context/auth-context";
import {
  BsApple,
  BsDiscord,
  BsGoogle,
  BsMicrosoft,
  BsTwitter,
} from "react-icons/bs";
import { FC, useContext, useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import {
  signInUser,
  signOutUser,
  userStateListener,
} from "../../../firebase/firebase";

import { HOME_PAGE } from "const";
import SocialButton from "./components/socialbutton";
import styles from "./login.module.scss";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate(HOME_PAGE);
    }
  }, [currentUser]); // eslint-disable-line

  const handleLogin = async () => {
    if (!email && !password) return;

    setLoading(true);
    setErrored(false);

    try {
      await signInUser(email, password);
      navigate(HOME_PAGE);
    } catch (error) {
      console.log(error);
      setErrored(true);
    }

    setLoading(false);
  };

  return (
    <div className={styles.loginRoot}>
      <Paper radius="md" p="xl" maw="500px" className={styles.login}>
        <Title order={2} mb={10}>
          Login
        </Title>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="john.doe@example.com"
              radius="md"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              error={errored && "Invalid email or password"}
              type="email"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              radius="md"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              error={errored && "Invalid email or password"}
            />
          </Stack>


          <Group justify="space-between" mt="lg">
            <Button
              type="submit"
              onClick={handleLogin}
              disabled={loading}
              fullWidth
            >
              Login
            </Button>
          </Group>
          
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor
              component="button"
              size="sm"
              onClick={() => navigate("/auth/forgot")}
            >
              Forgot password?
            </Anchor>
          </Group>

          <Group mt="xs">
            <Anchor
              component="button"
              size="sm"
              onClick={() => navigate("/auth/register")}
            >
              Don't have an account?
            </Anchor>
          </Group>
        </form>

        {/* <Divider label="Or sign in with" labelPosition="center" my="lg" />

        <SocialButton icon={<BsGoogle />} fullWidth>
          Sign in with Google
        </SocialButton>
        <SocialButton icon={<BsTwitter />} fullWidth mt="xs">
          Sign in with Twitter
        </SocialButton>
        <SocialButton icon={<BsDiscord />} fullWidth mt="xs">
          Sign in with Discord
        </SocialButton>
        <SocialButton icon={<BsMicrosoft />} fullWidth mt="xs">
          Sign in with Microsoft
        </SocialButton>
        <SocialButton icon={<BsApple />} fullWidth mt="xs">
          Sign in with Apple
        </SocialButton> */}
      </Paper>
    </div>
  );
};

export default Login;
