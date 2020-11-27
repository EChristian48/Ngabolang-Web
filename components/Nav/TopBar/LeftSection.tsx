import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  SkeletonCircle,
  useToast,
} from '@chakra-ui/react'
import { LinkWrapper } from '@root/components'
import { Image } from '@root/components/Memoized'
import { topNavMenus } from '@root/data/menu'
import { useMediumScreen, useTags } from '@root/hooks'
import { useInputHandler } from 'molohooks'
import { useRouter } from 'next/router'
import { FormEvent } from 'react'
import { MdSearch } from 'react-icons/md'

export default function LeftSection() {
  const isMediumScreen = useMediumScreen()
  const toast = useToast()
  const { pathname } = useRouter()
  const { addTag, tags } = useTags()
  const [searchValue, searchHandler, clearSearch] = useInputHandler()

  function validateSearch() {
    if (tags.includes(searchValue)) throw new Error('Tag sudah ada!')
  }

  function onSubmit(e: FormEvent<HTMLDivElement>) {
    e.preventDefault()

    try {
      validateSearch()
      addTag(searchValue)
      clearSearch()
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
      <Image
        src='globe.png'
        height='80%'
        alt='Ngabolang Logo'
        fallback={
          <SkeletonCircle
            height='80%'
            width={['calc(0.8 * 60px)', , 'calc(0.8 * 80px)']}
            title='Ngabolang Logo'
          />
        }
      />

      <HStack marginRight='auto' marginLeft={2}>
        {isMediumScreen &&
          topNavMenus.map(({ href, label }) => (
            <LinkWrapper nextProps={{ href }} key={label}>
              <Button>{label}</Button>
            </LinkWrapper>
          ))}
        {pathname === '/' && (
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
              variant='outlined'
            />
            <button type='submit' style={{ display: 'none' }} />
          </InputGroup>
        )}
      </HStack>
    </>
  )
}
