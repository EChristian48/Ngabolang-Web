// import { Post } from '@root/data/types'
// import '@root/firebase/init-admin'
// import Cors from 'cors'
// import * as admin from 'firebase-admin'
// import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
// import fetch from 'node-fetch'
// import os from 'os'
// import path from 'path'
// import sharp from 'sharp'

// const firestore = admin.firestore()
// const storage = admin.storage().bucket()
// const cors = Cors()

// function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, result => {
//       if (result instanceof Error) {
//         return reject(result)
//       }

//       return resolve(result)
//     })
//   })
// }

// const handler: NextApiHandler = async (req, res) => {
//   runMiddleware(req, res, cors)
//   const {
//     query: { id },
//   } = req
//   const snapshot = await firestore
//     .collection('posts')
//     .doc(<string>id)
//     .get()

//   if (!snapshot.exists) {
//     return res.json({ error: 'Document not found!' })
//   }

//   const { url } = snapshot.data() as Post

//   const tempPath = path.join(os.tmpdir(), `thumb-${snapshot.id}.jpeg`)

//   const imageResponse = await fetch(url)
//   const buffer = await imageResponse.buffer()

//   try {
//     await sharp(buffer).resize(200).toFormat('jpeg').toFile(tempPath)
//     const uploadRes = await storage.upload(tempPath)
//     const thumbUrl = await uploadRes[0].getSignedUrl({
//       action: 'read',
//       expires: '03-09-2491',
//     })

//     await snapshot.ref.update({ thumbUrl: thumbUrl[0] })
//     return res.json({ message: 'succcess' })
//   } catch (e) {
//     return res.json({ error: e.message })
//   }
// }

// export default handler

export default function lol() {}
