import { getEnvRef, getEnvDoc } from './FirebaseSetup'

export async function updateAnnouncementText(env: string, text: string) {
  await getEnvDoc(env)
    .collection('configuration')
    .doc('announcement')
    .set({ text }, { merge: true })
  await getEnvRef(env)
    .child('announcement')
    .child('text')
    .set(text)
}
