import {
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Post, User } from '@root/data/types'
import useListenCurrentUser from '@root/hooks/useListenCurrentUser'
import useUploaderDoc from '@root/hooks/useUploaderDoc'
import { format } from 'date-fns'
import firebase from 'firebase/app'
import { useToggler } from 'molohooks'
import { FC, memo, useEffect, useState } from 'react'
import { MdDelete, MdFavorite } from 'react-icons/md'

export type ImageDrawerProps = Omit<DrawerProps, 'children'> & {
  post: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
}

const ImageDrawer: FC<ImageDrawerProps> = props => {
  const { post, ...drawerProps } = props
  const postData = post.data() as Post
  const date = new firebase.firestore.Timestamp(
    (postData.date as firebase.firestore.Timestamp).seconds,
    (postData.date as firebase.firestore.Timestamp).nanoseconds
  )
  const displayLocation =
    postData.location[0] + postData.location.slice(1).toLowerCase()

  const [isLoadingUploader, uploader] = useUploaderDoc(postData.uid, post)
  const [isLoadingCurrentUser, currentUser] = useListenCurrentUser()

  const [
    isAlreadyFavorite,
    setAlreadyFavorite,
    removeAlreadyFavorite,
  ] = useToggler()

  function checkAlreadyFavorite() {
    removeAlreadyFavorite()
    if (currentUser.favorites.includes(post.id)) setAlreadyFavorite()
  }

  useEffect(() => {
    if (currentUser) {
      checkAlreadyFavorite()
    }
  }, [post, currentUser])

  async function updateFavorites() {
    const { uid } = firebase.auth().currentUser

    const data: User = isAlreadyFavorite
      ? {
          ...currentUser,
          favorites: currentUser.favorites.filter(id => id !== post.id),
        }
      : {
          ...currentUser,
          favorites: [...currentUser.favorites, post.id],
        }

    await firebase.firestore().collection('users').doc(uid).update(data)
  }

  return (
    <Drawer {...drawerProps} placement='left' size='full'>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {isLoadingUploader
              ? 'Loading info...'
              : `${displayLocation}, ${uploader.displayName}`}
          </DrawerHeader>
          <DrawerBody>
            <Container maxWidth={['100%', , '80%']} paddingBottom='32px'>
              <SimpleGrid
                columns={[1, , 2]}
                spacing={4}
                padding='16px'
                shadow='lg'
                rounded={16}
              >
                <Image
                  src={postData.url}
                  fallback={<Skeleton width='full' height='300px' />}
                  rounded={16}
                />

                <VStack align='start'>
                  <Button
                    aria-label='Save to favorites'
                    leftIcon={isAlreadyFavorite ? <MdDelete /> : <MdFavorite />}
                    isFullWidth
                    onClick={updateFavorites}
                    isLoading={isLoadingCurrentUser}
                  >
                    {isAlreadyFavorite
                      ? 'Remove from Favorites'
                      : 'Add to Favorites'}
                  </Button>

                  <Heading size='lg'>Location: {displayLocation}</Heading>
                  {isLoadingUploader ? (
                    <Text>Loading user info...</Text>
                  ) : (
                    <Text fontSize='lg'>
                      Uploaded by: {uploader.displayName}
                    </Text>
                  )}
                  <Text>Date: {format(date.toDate(), 'dd MMMM yyyy')}</Text>
                </VStack>
              </SimpleGrid>
            </Container>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default memo(ImageDrawer)
