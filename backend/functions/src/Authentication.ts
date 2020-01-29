import admin from 'firebase-admin'
import { getEnvDoc } from './FirebaseSetup'

export async function mintUserToken(uid: string) {
  return admin.auth().createCustomToken(uid)
}

export type ProfileData = {
  firstname: string
  lastname: string
  email: string
  referenceCode: string
  ticketType: string
}

export async function intializeProfile(
  env: string,
  uid: string,
  initialProfileData: ProfileData,
): Promise<ProfileData> {
  await admin
    .auth()
    .createUser({
      uid: uid,
      email: initialProfileData.email,
      emailVerified: true,
    })
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
