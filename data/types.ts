import firebase from 'firebase/app'
import { type } from 'os'

export type User = Pick<
  firebase.User,
  'displayName' | 'email' | 'uid' | 'photoURL'
> & {
  favorites: string[]
}

export type Post = {
  url: string
  location: string
  date: firebase.firestore.FieldValue | firebase.firestore.Timestamp
} & Pick<User, 'uid'>
