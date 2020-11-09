import { Button, Flex, Text, useToast } from '@chakra-ui/core'
import { firebase } from '@firebase/client'
import {
  EmailInput,
  LinkWrapper,
  MustBeSignedOut,
  PasswordInput,
} from '@root/components'
import useControlledInput from '@root/hooks/useControlledInput'
import useLoading from '@root/hooks/useLoading'
import classes from '@styles/Login.module.css'
import 'firebase/auth'
import { NextPage } from 'next'
import { FormEvent } from 'react'
import { FaGoogle } from 'react-icons/fa'

const Login: NextPage = () => {
  const { isLoading, startLoading, stopLoading } = useLoading(false)
  const [emailValue, emailHandler] = useControlledInput()
  const [passValue, passHandler] = useControlledInput()

  const failedToast = useToast()

  async function login(method: Promise<unknown>) {
    startLoading()
    try {
      await method
    } catch (e) {
      failedToast({
        title: 'Failed to login',
        description: (e as firebase.auth.AuthError).message,
        isClosable: true,
        status: 'error',
      })
    } finally {
      stopLoading()
    }
  }

  const loginWithEmail = (e: FormEvent<HTMLFormElement>) =>
    login(firebase.auth().signInWithEmailAndPassword(emailValue, passValue))

  const loginWithGoogle = () =>
    login(
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    )

  return (
    <MustBeSignedOut>
      <Flex alignItems='center' justifyContent='center' height='100vh'>
        <form className={classes.loginForm} onSubmit={loginWithEmail}>
          <Text fontSize='2xl' marginBottom='2'>
            Sign In
          </Text>

          <EmailInput onChange={emailHandler} value={emailValue} isRequired />
          <PasswordInput onChange={passHandler} value={passValue} isRequired />

          <Button
            isLoading={isLoading}
            width='full'
            marginTop='2'
            type='submit'
          >
            Login
          </Button>

          <Text fontSize='lg' marginY='2' marginTop='6'>
            Or Sign In with
          </Text>
          <Button
            isLoading={isLoading}
            backgroundColor='blue.500'
            color='white'
            width='full'
            leftIcon={FaGoogle}
            onClick={loginWithGoogle}
          >
            Google
          </Button>

          <Text marginTop='6' color='blue.600'>
            Or{' '}
            <LinkWrapper nextProps={{ href: '/register' }}>Sign Up</LinkWrapper>
          </Text>
        </form>
      </Flex>
    </MustBeSignedOut>
  )
}

export default Login
