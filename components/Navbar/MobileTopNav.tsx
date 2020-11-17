import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/core'
import useControlledInput from '@root/hooks/useControlledInput'
import useTags from '@root/hooks/useTags'
import { useRouter } from 'next/router'
import { FC, FormEvent } from 'react'
import { MdAdd, MdMenu, MdSearch } from 'react-icons/md'
import LocationTag from './LocationTag'

export type MobileTopNavProps = { onMenuClick: () => void }

const MobileTopNav: FC<MobileTopNavProps> = ({ onMenuClick }) => {
  const { pathname } = useRouter()
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
          marginLeft='2'
          variant='ghost'
          variantColor='red.500'
          fontSize='2xl'
          onClick={onMenuClick}
        />
        <form onSubmit={formHandler}>
          <InputGroup
            color='black'
            display={
              pathname === '/' || pathname === '/favorites' ? 'block' : 'none'
            }
          >
            <InputLeftElement fontSize='2xl'>
              <MdSearch />
            </InputLeftElement>
            <Input
              placeholder='Cari tempat wisata...'
              value={value}
              onChange={handler}
            />
          </InputGroup>
        </form>
        <IconButton
          aria-label='Test'
          icon={MdAdd}
          marginLeft='auto'
          marginRight='2'
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
              <LocationTag size='lg' key={tag}>
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
