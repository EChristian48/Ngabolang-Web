import { Center, Image, Skeleton, Text } from '@chakra-ui/react'
import { Post, User } from '@root/data/types'
import useListenCurrentUser from '@root/hooks/useListenCurrentUser'
import firebase from 'firebase/app'
import { MouseEvent } from 'react'

export type ImageBrickProps = {
  post: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
  onClick: (event: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => void
}

export default function ImageBrick({ post, onClick }: ImageBrickProps) {
  const postData = post.data() as Post

  const [loading, user] = useListenCurrentUser()

  async function deleteFavorite() {
    const { uid } = user
    console.log(user)

    const data: User = {
      ...user,
      favorites: user.favorites.filter(id => id !== post.id),
    }

    await firebase.firestore().collection('users').doc(uid).update(data)
  }

  return postData ? (
    <Image
      src={postData.url}
      fallback={<Skeleton width='full' height='200px' rounded='8px' />}
      rounded='8px'
      cursor='pointer'
      onClick={onClick}
    />
  ) : (
    <Skeleton isLoaded={!loading} rounded='8px'>
      <Center
        width='200px'
        height='250px'
        backgroundColor='cyan.300'
        rounded='8px'
        onClick={deleteFavorite}
        cursor='pointer'
      >
        <Text>Image no longer available</Text>
      </Center>
    </Skeleton>
  )
}
