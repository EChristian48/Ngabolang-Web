import * as admin from 'firebase-admin'
const serviceAccount = require('@root/serviceAccount.json')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://ngabolang.firebaseio.com',
    storageBucket: 'ngabolang.appspot.com',
  })
}
