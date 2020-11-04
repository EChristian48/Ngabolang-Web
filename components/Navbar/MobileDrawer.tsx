import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
} from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { FC } from 'react'
import DrawerItem from './DrawerItem'
import { NavItemProps } from './NavItem'

export type MobileDrawerProps = {
  isOpen: boolean
  onClose: (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
    reason?: 'pressedEscape' | 'clickedOverlay'
  ) => void
  menus: NavItemProps[]
}

const MobileDrawer: FC<MobileDrawerProps> = ({ isOpen, onClose, menus }) => {
  const { pathname } = useRouter()
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement='left'>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Ngabolang</DrawerHeader>
        <DrawerBody>
          <Stack spacing='50px'>
            {menus.map(({ href, icon, name }) => (
              <DrawerItem
                href={href}
                icon={icon}
                key={href}
                active={href === pathname}
              >
                {name}
              </DrawerItem>
            ))}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileDrawer
