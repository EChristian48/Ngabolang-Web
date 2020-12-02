require('dotenv').config()
import * as admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY,
      projectId: process.env.PROJECT_ID,
    }),
    databaseURL: 'https://ngabolang.firebaseio.com',
    storageBucket: 'ngabolang.appspot.com',
  })
}
