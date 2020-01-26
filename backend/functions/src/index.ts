import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import serviceAccount from './service-account.json'

admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://javascriptbangkok-companion.firebaseio.com',
})

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})
