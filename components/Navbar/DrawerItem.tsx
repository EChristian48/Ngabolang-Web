import { Button } from '@chakra-ui/core'
import { FC } from 'react'
import LinkWrapper from '../LinkWrapper'
import { NavItemProps } from './NavItem'

const DrawerItem: FC<NavItemProps> = ({ href, icon, children, active }) => {
  return (
    <LinkWrapper nextProps={{ href }} chakraProps={{ marginBottom: 4 }}>
      <Button leftIcon={icon} width='full'>
        {children}
      </Button>
    </LinkWrapper>
  )
}

export default DrawerItem
