import admin from 'firebase-admin'
import { ProfileData } from './Authentication'
import { getEnvDoc } from './FirebaseSetup'

const onlyUnique = (value: any, index: any, self: any) =>
  self.indexOf(value) === index

export type Network = {
  uid: string
  name: string
  badge: string
}

export const badges = ['TypeScript', 'JavaScript', 'React']

export const getUser = async (env: string, userID: string) => {
  return (
    await getEnvDoc(env)
      .collection('profiles')
      .doc(userID)
      .get()
  ).data() as ProfileData
}

export const createNetwork = async (
  env: string,
  targetUserID: string,
  user: Network,
) => {
  await getEnvDoc(env)
    .collection('profiles')
    .doc(targetUserID)
    .update({
      networks: admin.firestore.FieldValue.arrayUnion(user),
    })
  return true
}

export const isSastifiedWinningCondition = async (
  env: string,
  user: ProfileData,
  nextUser: Network,
) => {
  let currentBadges = user.networks.map(network => network.badge)
  currentBadges.push(user.badge)
  currentBadges = currentBadges.filter(onlyUnique)
  const isSastified = currentBadges.sort().join('.') === badges.sort().join('.')
  return isSastified
}
