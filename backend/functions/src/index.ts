import * as functions from 'firebase-functions'
import { initializeFirebase } from './FirebaseSetup'

initializeFirebase()

export const helloWorld = functions.region('asia-northeast1').https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})
