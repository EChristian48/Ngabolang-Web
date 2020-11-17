import { Button, Flex, Text, useToast } from '@chakra-ui/core'
import { EmailInput, MustBeSignedOut, PasswordInput } from '@root/components'
import useControlledInput from '@root/hooks/useControlledInput'
import useLoading from '@root/hooks/useLoading'
import classes from '@styles/Login.module.css'
import firebase from 'firebase/app'
import { NextPage } from 'next'
import { FormEvent } from 'react'

const Register: NextPage = () => {
  const { isLoading, startLoading, stopLoading } = useLoading(false)
  const [emailValue, emailHandler] = useControlledInput()
  const [passValue, passHandler] = useControlledInput()
  const [confPassValue, confPassHandler] = useControlledInput()

  const failedToast = useToast()

  async function signUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    startLoading()

    if (passValue !== confPassValue) {
      failedToast({
        title: 'Failed to sign up',
        description: "Those passwords don't match, duh",
        isClosable: true,
        status: 'warning',
      })
      return stopLoading()
    }

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(emailValue, passValue)
    } catch (e) {
      failedToast({
        title: 'Failed to sign up',
        description: (e as firebase.auth.AuthError).message,
        isClosable: true,
        status: 'error',
      })
    } finally {
      stopLoading()
    }
  }

  return (
    <MustBeSignedOut>
      <Flex
        alignItems='center'
        justifyContent='center'
        height='100vh'
        onSubmit={signUp}
      >
        <form className={classes.loginForm}>
          <Text fontSize='2xl' marginBottom='2'>
            Register
          </Text>

          <EmailInput isRequired value={emailValue} onChange={emailHandler} />
          <PasswordInput isRequired value={passValue} onChange={passHandler} />
          <PasswordInput
            isRequired
            placeholder='Confirm Password'
            value={confPassValue}
            onChange={confPassHandler}
          />

          <Button
            width='full'
            marginTop='2'
            type='submit'
            isLoading={isLoading}
          >
            Register
          </Button>
        </form>
      </Flex>
    </MustBeSignedOut>
  )
}

export default Register
