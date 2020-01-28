import admin from 'firebase-admin'

export async function updateAnnouncementText(env: string, text: string) {
  await getEnvRef(env)
    .child('announcement')
    .child('text')
    .set(text)
}

function getEnvRef(env: string) {
  return admin.database().ref(`environments/${env}`)
}
