import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { LinkWrapper, MustBeSignedOut } from '@root/components'
import firebase from 'firebase/app'
import { useInputHandler, useToggler } from 'molohooks'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { FormEvent } from 'react'
import { FaGoogle } from 'react-icons/fa'

const Login: NextPage = () => {
  const [isLoading, startLoading, stopLoading] = useToggler()
  const [emailValue, emailHandler] = useInputHandler()
  const [passValue, passHandler] = useInputHandler()

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
      <NextSeo title='Login' />

      <MustBeSignedOut>
        <Flex
          direction={['column', , 'row']}
          width='100vw'
          height='100vh'
          background='
        linear-gradient(
          rgba(0, 0, 0, 0.5), 
          rgba(0, 0, 0, 0.7)
        ),
        url(login_bg.jpg)'
          backgroundRepeat='no-repeat'
          backgroundPosition={['center', , '50% 70%']}
          backgroundSize='cover'
        >
          <Center height='90px' margin={[, , 'auto']}>
            <Heading color='white' size='2xl'>
              Ngabolang
            </Heading>
            <Image src='globe.png' maxHeight='90%' />
          </Center>

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
        </Flex>
      </MustBeSignedOut>
    </>
  )
}

export default Login
