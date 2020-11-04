import {
  Flex,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Stack,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/core'
import { Children, FC } from 'react'
import { MdMenu, MdAdd, MdSearch } from 'react-icons/md'
import LocationTag from './LocationTag'
import { SearchBarProps } from './SearchBar'

export type MobileTopNavProps = { onMenuClick: () => void }

const MobileTopNav: FC<MobileTopNavProps & SearchBarProps> = ({
  children,
  onMenuClick,
  removeTag,
  tags,
}) => {
  return (
    <>
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
          onClick={onMenuClick}
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

      <Box maxWidth='100wh' overflowX='hidden'>
        <Flex
          justifyContent='center'
          marginTop='2'
          display={['flex', 'flex', 'none', 'none']}
          overflowX='scroll'
        >
          <Stack spacing={1} isInline>
            {tags.map(tag => (
              <LocationTag size='lg' onClose={() => removeTag(tag)} key={tag}>
                {tag}
              </LocationTag>
            ))}
          </Stack>
        </Flex>
      </Box>
    </>
  )
}

export default MobileTopNav
