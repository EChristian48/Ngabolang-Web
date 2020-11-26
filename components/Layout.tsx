import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import { NeedAuth, TagsBar } from '.'
import Nav from './Nav'

const Layout: FC = ({ children }) => (
  <NeedAuth>
    <Box minHeight='100vh'>
      <Nav />
      <TagsBar />
      {children}
    </Box>
  </NeedAuth>
)

export default Layout
