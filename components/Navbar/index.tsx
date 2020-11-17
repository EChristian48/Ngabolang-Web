import { useDisclosure } from '@chakra-ui/core'
import { MdAccountCircle, MdAdd, MdFavorite, MdHome } from 'react-icons/md'
import MobileDrawer from './MobileDrawer'
import MobileTopNav from './MobileTopNav'
import { NavItemProps } from './NavItem'
import SearchBar from './SearchBar'
import SideNav from './SideNav'

export const menus: NavItemProps[] = [
  { href: '/', icon: MdHome, name: 'Home' },
  { href: '/favorites', icon: MdFavorite, name: 'Favorites' },
  { href: '/profile', icon: MdAccountCircle, name: 'Profile' },
  { href: '/upload', icon: MdAdd, name: 'Upload' },
]

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <SideNav menus={menus} />
      <SearchBar />

      <MobileTopNav onMenuClick={onOpen} />
      <MobileDrawer isOpen={isOpen} onClose={onClose} menus={menus} />
    </>
  )
}

export default Navbar
