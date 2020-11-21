import { Flex, Spinner } from '@chakra-ui/react'
import { FC } from 'react'

const LoadingScreen: FC = ({ children }) => {
  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      height='100vh'
      margin='0'
      direction='column'
    >
      <Spinner size='xl' marginBottom='4' />
      {children}
    </Flex>
  )
}

export default LoadingScreen
