import {
  Button,
  Flex,
  Heading,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { AuthLayout, LinkWrapper } from '@root/components'
import firebase from 'firebase/app'
import { useInputHandler, useToggler } from 'molohooks'
import { NextSeo } from 'next-seo'
import { FormEvent } from 'react'

const Register = () => {
  const [isLoading, startLoading, stopLoading] = useToggler()
  const [emailValue, emailHandler] = useInputHandler()
  const [passValue, passHandler] = useInputHandler()
  const [confPassValue, confPassHandler] = useInputHandler()

  const toast = useToast()

  async function signUp(e: FormEvent<HTMLDivElement>) {
    e.preventDefault()
    startLoading()

    if (passValue !== confPassValue) {
      toast({
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
      toast({
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
    <>
      <NextSeo title='Register' />

      <AuthLayout>
        <Flex
          alignItems='center'
          justifyContent='center'
          direction='column'
          height='100vh'
          as='form'
          onSubmit={signUp}
          margin='auto'
        >
          <Heading color='white' marginBottom={4}>
            Register
          </Heading>

          <VStack minWidth='240px'>
            <Input
              type='email'
              placeholder='E-Mail'
              onChange={emailHandler}
              value={emailValue}
              isRequired
              variant='outlined'
            />
            <Input
              type='password'
              placeholder='Password'
              onChange={passHandler}
              value={passValue}
              isRequired
              variant='outlined'
            />
            <Input
              type='password'
              placeholder='Confirm Password'
              onChange={confPassHandler}
              value={confPassValue}
              isRequired
              variant='outlined'
            />

            <Button
              isFullWidth
              colorScheme='blue'
              type='submit'
              isLoading={isLoading}
            >
              Register
            </Button>
          </VStack>

          <LinkWrapper
            nextProps={{ href: '/login' }}
            chakraProps={{ color: 'blue.100', marginTop: 8 }}
          >
            Have an Account?
          </LinkWrapper>
        </Flex>
      </AuthLayout>
    </>
  )
}

export default Register
