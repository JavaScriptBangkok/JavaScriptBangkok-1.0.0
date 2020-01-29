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
      const allowedUids = ['test01', 'test02', 'test03', 'test04', 'test05']
      if (!allowedUids.includes(uid)) {
        response
          .status(400)
          .json({ ok: false, message: 'This uid is not allowed' })
        return
      }
      await Authentication.intializeProfile('test', uid, {
        firstname: uid,
        lastname: 'user',
        email: `${uid}@example.com`,
        referenceCode: uid.toUpperCase(),
        ticketType: 'Test Ticket',
      })
      const token = await Authentication.mintUserToken(uid)
      response.json({ ok: true, token: token })
    } catch (e) {
      response.status(500).json({ ok: false })
      console.error(e)
    }
  })
