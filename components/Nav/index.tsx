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
import { LinkWrapper } from '@root/components'
import { drawerMenus, profileMenus, topNavMenus } from '@root/data/menu'
import useTags from '@root/hooks/useTags'
import firebase from 'firebase/app'
import { useInputHandler, useToggler } from 'molohooks'
import { FormEvent } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { MdMenu, MdSearch } from 'react-icons/md'
import CustomDrawer from './Drawer'
export default function Nav() {
  const [isMediumScreen] = useMediaQuery('(min-width: 48em)')
  const [user] = useAuthState(firebase.auth()) as [
    firebase.User,
    boolean,
    firebase.auth.Error
  ]
  const [isDrawerOpen, openDrawer, closeDrawer] = useToggler()
  const { addTag, removeTag, tags } = useTags()
  const [searchValue, searchHandler] = useInputHandler()

  function validateSearch() {
    if (tags.includes(searchValue)) throw new Error('Tag sudah ada!')
  }

  const toast = useToast()

  function onSubmit(e: FormEvent<HTMLDivElement>) {
    e.preventDefault()

    try {
      validateSearch()
      addTag(searchValue)
    } catch (e) {
      toast({
        title: e.message,
        isClosable: true,
        status: 'error',
      })
    }
  }

  return (
    <>
      <Container maxWidth={['100%', , '80%']}>
        <Flex
          height={['60px', , '80px']}
          alignItems='center'
          justifyContent='space-between'
        >
          <Image src='globe.png' height='80%' />
          <HStack marginRight='auto' marginLeft={2}>
            {isMediumScreen &&
              topNavMenus.map(({ href, label }) => (
                <LinkWrapper nextProps={{ href }}>
                  <Button>{label}</Button>
                </LinkWrapper>
              ))}
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
          </HStack>
          {isMediumScreen ? (
            <Menu>
              <MenuButton as={Avatar} src={user?.photoURL} cursor='pointer' />

              <Portal>
                <MenuList>
                  {profileMenus.map(({ href, label }) => (
                    <MenuItem as='a' href={href}>
                      {label}
                    </MenuItem>
                  ))}
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          ) : (
            <IconButton
              aria-label='menu'
              icon={<MdMenu />}
              variant='ghost'
              onClick={openDrawer}
            />
          )}
        </Flex>
      </Container>

      <CustomDrawer
        isOpem={isDrawerOpen}
        menus={drawerMenus}
        onClose={closeDrawer}
      />
    </>
  )
}
