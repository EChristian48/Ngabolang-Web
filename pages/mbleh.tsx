import firebase from 'firebase/app'
import 'firebase/auth'

export default function gening() {
  firebase.auth().signOut()
  return <div>mbleh</div>
}
