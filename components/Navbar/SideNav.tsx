import { Box, Flex } from '@chakra-ui/core'
import { FC } from 'react'

const SideNav: FC = ({ children }) => {
  return (
    <Box
      height='100vh'
      width='72px'
      backgroundColor='red.500'
      display={['none', 'none', 'block', 'block']}
    >
      <Flex
        direction='column'
        height='40%'
        justify='space-around'
        align='center'
      >
        {children}
      </Flex>
    </Box>
  )
}

export default SideNav
