import {
  Center,
  Container,
  Flex,
  IconButton,
  Spinner,
  Text,
} from '@chakra-ui/react'
import ImageBrick from '@root/components/ImageBrick'
import ImageDrawer from '@root/components/ImageDrawer'
import Nav from '@root/components/Nav'
import NeedAuth from '@root/components/NeedAuth'
import TagsBar from '@root/components/TagsBar'
import usePagination from '@root/hooks/usePagination'
import useTags from '@root/hooks/useTags'
import classes from '@styles/Masonry.module.css'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Masonry, RenderComponentProps } from 'masonic'
import { useToggler } from 'molohooks'
import { memo, useCallback, useEffect, useState } from 'react'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'

const pageSize = 20
// const pageWithOffset = pageSize + 1
const MasonicMemo = memo(Masonry)

export default function Home() {
  const { tags } = useTags()
  const [query, setQuery] = useState<
    firebase.firestore.Query<firebase.firestore.DocumentData>
  >(firebase.firestore().collection('posts').orderBy('date', 'desc'))

  useEffect(() => {
    if (tags.length) {
      setQuery(
        firebase
          .firestore()
          .collection('posts')
          .where(
            'location',
            'in',
            tags.map(tag => tag.toUpperCase())
          )
          .orderBy('date', 'desc')
      )
    } else {
      setQuery(firebase.firestore().collection('posts').orderBy('date', 'desc'))
    }
  }, [tags])

  const {
    isLoadingPage,
    pageContent,
    canGoNext,
    canGoPrev,
    goNext,
    goPrev,
    pageNumber,
  } = usePagination(query)

  const [isImageOpen, openImage, closeImage] = useToggler()
  const [selectedImage, setSelectedImage] = useState<
    firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
  >()

  const masonicRender = useCallback(
    ({
      data,
    }: RenderComponentProps<
      firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
    >) => {
      return (
        <ImageBrick
          post={data}
          onClick={() => {
            setSelectedImage(data)
            openImage()
          }}
        />
      )
    },
    []
  )

  return (
    <>
      <NeedAuth>
        <Nav />
        <TagsBar />

        <Container
          maxWidth={['100%', , '80%']}
          marginTop={4}
          paddingBottom={12}
        >
          {isLoadingPage ? (
            <Center width='full'>
              <Spinner />
            </Center>
          ) : (
            <>
              <MasonicMemo
                className={classes.masonry}
                columnWidth={150}
                items={pageContent}
                columnGutter={8}
                render={masonicRender}
              />
              <Flex
                justifyContent='space-between'
                alignItems='center'
                marginTop={4}
              >
                <IconButton
                  aria-label='Previous page'
                  icon={<MdNavigateBefore />}
                  onClick={goPrev}
                  isDisabled={!canGoPrev}
                />
                <Text>{pageNumber.toString()}</Text>
                <IconButton
                  aria-label='Previous page'
                  icon={<MdNavigateNext />}
                  onClick={goNext}
                  isDisabled={!canGoNext}
                />
              </Flex>
            </>
          )}
        </Container>

        {selectedImage && (
          <ImageDrawer
            post={selectedImage}
            onClose={closeImage}
            isOpen={isImageOpen}
          />
        )}
      </NeedAuth>
    </>
  )
}
