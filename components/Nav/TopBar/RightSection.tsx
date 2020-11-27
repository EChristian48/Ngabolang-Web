import {
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Tooltip,
} from '@chakra-ui/react'
import { profileMenus } from '@root/data/menu'
import { useMediumScreen } from '@root/hooks'
import firebase from 'firebase/app'
import router from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { MdAdd, MdMenu } from 'react-icons/md'

export type RightSectionProps = {
  onMenuClick: () => void
}

export default function RightSection({ onMenuClick }: RightSectionProps) {
  const isMediumScreen = useMediumScreen()
  const [user] = useAuthState(firebase.auth()) as [
    firebase.User,
    boolean,
    firebase.auth.Error
  ]

  function logout() {
    firebase.auth().signOut()
  }

  return (
    <>
      <Tooltip label='Upload a photo'>
        <IconButton
          aria-label='Upload button'
          icon={<MdAdd />}
          variant='ghost'
          marginX={isMediumScreen ? 4 : 2}
          rounded='full'
          fontSize='2xl'
          onClick={() => router.push('/upload')}
        />
      </Tooltip>

      {isMediumScreen ? (
        <Menu>
          <MenuButton as={Avatar} src={user?.photoURL} cursor='pointer' />

          <Portal>
            <MenuList>
              {profileMenus.map(({ href, label }) => (
                <MenuItem onClick={() => router.push(href)} key={label}>
                  {label}
                </MenuItem>
              ))}
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      ) : (
        <IconButton
          aria-label='menu'
          icon={<MdMenu />}
          variant='ghost'
          color='white'
          _hover={{ color: 'black' }}
          onClick={onMenuClick}
        />
      )}
    </>
  )
}
