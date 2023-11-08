import { FC, useContext, useEffect, useState } from 'react';

import { redirect } from 'react-router-dom'
import { Button, Divider, Group, Paper, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import SocialButton from './components/socialbutton';
import { BsApple, BsDiscord, BsGoogle, BsMicrosoft, BsTwitter } from 'react-icons/bs';

import styles from './login.module.scss';
import { AuthContext } from 'context/auth-context';

const Login: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser === null) {
            redirect('/');
        }
    }, [currentUser]);

    const handleLogin = async () => {
        // TODO: backend
    };

    return (
        <div className={styles.loginRoot}>
            <Paper radius="md" p="xl" maw='500px' className={styles.login}>
                <Title order={2} mb={10}>
                    Login
                </Title>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack>
                        <TextInput
                            required
                            label="Email"
                            placeholder="john.doe@example.com"
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            radius="md"
                        />
                    </Stack>
                </form>

                <Group justify="space-between" mt="lg">
                    <Button type="submit" onClick={handleLogin} fullWidth>
                        Login
                    </Button>
                </Group>

                <Divider label="Or sign in with" labelPosition="center" my="lg" />

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
                </SocialButton>
            </Paper>
        </div>
    );
}

export default Login;