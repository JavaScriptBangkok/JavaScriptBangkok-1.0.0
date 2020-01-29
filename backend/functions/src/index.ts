import * as functions from 'firebase-functions'
import { initializeFirebase } from './FirebaseSetup'
import * as Authentication from './Authentication'
import * as Announcement from './Announcement'

initializeFirebase()

export const helloWorld = functions
  .region('asia-northeast1')
  .https.onRequest((request, response) => {
    response.send('Hello from Firebase!')
  })

export const setTestAnnouncement = functions
  .region('asia-northeast1')
  .https.onRequest(async (request, response) => {
    try {
      await Announcement.updateAnnouncementText('test', request.body.text)
      response.json({ ok: true })
    } catch (e) {
      response.status(500).json({ ok: false })
      console.error(e)
    }
  })

export const getTestToken = functions
  .region('asia-northeast1')
  .https.onRequest(async (request, response) => {
    try {
      const uid = String(request.query.uid)
      const token = await Authentication.getTestToken(uid)
      response.json({ ok: true, token: token })
    } catch (e) {
      response.status(500).json({ ok: false })
      console.error(e)
    }
  })

export const getTestTokenFromApp = functions
  .region('asia-northeast1')
  .https.onCall(async data => {
    const uid = String(data.uid)
    const token = await Authentication.getTestToken(uid)
    return { ok: true, token: token }
  })
