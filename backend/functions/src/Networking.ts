import admin from 'firebase-admin'
import { ProfileData } from './Authentication'
import { getEnvDoc } from './FirebaseSetup'

export type Network = {
  uid: string
  name: string
  badge: string
}

export const getUser = async (env: string, userID: string) => {
  return (
    await getEnvDoc(env)
      .collection('profiles')
      .doc(userID)
      .get()
  ).data() as ProfileData
}

export const addUser = async (
  env: string,
  authUserID: string,
  user: Network,
) => {
  await getEnvDoc(env)
    .collection('profiles')
    .doc(authUserID)
    .update({
      networks: admin.firestore.FieldValue.arrayUnion(user),
    })
  return true
}
