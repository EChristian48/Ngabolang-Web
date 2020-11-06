import { Box, Flex } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { FC } from 'react'
import NavItem, { NavItemProps } from './NavItem'

export type SideNavProps = {
  menus: NavItemProps[]
}

const SideNav: FC<SideNavProps> = ({ menus }) => {
  const { pathname } = useRouter()

  return (
    <Box
      height='100vh'
      width='72px'
      backgroundColor='red.500'
      display={['none', 'none', 'block', 'block']}
      position='fixed'
    >
      <Flex
        direction='column'
        height='40%'
        justify='space-around'
        align='center'
      >
        {menus.map(({ href, icon, name }) => (
          <NavItem
            key={href}
            active={href === pathname}
            icon={icon}
            href={href}
            name={name}
          />
        ))}
      </Flex>
    </Box>
  )
}

export default SideNav
