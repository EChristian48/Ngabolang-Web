import firebase from 'firebase/app'
import 'firebase/auth'
import { useToggler } from 'molohooks'
import router from 'next/router'
import React, { FC, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import LoadingScreen from './LoadingScreen'

const MustBeSignedOut: FC = ({ children }) => {
  const [isRedirecting, startRedirect] = useToggler(false)
  const [user, loading] = useAuthState(firebase.auth()) as [
    firebase.User,
    boolean,
    firebase.auth.Error
  ]

  useEffect(() => {
    if (user) {
      startRedirect()
      router.replace('/')
    }
  }, [user])

  return loading ? (
    <LoadingScreen />
  ) : isRedirecting ? (
    <LoadingScreen>Redirecting...</LoadingScreen>
  ) : (
    <>{children}</>
  )
}

export default MustBeSignedOut
