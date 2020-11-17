import firebase from 'firebase/app'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyAN0T-MJz1xoinsbuldmoMHfCEU0WcPgDY',
    authDomain: 'ngabolang.firebaseapp.com',
    databaseURL: 'https://ngabolang.firebaseio.com',
    projectId: 'ngabolang',
    storageBucket: 'ngabolang.appspot.com',
    messagingSenderId: '205657255677',
    appId: '1:205657255677:web:4bc497cc6ed268c128d894',
    measurementId: 'G-GX4XWSKVQX',
  })
}
