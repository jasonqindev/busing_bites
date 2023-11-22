import { FormEvent, useState } from "react";
import { sendThePasswordResetEmail } from "../../../firebase/firebase";
import styles from './forgot.module.scss';
import { Paper, Title, TextInput, Group, Button } from '@mantine/core'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [emailMessage, setEmailMessage] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await sendThePasswordResetEmail(email);
      setEmailMessage(true);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        alert('User not found, try again!')
        setEmail('')
      }
    }
  };

  return (
    <div className={styles.forgotRoot}>
      <Paper radius="md" p="xl" maw='500px' className={styles.forgot}>
        <Title order={2} mb={10}>
          Forgot Password
        </Title>
        {
          emailMessage ?
            <h3>The Email has been sent<br/> Check your Inbox!</h3> :
            <form onSubmit={handleSubmit}>
              <TextInput
                required
                label="Email"
                type="email"
                name="email"
                placeholder="name@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Group justify="space-between" mt="lg">
                <Button type='submit' fullWidth>
                  Reset Your Password
                </Button>
              </Group>
            </form>
        }
      </Paper>
    </div>
  )
}

export default ForgotPassword
