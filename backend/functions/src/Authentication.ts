import axios from 'axios'
import admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import querystring from 'querystring'
import { ProfileData } from './@types'
import { getConfig } from './Configuration'
import { getEnvDoc } from './FirebaseSetup'
import ObjectID from 'bson-objectid'

export async function mintUserToken(uid: string) {
  return admin.auth().createCustomToken(uid)
}

export async function intializeProfile(
  env: string,
  uid: string,
  initialProfileData: ProfileData,
): Promise<ProfileData> {
  await admin
    .auth()
    .createUser({ uid: uid })
    .catch(error => {
      if (error?.errorInfo?.code === 'auth/uid-already-exists') {
        return
      }
      throw error
    })
  const profileDoc = getEnvDoc(env)
    .collection('profiles')
    .doc(uid)
  const result = await admin.firestore().runTransaction(async tx => {
    const profile = await tx.get(profileDoc)
    if (!profile.exists) {
      tx.set(profileDoc, initialProfileData, { merge: true })
      return initialProfileData
    } else {
      return profile.data()
    }
  })
  return result as ProfileData
}

export async function getTestToken(uid: string) {
  const allowedUids = ['test01', 'test02', 'test03', 'test04', 'test05']
  if (!allowedUids.includes(uid)) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Invalid UID specified for testing. Allowed UIDs are: ' +
        allowedUids.join(', '),
    )
  }
  await intializeProfile('test', uid, {
    firstname: uid,
    lastname: 'user',
    email: `${uid}@example.com`,
    referenceCode: uid.toUpperCase(),
    ticketType: 'Test Ticket',
  })
  const token = await mintUserToken(uid)
  return token
}

export async function authenticateWithEventpopAuthorizationCode(
  env: string,
  code: string,
): Promise<{ profile: ProfileData; firebaseToken: string }[]> {
  const accessToken = await getAccessTokenFromEventpop(code)
  const profiles = await getProfilesFromEventpop(accessToken)
  return Promise.all(
    profiles.map(async profile => {
      const uid = await getFirebaseUidFromTicketCode(env, profile.referenceCode)
      await intializeProfile(env, uid, profile)
      const token = await mintUserToken(uid)
      return {
        profile,
        firebaseToken: token,
      }
    }),
  )
}

export const normalizePhoneNumber = (phoneNumber: string) =>
  phoneNumber.replace(/\D/g, '').slice(-8)

export async function authenticateWithEventpopTicketInfo(
  env: string,
  referenceCode: string,
  phoneNumber: string,
): Promise<{ profile: ProfileData; firebaseToken: string }[]> {
  if (!referenceCode.match(/^\w{6}$/)) return []
  const snapshot = await admin
    .database()
    .ref('eventpopTickets')
    .child(referenceCode.toUpperCase())
    .once('value')
  if (!snapshot.exists()) return []
  const foundPhoneNumber = String(snapshot.child('phoneNumber').val())
  if (
    normalizePhoneNumber(foundPhoneNumber) !== normalizePhoneNumber(phoneNumber)
  ) {
    return []
  }
  const profile: ProfileData = {
    firstname: String(snapshot.child('firstname').val()),
    lastname: String(snapshot.child('lastname').val()),
    email: String(snapshot.child('email').val()),
    referenceCode: String(snapshot.child('referenceCode').val()),
    ticketType: String(snapshot.child('ticketType').val()),
  }
  const uid = await getFirebaseUidFromTicketCode(env, profile.referenceCode)
  await intializeProfile(env, uid, profile)
  const token = await mintUserToken(uid)
  return [
    {
      profile,
      firebaseToken: token,
    },
  ]
}

export async function getAccessTokenFromEventpop(
  code: string,
): Promise<string> {
  const tokenResponse = await axios
    .post(
      'https://www.eventpop.me/oauth/token',
      querystring.stringify({
        client_id: getConfig('EVENTPOP_CLIENT_ID', ['eventpop', 'clientid']),
        client_secret: getConfig('EVENTPOP_CLIENT_SECRET', [
          'eventpop',
          'clientsecret',
        ]),
        code: code,
        redirect_uri:
          'https://javascriptbangkok.com/1.0.0/eventpop_oauth_callback.html',
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .catch(handleNetworkError('Getting access token'))
  const accessToken = tokenResponse.data.access_token
  if (typeof accessToken !== 'string') {
    throw new Error('Did not get an access token')
  }
  return accessToken
}

export async function getProfilesFromEventpop(
  accessToken: string,
): Promise<ProfileData[]> {
  const ticketResponse = await axios
    .get('https://www.eventpop.me/api/public/organizers/2444/tickets', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      params: {
        q: JSON.stringify({ event_id: 7210 }),
      },
    })
    .catch(handleNetworkError('Getting access token'))
  const tickets = ticketResponse.data.tickets
  if (!Array.isArray(tickets)) {
    throw new Error('Resulting tickets is not an array, got ' + typeof tickets)
  }
  return tickets.map(
    (ticket): ProfileData => ({
      firstname: ticket.firstname,
      lastname: ticket.lastname,
      email: ticket.email,
      referenceCode: ticket.reference_code,
      ticketType: ticket.ticket_type?.name,
    }),
  )
}

function handleNetworkError(action: string) {
  return (error: Error) => {
    const data = (error as any).response?.data
    if (data) {
      console.error('Error response:', data)
    }
    throw new Error('Failed to ' + action + ': ' + error)
  }
}

export const getUserProfile = async (env: string, userID: string) => {
  return (
    await getEnvDoc(env)
      .collection('profiles')
      .doc(userID)
      .get()
  ).data() as ProfileData
}

export function getFirebaseUidFromTicketCode(
  env: string,
  referenceCode: string,
) {
  const doc = getEnvDoc(env)
    .collection('ticketReferenceCodeToUid')
    .doc(referenceCode)
  return admin.firestore().runTransaction(async tx => {
    const existing = await tx.get(doc)
    if (existing.exists) {
      return existing.get('uid')
    } else {
      const uid = 'eventpop_' + ObjectID.generate()
      tx.set(doc, { uid })
      return uid
    }
  })
}
