import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from '@chakra-ui/core'
import { useRouter } from 'next/router'
import {
  MdAccountCircle,
  MdAdd,
  MdFavorite,
  MdHome,
  MdMenu,
  MdSearch,
} from 'react-icons/md'
import DrawerItem from './DrawerItem'
import MobileDrawer from './MobileDrawer'
import NavItem, { NavItemProps } from './NavItem'
import SideNav from './SideNav'

export const menus: NavItemProps[] = [
  { href: '/', icon: MdHome, name: 'Home' },
  { href: '/favorites', icon: MdFavorite, name: 'Favorites' },
  { href: '/profile', icon: MdAccountCircle, name: 'Profile' },
]

const Navbar = () => {
  const { pathname } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <SideNav>
        {menus.map(({ href, icon, name }) => (
          <NavItem
            key={href}
            active={href === pathname}
            icon={icon}
            href={href}
            name={name}
          />
        ))}
      </SideNav>

      <Flex
        backgroundColor='red.500'
        justify='center'
        paddingY='2'
        color='white'
        display={['flex', 'flex', 'none', 'none']}
      >
        <IconButton
          aria-label='Test'
          icon={MdMenu}
          marginRight='auto'
          variant='ghost'
          variantColor='red.500'
          fontSize='2xl'
          onClick={onOpen}
        />
        <InputGroup color='black'>
          <InputLeftElement fontSize='2xl'>
            <MdSearch />
          </InputLeftElement>
          <Input placeholder='Cari tempat wisata...' />
        </InputGroup>
        <IconButton
          aria-label='Test'
          icon={MdAdd}
          marginLeft='auto'
          variant='ghost'
          variantColor='red.500'
          fontSize='2xl'
        />
      </Flex>

      <MobileDrawer isOpen={isOpen} onClose={onClose}>
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
      </MobileDrawer>
    </>
  )
}

export default Navbar
