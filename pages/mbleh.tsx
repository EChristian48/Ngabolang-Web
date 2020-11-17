import { firebase } from '@root/firebase/init'
import 'firebase/auth'

export default function gening() {
  firebase.auth().signOut()
  return <div>mbleh</div>
}
