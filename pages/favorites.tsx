import { Center, Container, Spinner } from '@chakra-ui/react'
import ImageBrick from '@root/components/ImageBrick'
import ImageDrawer from '@root/components/ImageDrawer'
import Nav from '@root/components/Nav'
import NeedAuth from '@root/components/NeedAuth'
import TagsBar from '@root/components/TagsBar'
import useListenCurrentUser from '@root/hooks/useListenCurrentUser'
import classes from '@styles/Masonry.module.css'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Masonry, RenderComponentProps } from 'masonic'
import { useToggler } from 'molohooks'
import { memo, useCallback, useEffect, useState } from 'react'

const MasonicMemo = memo(Masonry)

export default function Favorites() {
  const [isLoadingPage, startLoadingPage, stopLoadingPage] = useToggler(true)
  const [isLoadingUser, user] = useListenCurrentUser()
  const [pageContent, setPageContent] = useState<
    firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
  >([])

  async function loadUserFavorites() {
    startLoadingPage()
    const { favorites } = user
    const result = await Promise.all(
      favorites.map(id =>
        firebase.firestore().collection('posts').doc(id).get()
      )
    )

    setPageContent(result)
    stopLoadingPage()
  }

  useEffect(() => {
    if (!isLoadingUser && user) loadUserFavorites()
  }, [isLoadingUser, user])

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
            </>
          )}
        </Container>

        {selectedImage && (
          <ImageDrawer
            post={selectedImage}
            onClose={closeImage}
            isOpen={isImageOpen}
            refreshFunc={loadUserFavorites}
          />
        )}
      </NeedAuth>
    </>
  )
}
