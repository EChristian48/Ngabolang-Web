import firebase from 'firebase/app'

export type User = Pick<
  firebase.User,
  'displayName' | 'email' | 'uid' | 'photoURL'
>

export type Post = {
  url: string
  location: string
  date: firebase.firestore.FieldValue
} & Pick<User, 'uid'>
