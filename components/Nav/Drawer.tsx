import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
} from '@chakra-ui/react'
import { MenuType } from '@root/data/menu'
import firebase from 'firebase/app'
import { LinkWrapper } from '..'

export type CustomDrawerProps = {
  isOpem: boolean
  onClose: () => void
  menus: MenuType[]
}

export default function CustomDrawer({
  isOpem,
  onClose,
  menus,
}: CustomDrawerProps) {
  function logout() {
    firebase.auth().signOut()
  }

  return (
    <Drawer isOpen={isOpem} onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader>Mau ke mana?</DrawerHeader>

          <DrawerBody>
            <VStack>
              {menus.map(({ href, label }) => (
                <LinkWrapper
                  nextProps={{ href }}
                  chakraProps={{ width: 'full' }}
                  key={label}
                >
                  <Button colorScheme='blue' isFullWidth>
                    {label}
                  </Button>
                </LinkWrapper>
              ))}

              <Button colorScheme='red' isFullWidth onClick={logout}>
                Logout
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
