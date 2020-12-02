import * as admin from 'firebase-admin'
require('dotenv').config()

console.log({
  clientEmail: process.env.CLIENT_EMAIL,
  privateKey: process.env.PRIVATE_KEY.split('\\n').join('\n'),
  projectId: process.env.PROJECT_ID,
})

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
