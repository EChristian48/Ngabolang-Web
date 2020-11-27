import {
  Avatar,
  Container,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Tooltip,
} from '@chakra-ui/react'
import { MenuType } from '@root/data/menu'
import { useMediumScreen } from '@root/hooks'
import firebase from 'firebase/app'
import router from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { MdAdd, MdMenu } from 'react-icons/md'
import LeftSection from './LeftSection'
import RightSection from './RightSection'

export type TopBarProps = {
  onMenuClick: () => void
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <Container
      maxWidth='full'
      position='sticky'
      top={0}
      zIndex={1}
      backgroundColor='blue.500'
      roundedBottom={20}
    >
      <Flex
        height={['60px', , '80px']}
        alignItems='center'
        justifyContent='space-between'
      >
        <LeftSection />
        <RightSection onMenuClick={onMenuClick} />
      </Flex>
    </Container>
  )
}
