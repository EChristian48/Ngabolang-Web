import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { LinkWrapper } from '@root/components'
import AuthPage from '@root/components/AuthPage'
import firebase from 'firebase/app'
import { useInputHandler, useToggler } from 'molohooks'
import { NextSeo } from 'next-seo'
import { FormEvent } from 'react'
import { FaGoogle } from 'react-icons/fa'

const Login = () => {
  const [isLoading, startLoading, stopLoading] = useToggler()
  const [emailValue, emailHandler] = useInputHandler()
  const [passValue, passHandler] = useInputHandler()

  const toast = useToast()

  async function login(method: Promise<unknown>) {
    startLoading()
    try {
      await method
    } catch (e) {
      toast({
        title: 'Failed to login',
        description: (e as firebase.auth.AuthError).message,
        isClosable: true,
        status: 'error',
      })
    } finally {
      stopLoading()
    }
  }

  const loginWithEmail = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    login(firebase.auth().signInWithEmailAndPassword(emailValue, passValue))
  }

  const loginWithGoogle = () =>
    login(
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    )

  return (
    <>
      <NextSeo title='Sign In' />

      <AuthPage>
        <Flex
          alignItems='center'
          justifyContent='center'
          direction='column'
          margin='auto'
        >
          <Heading color='white' marginBottom={4}>
            Sign In
          </Heading>

          <VStack as='form' onSubmit={loginWithEmail} minWidth='240px'>
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

            <Button
              isLoading={isLoading}
              isFullWidth
              type='submit'
              colorScheme='blue'
            >
              Login
            </Button>

            <Text fontSize='lg' color='white'>
              Or Sign In with
            </Text>
            <Button
              isLoading={isLoading}
              isFullWidth
              leftIcon={<FaGoogle />}
              onClick={loginWithGoogle}
            >
              Google
            </Button>
          </VStack>

          <LinkWrapper
            nextProps={{ href: '/register' }}
            chakraProps={{ color: 'blue.100', marginTop: 8 }}
          >
            Don't Have an Account?
          </LinkWrapper>
        </Flex>
      </AuthPage>
    </>
  )
}

export default Login
