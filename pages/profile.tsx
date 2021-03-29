import {
  Center,
  Container,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ImageBrick, ImageDrawer, Layout } from '@root/components'
import { Image, Masonry } from '@root/components/Memoized'
import { useListenCurrentUser, useMediumScreen } from '@root/hooks'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { RenderComponentProps } from 'masonic'
import { useToggler } from 'molohooks'
import { NextSeo } from 'next-seo'
import { useCallback, useEffect, useState } from 'react'

export default function Profile() {
  const [isLoading, user] = useListenCurrentUser()
  const [isLoadingPage, startLoadingPage, stopLoadingPage] = useToggler(true)
  const [pageContent, setPageContent] = useState<
    firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
  >([])
  const isMediumScreen = useMediumScreen()
  const [isImageOpen, openImage, closeImage] = useToggler()
  const [selectedImage, setSelectedImage] = useState<
    firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
  >()

  async function loadUserPosts() {
    const snapshot = await firebase
      .firestore()
      .collection('posts')
      .where('uid', '==', user.uid)
      .orderBy('date', 'desc')
      .get()

    setPageContent(snapshot.docs)
    stopLoadingPage()
  }

  useEffect(() => {
    if (user) loadUserPosts()
  }, [user])

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
      <NextSeo title='Your Profile' />
      <Layout>
        {!isLoading ? (
          <>
            <Center marginTop={4}>
              <VStack>
                <Image
                  src={user.photoURL}
                  height='120px'
                  width='120px'
                  rounded='full'
                />

                <Heading>{user.displayName || 'Unnamed User'}</Heading>
                <Text>{user.email}</Text>
                <HStack>
                  <Text>Posts: {user.posts}</Text>
                  <Text>Favorites: {user.favorites.length}</Text>
                </HStack>
              </VStack>
            </Center>

            <Container maxWidth='100%' marginTop={8}>
              {isLoadingPage ? (
                <Spinner />
              ) : pageContent.length ? (
                <Masonry
                  columnWidth={isMediumScreen ? 300 : 150}
                  items={pageContent}
                  columnGutter={isMediumScreen ? 12 : 8}
                  render={masonicRender}
                />
              ) : (
                <Text textAlign='center' fontSize='xl'>
                  Oops, you haven't posted anything.
                </Text>
              )}
            </Container>
          </>
        ) : (
          <Center width='100%' marginTop={4}>
            <Spinner />
          </Center>
        )}
      </Layout>

      {selectedImage && (
        <ImageDrawer
          post={selectedImage}
          onClose={closeImage}
          isOpen={isImageOpen}
          refreshFunc={loadUserPosts}
        />
      )}
    </>
  )
}
