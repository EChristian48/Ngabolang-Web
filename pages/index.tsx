import {
  Avatar,
  Button,
  Center,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
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
  SlideFade,
  Tag,
  TagCloseButton,
  TagLabel,
  useDisclosure,
  useMediaQuery,
  useToast,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { LinkWrapper } from '@root/components'
import NeedAuth from '@root/components/NeedAuth'
import { drawerMenus, profileMenus, topNavMenus } from '@root/data/menu'
import { MdMenu, MdSearch } from 'react-icons/md'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/app'
import { useInputHandler, useToggler } from 'molohooks'
import useTags from '@root/hooks/useTags'
import { FormEvent } from 'react'

export default function Home() {
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
    <NeedAuth>
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
      <Center position='fixed' bottom={4} width='full'>
        <Wrap justify='center'>
          {tags.map(tag => (
            <WrapItem>
              <SlideFade in offsetY={-20}>
                <Tag size='lg'>
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton onClick={() => removeTag(tag)} />
                </Tag>
              </SlideFade>
            </WrapItem>
          ))}
        </Wrap>
      </Center>
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>Mau ke mana?</DrawerHeader>

            <DrawerBody>
              <VStack>
                {drawerMenus.map(({ href, label }) => (
                  <LinkWrapper
                    nextProps={{ href }}
                    chakraProps={{ width: 'full' }}
                  >
                    <Button isFullWidth>{label}</Button>
                  </LinkWrapper>
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </NeedAuth>
  )
}
