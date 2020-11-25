import { User } from '@root/data/types'
import firebase from 'firebase/app'
import { useToggler } from 'molohooks'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function useListenCurrentUser(): [boolean, User] {
  const [isLoading, , stopLoading] = useToggler(true)
  const [currentUser, setCurrentUser] = useState<User>()

  const [user, loading] = useAuthState(firebase.auth()) as [
    firebase.User,
    boolean,
    firebase.auth.Error
  ]

  function listenToUser() {
    return firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(snapshot => {
        setCurrentUser(snapshot.data() as User)
      })
  }

  useEffect(() => {
    if (!loading && user) return listenToUser()
  }, [loading, user])
  useEffect(() => {
    if (currentUser) stopLoading()
  }, [currentUser])

  return [isLoading, currentUser]
}
