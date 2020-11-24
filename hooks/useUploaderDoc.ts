import { User } from '@root/data/types'
import firebase from 'firebase/app'
import { useToggler } from 'molohooks'
import { useEffect, useState } from 'react'

export default function useUploaderDoc(
  uid: string,
  post: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
): [boolean, User] {
  const [isLoading, startLoading, stopLoading] = useToggler(true)
  const [user, setUser] = useState<User>()

  async function getUserDoc() {
    const snapshot = await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get()
    setUser(snapshot.data() as User)
    stopLoading()
  }

  useEffect(() => {
    startLoading()
    getUserDoc()
  }, [post])

  return [isLoading, user]
}
