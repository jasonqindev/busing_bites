import { } from 'firebase/auth';

import { Anchor, Button, Checkbox, Group, Paper, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { FC, useContext, useState } from 'react';
import { registerUser, signInUser, signOutUser, userStateListener } from '../../../firebase/firebase';

import { AuthContext } from 'context/auth-context';
import styles from './verify.module.scss';
import { useNavigate } from 'react-router-dom'

const Verify: FC = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.loginRoot}>
            <Paper radius="md" p="xl" maw='500px' className={styles.login}>
                <Title order={2} mb={10}>
                    Check your email!
                </Title>

                <Group mb="xs">
                    <Text>We've sent you an email to verify your account!</Text>
                </Group>

                <Group>
                    <Anchor component='button' size='sm' onClick={() => navigate('/auth/login')}>
                        Return to Login
                    </Anchor>
                </Group>
            </Paper>
        </div>
    );
}

export default Verify;