import { Tag, TagCloseButton, TagLabel, useDisclosure } from '@chakra-ui/core'
import useTags from '@root/hooks/useTags'
import { useRouter } from 'next/router'
import { MdAccountCircle, MdFavorite, MdHome } from 'react-icons/md'
import DrawerItem from './DrawerItem'
import MobileDrawer from './MobileDrawer'
import MobileTopNav from './MobileTopNav'
import { NavItemProps } from './NavItem'
import SearchBar from './SearchBar'
import SideNav from './SideNav'

export const menus: NavItemProps[] = [
  { href: '/', icon: MdHome, name: 'Home' },
  { href: '/favorites', icon: MdFavorite, name: 'Favorites' },
  { href: '/profile', icon: MdAccountCircle, name: 'Profile' },
]

const Navbar = () => {
  const { pathname } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { tags, removeTag } = useTags(['Bogor', 'Yogyakarta', 'Mamamia'])

  return (
    <>
      <SideNav menus={menus} />
      <SearchBar tags={tags} removeTag={removeTag} />

      <MobileTopNav onMenuClick={onOpen} tags={tags} removeTag={removeTag} />
      <MobileDrawer isOpen={isOpen} onClose={onClose} menus={menus} />
    </>
  )
}

export default Navbar
