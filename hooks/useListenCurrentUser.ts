import { User } from '@root/data/types'
import firebase from 'firebase/app'
import { useToggler } from 'molohooks'
import { useEffect, useState } from 'react'

export default function useListenCurrentUser(): [boolean, User] {
  const [isLoading, , stopLoading] = useToggler(true)
  const [currentUser, setCurrentUser] = useState<User>()

  const { uid } = firebase.auth().currentUser

  function listenToUser() {
    return firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(snapshot => {
        setCurrentUser(snapshot.data() as User)
      })
  }

  useEffect(() => listenToUser(), [])
  useEffect(() => {
    if (currentUser) stopLoading()
  }, [currentUser])

  return [isLoading, currentUser]
}
