import * as functions from 'firebase-functions'
import { Network } from './@types'
import * as Announcement from './Announcement'
import * as Authentication from './Authentication'
import { getEnvDoc, initializeFirebase } from './FirebaseSetup'
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

export const setAnnouncement = functions
  .region('asia-northeast1')
  .https.onRequest(async (request, response) => {
    try {
      const env = envFromUserInput(request.body.env || request.query.env)
      const authorization = await getEnvDoc(env)
        .collection('apiKeys')
        .doc(request.body.apiKey || request.query.apiKey)
        .get()
      if (!authorization.exists || !authorization.get('canEditAnnouncement')) {
        response.status(401).json({ ok: false, message: 'Not authorized' })
        return
      }
      const isAnIssue = request.body.issue?.number === 46
      await Announcement.updateAnnouncementText(
        env,
        isAnIssue ? request.body.issue.body : request.body.text,
      )
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

export const signInWithEventpopInfo = functions
  .region('asia-northeast1')
  .https.onCall(async data => {
    const env = envFromUserInput(data.env)
    const result = await Authentication.authenticateWithEventpopTicketInfo(
      env,
      String(data.referenceCode),
      String(data.phoneNumber),
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

export const createNetworkingProfile = functions
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
    const userProfile = await Authentication.getUserProfile(env, uid)
    await Networking.initializeNetworkingProfile(
      env,
      uid,
      userProfile,
      data.bio,
    )
    return { ok: true }
  })

export const addWinner = functions
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
    if (env === 'test') {
      console.log(`[addWinner:${env}]`, uid)
      await Networking.addEventWinner(env, uid)
      return { ok: true }
    } else {
      return { ok: false }
    }
  })

export const getNetworkingProfile = functions
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
    const profile = await Networking.getNetworkingProfile(env, data.uid)
    return profile
  })

export const updateBio = functions
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
    await Networking.editBio(env, uid, data.bio)
    return { ok: true }
  })

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
      Networking.getNetworkingProfile(env, data.uid),
      Networking.getNetworkingProfile(env, uid),
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
      const secondUser: Network = {
        uid: data.uid,
        name: checkedUser.firstname,
        badge: checkedUser.badge,
      }

      // ME
      const firstUser: Network = {
        uid: uid,
        name: me.firstname,
        badge: me.badge,
      }

      // CHECK
      const actions = [
        Networking.createNetwork(env, firstUser.uid, secondUser),
        Networking.createNetwork(env, secondUser.uid, firstUser),
      ]

      await Promise.all(actions)

      const batch = []

      if (Networking.willSastifyWinningCondition(me, secondUser)) {
        batch.push(Networking.addEventWinner(env, uid))
      }

      if (Networking.willSastifyWinningCondition(checkedUser, firstUser)) {
        batch.push(Networking.addEventWinner(env, data.uid))
      }

      await Promise.all(batch)
      return { ok: true }
    } catch (_) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'User does not exist.',
      )
    }
  })
