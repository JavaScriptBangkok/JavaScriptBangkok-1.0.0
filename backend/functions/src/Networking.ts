import admin from 'firebase-admin'
import { Network, NetworkingProfile, ProfileData } from './@types'
import { getEnvDoc, getEnvRef } from './FirebaseSetup'

const onlyUnique = (value: any, index: any, self: any) =>
  self.indexOf(value) === index

export const badges = [
  {
    id: 1,
    name: 'JavaScript Bangkok',
  },
  {
    id: 2,
    name: 'Angular',
  },
  {
    id: 3,
    name: 'React',
  },
  // {
  //   id: 4,
  //   name: 'NodeJS',
  // },
  // {
  //   id: 5,
  //   name: 'Firebase',
  // },
  // {
  //   id: 6,
  //   name: 'Vue',
  // },
  // {
  //   id: 7,
  //   name: 'TypeScript',
  // },
]

export const initializeNetworkingProfile = async (
  env: string,
  userID: string,
  userProfile: ProfileData,
  bio: string,
) => {
  const allowedUids = ['test01', 'test02', 'test03', 'test04', 'test05']
  const networkingProfile: NetworkingProfile = {
    firstname: userProfile.firstname,
    lastname: userProfile.lastname,
    networks: [],
    badge:
      env === 'test'
        ? (allowedUids.indexOf(userID) % badges.length) + 1
        : getRandomBadge(),
    bio: bio ?? '',
  }
  await getEnvDoc(env)
    .collection('networkingProfiles')
    .doc(userID)
    .set(networkingProfile)
  return true
}

export const getNetworkingProfile = async (env: string, userID: string) => {
  return (
    await getEnvDoc(env)
      .collection('networkingProfiles')
      .doc(userID)
      .get()
  ).data() as NetworkingProfile
}

export const createNetwork = async (
  env: string,
  targetUserID: string,
  user: Network,
) => {
  await getEnvDoc(env)
    .collection('networkingProfiles')
    .doc(targetUserID)
    .update({
      networks: admin.firestore.FieldValue.arrayUnion(user),
    })
  return true
}

export const willSastifyWinningCondition = (
  user: NetworkingProfile,
  nextUser: Network,
) => {
  let currentBadges = user.networks.map(network => network.badge)
  currentBadges.push(user.badge)
  currentBadges.push(nextUser.badge)
  currentBadges = currentBadges.filter(onlyUnique)
  const badgeIDs = badges.map(b => b.id)
  const isSastified =
    currentBadges.sort().join('.') === badgeIDs.sort().join('.')
  return isSastified
}

export const editBio = async (env: string, userID: string, bio: string) => {
  await getEnvDoc(env)
    .collection('networkingProfiles')
    .doc(userID)
    .update({
      bio,
    })
  return true
}

export const addEventWinner = async (env: string, userID: string) => {
  // await getEnvRef(env)
  //   .child('networking')
  //   .child('winners')
  //   .set({ [userID]: 'Hello!' })
  console.log(`[addEventWinner:${env}]`, userID)
  const payload: { [key: string]: number } = {}
  payload[userID] = admin.database.ServerValue.TIMESTAMP
  const timestamp = admin.database.ServerValue.TIMESTAMP
  await getEnvRef(env)
    .child('networking')
    .child('winners')
    .child(userID)
    .set(timestamp)
  return true
}

export const getRandomBadge = () =>
  badges[Math.floor(Math.random() * badges.length)].id
