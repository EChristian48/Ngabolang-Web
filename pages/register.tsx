import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { LinkWrapper, MustBeSignedOut } from '@root/components'
import firebase from 'firebase/app'
import { useInputHandler, useToggler } from 'molohooks'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { FormEvent } from 'react'

const Register: NextPage = () => {
  const [isLoading, startLoading, stopLoading] = useToggler()
  const [emailValue, emailHandler] = useInputHandler()
  const [passValue, passHandler] = useInputHandler()
  const [confPassValue, confPassHandler] = useInputHandler()

  const failedToast = useToast()

  async function signUp(e: FormEvent<HTMLDivElement>) {
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
    <>
      <NextSeo title='Register' />

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
        </Flex>
      </MustBeSignedOut>
    </>
  )
}

export default Register
