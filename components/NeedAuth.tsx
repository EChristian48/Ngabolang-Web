import firebase from 'firebase/app'
import 'firebase/auth'
import { useToggler } from 'molohooks'
import router from 'next/router'
import { FC, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import LoadingScreen from './LoadingScreen'

const NeedAuth: FC = ({ children }) => {
  const [isRedirecting, startRedirect] = useToggler(false)
  const [user, loading] = useAuthState(firebase.auth()) as [
    firebase.User,
    boolean,
    firebase.auth.Error
  ]

  useEffect(() => {
    if (!user && !loading) {
      startRedirect()
      router.replace('/login')
    }
  }, [user, loading])

  return loading ? (
    <LoadingScreen />
  ) : isRedirecting ? (
    <LoadingScreen>Redirecting to Login Page</LoadingScreen>
  ) : (
    <>{children}</>
  )
}

export default NeedAuth
