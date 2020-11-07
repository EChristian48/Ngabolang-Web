import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/core'
import useControlledInput from '@root/hooks/useControlledInput'
import useTags from '@root/hooks/useTags'
import { FormEvent } from 'react'
import { MdSearch } from 'react-icons/md'
import HiddenSubmit from './HiddenSubmit'
import LocationTag from './LocationTag'

const SearchBar = () => {
  const { tags, addTag } = useTags()
  const [value, handler, clear] = useControlledInput()

  function formHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!tags.includes(value) && value) {
      addTag(value)
      clear()
    } else {
      console.log('Tag udah ada!')
      ;(function showModal() {})()
    }
  }

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
          <LocationTag size='lg' key={tag}>
            {tag}
          </LocationTag>
        ))}
      </Stack>
      <form onSubmit={formHandler}>
        <InputGroup color='black'>
          <InputLeftElement fontSize='2xl'>
            <MdSearch />
          </InputLeftElement>
          <Input
            placeholder='Cari tempat wisata...'
            onChange={handler}
            value={value}
          />
        </InputGroup>
        <HiddenSubmit />
      </form>
    </Flex>
  )
}

export default SearchBar
