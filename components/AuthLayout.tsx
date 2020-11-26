import { Center, Flex, Heading, Image } from '@chakra-ui/react'
import { FC } from 'react'
import { MustBeSignedOut } from '.'

const AuthPage: FC = ({ children }) => (
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

      {children}
    </Flex>
  </MustBeSignedOut>
)

export default AuthPage
