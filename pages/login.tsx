import { Button, Flex, Text } from '@chakra-ui/core'
import { EmailInput, LinkWrapper, PasswordInput } from '@root/components'
import useLoading from '@root/hooks/useLoading'
import classes from '@styles/Login.module.css'
import { NextPage } from 'next'
import { FaGoogle } from 'react-icons/fa'

const Login: NextPage = () => {
  const { isLoading, startLoading } = useLoading(false)

  return (
    <Flex alignItems='center' justifyContent='center' height='100vh'>
      <form className={classes.loginForm} onSubmit={e => e.preventDefault()}>
        <Text fontSize='2xl' marginBottom='2'>
          Sign In
        </Text>

        <EmailInput />
        <PasswordInput />

        <Button
          isLoading={isLoading}
          width='full'
          marginTop='2'
          type='submit'
          onClick={startLoading}
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
          onClick={startLoading}
        >
          Google
        </Button>

        <Text marginTop='6' color='blue.600'>
          Or{' '}
          <LinkWrapper nextProps={{ href: '/register' }}>Sign Up</LinkWrapper>
        </Text>
      </form>
    </Flex>
  )
}

export default Login
