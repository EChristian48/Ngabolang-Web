import firebase from 'firebase/app'
import { type } from 'os'

export type User = Pick<
  firebase.User,
  'displayName' | 'email' | 'uid' | 'photoURL'
>

export type Post = {
  url: string
  location: string
  date: firebase.firestore.FieldValue | firebase.firestore.Timestamp
} & Pick<User, 'uid'>

export type FavoritePost = Post & {
  id: string
}
