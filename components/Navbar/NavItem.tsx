import { Box, Tooltip } from '@chakra-ui/core'
import styles from '@styles/Home.module.css'
import { FC } from 'react'
import { LinkWrapper } from '..'

export type NavItemProps = {
  href: string
  icon: any
  active?: boolean
  name?: string
}

const NavItem: FC<NavItemProps> = ({ icon, href, active, name }) => {
  return (
    <Tooltip aria-label={name} label={name} hasArrow>
      <LinkWrapper nextProps={{ href }}>
        <Box
          as={icon}
          fontSize='4xl'
          className={styles.navItem}
          width='full'
          color={active ? 'black' : 'white'}
        />
      </LinkWrapper>
    </Tooltip>
  )
}

export default NavItem
