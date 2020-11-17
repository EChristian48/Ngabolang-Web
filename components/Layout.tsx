import { Box } from '@chakra-ui/core'
import { FC } from 'react'
import Navbar from './Navbar'

const Layout: FC = ({ children }) => (
  <>
    <Navbar />
    <Box
      marginLeft={[2, 2, 24, 24]}
      marginTop={[2, 2, 16, 16]}
      marginRight={[2, 2, 2, 2]}
    >
      {children}
    </Box>
  </>
)

export default Layout
