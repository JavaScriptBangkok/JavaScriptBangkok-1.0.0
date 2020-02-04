import * as functions from 'firebase-functions'
import * as Announcement from './Announcement'
import * as Authentication from './Authentication'
import { initializeFirebase } from './FirebaseSetup'
import * as FoodReservation from './FoodReservation'
import * as Networking from './Networking'

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

export const tester = functions
  .region('asia-northeast1')
  .https.onRequest(async (request, response) => {
    try {
      switch (request.body.command) {
        case 'resetFoodReservationTestEnvironment': {
          await FoodReservation.resetTestEnv()
          response.status(200).json({ ok: true })
          return
        }
        case 'setOrderingPeriodEndTime': {
          const time = +request.body.orderingPeriodEndTime
          if (!time) {
            response
              .status(400)
              .json({ ok: false, message: 'Invalid timestamp' })
            return
          }
          await FoodReservation.setOrderingPeriodEndTime('test', time)
          response.status(200).json({ ok: true })
          return
        }
        default: {
          response.status(400).json({ ok: false, message: 'Invalid command' })
          return
        }
      }
    } catch (e) {
      response.status(500).json({ ok: false })
      console.error(e)
    }
  })

export const signInWithEventpop = functions
  .region('asia-northeast1')
  .https.onCall(async data => {
    const env = envFromUserInput(data.env)
    const code = String(data.code)
    const result = await Authentication.authenticateWithEventpopAuthorizationCode(
      env,
      code,
    )
    return { ok: true, result }
  })

export const selectFoodChoice = functions
  .region('asia-northeast1')
  .https.onCall(async (data, context) => {
    const auth = context.auth
    if (!auth) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'The function must be called while authenticated.',
      )
    }
    const env = envFromUserInput(data.env)
    const uid = auth.uid
    const customizations = data.customizations || {}
    const sanitizedCustomizations: { [key: string]: string[] } = {}
    for (const key of Object.keys(customizations)) {
      if (!Array.isArray(customizations[key])) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          'Customization options should be an array',
        )
      }
      sanitizedCustomizations[key] = customizations[key].map((x: any) =>
        String(x),
      )
    }
    await FoodReservation.saveFoodChoice(env, uid, {
      restaurantId: String(data.restaurantId),
      customizations: sanitizedCustomizations,
    })
    return { ok: true }
  })

function envFromUserInput(env: string) {
  const allowedEnvs = ['development', 'test', 'production']
  if (!allowedEnvs.includes(env)) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Invalid environment name specified',
    )
  }
  return env
}

export const addUserToNetwork = functions
  .region('asia-northeast1')
  .https.onCall(async (data, context) => {
    const auth = context.auth
    if (!auth) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'The function must be called while authenticated.',
      )
    }
    const env = envFromUserInput(data.env)
    const uid = auth.uid

    const checks = [
      await Networking.getUser(env, data.uid),
      await Networking.getUser(env, uid),
    ]

    try {
      const [checkedUser, me] = await Promise.all(checks)
      if (!checkedUser) {
        throw new functions.https.HttpsError(
          'failed-precondition',
          'User does not exist.',
        )
      }

      // NOT ME
      const secondUser: Networking.Network = {
        uid: data.uid,
        name: checkedUser.firstname,
        badge: checkedUser.badge,
      }

      // ME
      const firstUser: Networking.Network = {
        uid: uid,
        name: me.firstname,
        badge: me.badge,
      }

      // CHECK
      if (Networking.willSastifyWinningCondition(me, secondUser)) {
        console.log('All collected.')
      }

      if (Networking.willSastifyWinningCondition(checkedUser, firstUser)) {
        console.log('All collected.')
      }

      const actions = [
        await Networking.createNetwork(env, firstUser.uid, secondUser),
        await Networking.createNetwork(env, secondUser.uid, firstUser),
      ]

      await Promise.all(actions)
      return { ok: true }
    } catch (_) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'User does not exist.',
      )
    }
  })
