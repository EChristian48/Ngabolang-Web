import { Flex, Spinner, Text } from '@chakra-ui/react'
import { splashesText } from '@root/data/splashes'
import { Container } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'

const LoadingScreen: FC = ({ children }) => {
  const [currentSplash, setSplash] = useState<string>()

  function randomSplash() {
    const selected = Math.round(Math.random() * (splashesText.length - 1))
    return setSplash(splashesText[selected])
  }

  useEffect(() => {
    const randomSplashes = setInterval(randomSplash, 2000)
    return () => clearInterval(randomSplashes)
  }, [])

  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      height='100vh'
      margin='0'
      direction='column'
      backgroundColor='blue.500'
    >
      <Spinner size='xl' marginBottom='4' color='white' thickness='4px' />
      <Container maxWidth={['100%', , '80%']}>
        <Text color='white' fontSize='xl' textAlign='center'>
          {children || currentSplash}
        </Text>
      </Container>
    </Flex>
  )
}

export default LoadingScreen
