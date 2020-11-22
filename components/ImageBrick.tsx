import { Image, Skeleton } from '@chakra-ui/react'
import { Post } from '@root/data/types'
import firebase from 'firebase/app'
import { MouseEvent } from 'react'

export type ImageBrickProps = {
  post: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
  onClick: (event: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => void
}

export default function ImageBrick({ post, onClick }: ImageBrickProps) {
  const postData = post.data() as Post

  return (
    <Image
      src={postData.url}
      fallback={<Skeleton width='full' height='200px' />}
      rounded='8px'
      cursor='pointer'
      onClick={onClick}
    />
  )
}
