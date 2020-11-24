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
import { format } from 'date-fns'
import firebase from 'firebase/app'
import { useToggler } from 'molohooks'
import { FC, useEffect, useState } from 'react'
import { MdDelete, MdFavorite } from 'react-icons/md'

export type ImageDrawerProps = Omit<DrawerProps, 'children'> & {
  post: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
}

const ImageDrawer: FC<ImageDrawerProps> = props => {
  const { post, ...drawerProps } = props
  const [
    isLoadingUploader,
    startLoadingUploader,
    stopLoadingUploader,
  ] = useToggler(true)
  const [uploader, setUploader] = useState<User>()
  const [isLoading, , stopLoading] = useToggler(true)
  const [isDisabled, disableButton, enableButton] = useToggler()
  const [userData, setUserData] = useState<User>()
  const [alreadyFav, setAlreadyFav, removeAlreadyFav] = useToggler()

  const postData = post.data() as Post

  async function loadUploader() {
    startLoadingUploader()
    const snapshot = await firebase
      .firestore()
      .collection('users')
      .doc(postData.uid)
      .get()
    const user = snapshot.data() as User
    setUploader(user)
    stopLoadingUploader()
  }

  async function checkAlreadyFavorite() {
    removeAlreadyFav()
    if (userData?.favorites.includes(post.id)) setAlreadyFav()
  }

  function listenToUserDoc() {
    const { uid } = firebase.auth().currentUser
    return firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(snapshot => {
        setUserData(snapshot.data() as User)
      })
  }

  useEffect(() => listenToUserDoc(), [])

  useEffect(() => {
    loadUploader()
  }, [post])

  useEffect(() => {
    if (userData) stopLoading()
  }, [userData])

  useEffect(() => {
    if (userData) {
      checkAlreadyFavorite()
    }
  }, [post, userData])

  const date = new firebase.firestore.Timestamp(
    (postData.date as firebase.firestore.Timestamp).seconds,
    (postData.date as firebase.firestore.Timestamp).nanoseconds
  )

  const displayLocation =
    postData.location[0] + postData.location.slice(1).toLowerCase()

  async function saveToFavorites() {
    const { uid } = firebase.auth().currentUser

    const data: User = alreadyFav
      ? {
          ...userData,
          favorites: userData.favorites.filter(id => id !== post.id),
        }
      : {
          ...userData,
          favorites: [...userData.favorites, post.id],
        }

    await firebase.firestore().collection('users').doc(uid).update(data)

    disableButton()
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
                    leftIcon={alreadyFav ? <MdDelete /> : <MdFavorite />}
                    isFullWidth
                    onClick={saveToFavorites}
                    isLoading={isLoading}
                  >
                    {alreadyFav ? 'Remove from Favorites' : 'Add to Favorites'}
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

export default ImageDrawer
