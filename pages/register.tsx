import { Button, Flex, Text } from '@chakra-ui/core'
import { EmailInput, PasswordInput } from '@root/components'
import classes from '@styles/Login.module.css'
import { NextPage } from 'next'
import { useState } from 'react'

const Register: NextPage = () => {
  const [isLoading, setLoading] = useState(false)

  return (
    <Flex alignItems='center' justifyContent='center' height='100vh'>
      <form className={classes.loginForm}>
        <Text fontSize='2xl' marginBottom='2'>
          Register
        </Text>

        <EmailInput />
        <PasswordInput />
        <PasswordInput placeholder='Confirm Password' />

        <Button
          width='full'
          marginTop='2'
          type='submit'
          isLoading={isLoading}
          onClick={e => setLoading(true)}
        >
          Register
        </Button>
      </form>
    </Flex>
  )
}

export default Register
