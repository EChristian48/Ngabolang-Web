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
import { MdFavorite } from 'react-icons/md'

export type ImageDrawerProps = Omit<DrawerProps, 'children'> & {
  post: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
}

const ImageDrawer: FC<ImageDrawerProps> = props => {
  const { post, ...drawerProps } = props
  const [isLoadingUser, , stopLoading] = useToggler(true)
  const [user, setUser] = useState<User>()

  const postData = post.data() as Post

  async function loadUser() {
    if (!firebase.firestore()) await import('firebase/firestore')
    const snapshot = await firebase
      .firestore()
      .collection('users')
      .doc(postData.uid)
      .get()
    const user = snapshot.data() as User
    setUser(user)
    stopLoading()
  }

  useEffect(() => {
    loadUser()
  }, [])

  const date = new firebase.firestore.Timestamp(
    (postData.date as firebase.firestore.Timestamp).seconds,
    (postData.date as firebase.firestore.Timestamp).nanoseconds
  )

  return (
    <Drawer {...drawerProps} placement='bottom' size='full'>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {isLoadingUser
              ? 'Loading info...'
              : `${postData.location}, ${user.displayName}`}
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
                    leftIcon={<MdFavorite />}
                    isFullWidth
                  >
                    Add to Favorites
                  </Button>

                  <Heading size='lg'>Location: {postData.location}</Heading>
                  {isLoadingUser ? (
                    <Text>Loading user info...</Text>
                  ) : (
                    <Text fontSize='lg'>Uploader: {user.displayName}</Text>
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
