import {
  Avatar,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react'
import { MenuType } from '@root/data/menu'
import useTags from '@root/hooks/useTags'
import firebase from 'firebase/app'
import { useInputHandler } from 'molohooks'
import { useRouter } from 'next/router'
import React, { FormEvent } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { MdMenu, MdSearch } from 'react-icons/md'
import { LinkWrapper } from '..'

export type TopBarProps = {
  onMenuClick: () => void
  topMenus: MenuType[]
  profileMenus: MenuType[]
}

export default function TopBar({
  onMenuClick,
  profileMenus,
  topMenus,
}: TopBarProps) {
  const [isMediumScreen] = useMediaQuery('(min-width: 48em)')
  const [user] = useAuthState(firebase.auth()) as [
    firebase.User,
    boolean,
    firebase.auth.Error
  ]

  const { addTag, tags } = useTags()
  const [searchValue, searchHandler, clearSearch] = useInputHandler()

  const { pathname } = useRouter()

  function validateSearch() {
    if (tags.includes(searchValue)) throw new Error('Tag sudah ada!')
  }

  const toast = useToast()

  function logout() {
    firebase.auth().signOut()
  }

  function onSubmit(e: FormEvent<HTMLDivElement>) {
    e.preventDefault()

    try {
      validateSearch()
      addTag(searchValue)
      clearSearch()
    } catch (e) {
      toast({
        title: e.message,
        isClosable: true,
        status: 'error',
      })
    }
  }

  return (
    <Container maxWidth={['100%', , '80%']}>
      <Flex
        height={['60px', , '80px']}
        alignItems='center'
        justifyContent='space-between'
      >
        <Image src='globe.png' height='80%' />

        <HStack marginRight='auto' marginLeft={2}>
          {isMediumScreen &&
            topMenus.map(({ href, label }) => (
              <LinkWrapper nextProps={{ href }} key={label}>
                <Button colorScheme='blue'>{label}</Button>
              </LinkWrapper>
            ))}
          {pathname === '/' && (
            <InputGroup as='form' onSubmit={onSubmit}>
              <InputLeftElement
                pointerEvents='none'
                children={<MdSearch />}
                padding={0}
              />
              <Input
                type='search'
                placeholder='Cari lokasi wisata'
                value={searchValue}
                onChange={searchHandler}
              />
              <button type='submit' style={{ display: 'none' }} />
            </InputGroup>
          )}
        </HStack>
        {isMediumScreen ? (
          <Menu>
            <MenuButton as={Avatar} src={user?.photoURL} cursor='pointer' />

            <Portal>
              <MenuList>
                {profileMenus.map(({ href, label }) => (
                  <MenuItem as='a' href={href} key={label}>
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
            onClick={onMenuClick}
          />
        )}
      </Flex>
    </Container>
  )
}
