import admin from 'firebase-admin'
import * as fs from 'fs'

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
    admin.initializeApp({
      databaseURL: 'https://javascriptbangkok-companion.firebaseio.com',
    })
  }
}

export function getEnvRef(env: string) {
  return admin.database().ref(`environments/${env}`)
}

export function getEnvDoc(env: string) {
  return admin
    .firestore()
    .collection('environments')
    .doc(env)
}
