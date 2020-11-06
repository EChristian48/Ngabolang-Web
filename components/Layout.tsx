import { Box } from '@chakra-ui/core'
import { FC } from 'react'

const Layout: FC = ({ children }) => (
  <Box marginLeft={[0, 0, 24, 24]} marginTop={[0, 0, 16, 16]}>{children}</Box>
)

export default Layout
