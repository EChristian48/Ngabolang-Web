import {
  Center,
  Container,
  Flex,
  IconButton,
  Portal,
  Spinner,
  Text,
} from '@chakra-ui/react'
import ImageBrick from '@root/components/ImageBrick'
import ImageDrawer from '@root/components/ImageDrawer'
import Nav from '@root/components/Nav'
import NeedAuth from '@root/components/NeedAuth'
import TagsBar from '@root/components/TagsBar'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Masonry, RenderComponentProps } from 'masonic'
import { useToggler } from 'molohooks'
import { memo, MouseEvent, useCallback, useEffect, useState } from 'react'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import classes from '@styles/Masonry.module.css'

const pageSize = 20
const MasonicMemo = memo(Masonry)

export default function Home() {
  const [posts, setPosts] = useState<
    firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
  >([])
  const [lastDoc, setLastDoc] = useState<
    firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
  >()
  const [firstDoc, setFirstDoc] = useState<
    firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
  >()
  const [page, setPage] = useState(1)
  const [isLoadingPage, startLoading, stopLoading] = useToggler(true)
  const [canGoNext, enableNext, disableNext] = useToggler(true)
  const [canGoPrev, enablePrev, disablePrev] = useToggler(false)

  async function nextPage() {
    startLoading()
    setPage(page => page + 1)
    const snapshot = await firebase
      .firestore()
      .collection('posts')
      .orderBy('date', 'desc')
      .startAfter(lastDoc)
      .limit(pageSize + 1)
      .get()

    if (snapshot.docs.length < pageSize + 1) {
      disableNext()
      setPosts(snapshot.docs)
    } else {
      setPosts(snapshot.docs.slice(0, -1))
    }

    enablePrev()
    stopLoading()
  }

  async function prevPage() {
    startLoading()
    setPage(page => page - 1)
    const snapshot = await firebase
      .firestore()
      .collection('posts')
      .orderBy('date', 'desc')
      .endBefore(firstDoc)
      .limitToLast(pageSize + 1)
      .get()

    console.log(snapshot.docs)

    if (snapshot.docs.length < pageSize + 1) {
      disablePrev()
      setPosts(snapshot.docs)
    } else {
      setPosts(snapshot.docs.slice(0, -1))
    }

    enableNext()
    stopLoading()
  }

  useEffect(() => {
    setLastDoc(posts[posts.length - 1])
    setFirstDoc(posts[0])
  }, [posts])

  const firstQuery = firebase
    .firestore()
    .collection('posts')
    .orderBy('date', 'desc')
    .limit(pageSize)

  async function firstLoad() {
    startLoading()
    const snapshot = await firstQuery.get()
    setPosts(snapshot.docs)
    stopLoading()
  }

  useEffect(() => {
    firstLoad()
  }, [])

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
                items={posts}
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
                  onClick={prevPage}
                  isDisabled={!canGoPrev}
                />
                <Text>{page.toString()}</Text>
                <IconButton
                  aria-label='Previous page'
                  icon={<MdNavigateNext />}
                  onClick={nextPage}
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
