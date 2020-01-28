import { getEnvRef } from './FirebaseSetup'

export async function updateAnnouncementText(env: string, text: string) {
  await getEnvRef(env)
    .child('announcement')
    .child('text')
    .set(text)
}
