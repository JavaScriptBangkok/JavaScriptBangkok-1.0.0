import * as fs from 'fs'
import admin from 'firebase-admin'

export function initializeFirebase() {
  if (fs.existsSync('service-account.json')) {
    const serviceAccount = JSON.parse(
      fs.readFileSync('service-account.json', 'utf8'),
    )
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://javascriptbangkok-companion.firebaseio.com',
    })
  } else {
    admin.initializeApp()
  }
}
