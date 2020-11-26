import { Center, Container, Spinner, Text } from '@chakra-ui/react'
import { ImageBrick, ImageDrawer, Layout } from '@root/components'
import { Masonry } from '@root/components/Memoized'
import { useListenCurrentUser, useMediumScreen } from '@root/hooks'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { RenderComponentProps } from 'masonic'
import { useToggler } from 'molohooks'
import { NextSeo } from 'next-seo'
import { useCallback, useEffect, useState } from 'react'

export default function Favorites() {
  const [isLoadingPage, startLoadingPage, stopLoadingPage] = useToggler(true)
  const [isLoadingUser, user] = useListenCurrentUser()
  const [pageContent, setPageContent] = useState<
    firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
  >([])
  const isMediumScreen = useMediumScreen()
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
      <NextSeo title='Favorites' />

      <Layout>
        <Container maxWidth='full' marginTop={4} paddingBottom={12}>
          {isLoadingPage ? (
            <Center width='full'>
              <Spinner />
            </Center>
          ) : pageContent.length ? (
            <Masonry
              columnWidth={isMediumScreen ? 300 : 150}
              items={pageContent}
              columnGutter={isMediumScreen ? 12 : 8}
              render={masonicRender}
            />
          ) : (
            <Text textAlign='center' fontSize='xl'>
              Ups, favorites kamu kosong.
            </Text>
          )}
        </Container>
      </Layout>

      {selectedImage && (
        <ImageDrawer
          post={selectedImage}
          onClose={closeImage}
          isOpen={isImageOpen}
          refreshFunc={loadUserFavorites}
        />
      )}
    </>
  )
}
