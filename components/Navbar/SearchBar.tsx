import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/core'
import React, { FC } from 'react'
import { MdSearch } from 'react-icons/md'
import HiddenSubmit from './HiddenSubmit'
import LocationTag from './LocationTag'

export type SearchBarProps = {
  tags: string[]
  removeTag: (tag: string) => void
}

const SearchBar: FC<SearchBarProps> = ({ tags, removeTag }) => {
  return (
    <Flex
      position='fixed'
      top='0'
      right='0'
      marginTop='2'
      marginRight='6'
      display={['none', 'none', 'flex', 'flex']}
      zIndex={999}
    >
      <Stack spacing={2} isInline marginRight='4'>
        {tags.map(tag => (
          <LocationTag size='lg' onClose={() => removeTag(tag)} key={tag}>
            {tag}
          </LocationTag>
        ))}
      </Stack>
      <form>
        <InputGroup color='black'>
          <InputLeftElement fontSize='2xl'>
            <MdSearch />
          </InputLeftElement>
          <Input placeholder='Cari tempat wisata...' />
        </InputGroup>
        <HiddenSubmit />
      </form>
    </Flex>
  )
}

export default SearchBar
