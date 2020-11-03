import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/core'
import { LinkWrapper } from '@root/components'
import { MdAccountCircle, MdFavorite, MdHome, MdSearch } from 'react-icons/md'

import styles from '@styles/Home.module.css'
import Navbar from '@root/components/Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
    </>
  )
}

export default Home
