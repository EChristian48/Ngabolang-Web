import { Button, Flex, Text } from '@chakra-ui/core'
import { EmailInput, LinkWrapper, PasswordInput } from '@root/components'
import classes from '@styles/Login.module.css'
import { NextPage } from 'next'
import { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'

const Login: NextPage = () => {
  const [isLoading, setLoading] = useState(false)

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
          onClick={() => setLoading(true)}
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
          onClick={() => setLoading(true)}
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
