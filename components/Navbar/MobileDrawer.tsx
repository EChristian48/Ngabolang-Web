import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
} from '@chakra-ui/core'
import { FC } from 'react'

export type MobileDrawerProps = {
  isOpen: boolean
  onClose: (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
    reason?: 'pressedEscape' | 'clickedOverlay'
  ) => void
}

const MobileDrawer: FC<MobileDrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement='left'>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Ngabolang</DrawerHeader>
        <DrawerBody>
          <Stack spacing='50px'>{children}</Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileDrawer
