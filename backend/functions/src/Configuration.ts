import * as functions from 'firebase-functions'

export function getConfig(env: string, path: string[]): string {
  if (process.env[env]) {
    return process.env[env]!
  }
  let config = functions.config()
  for (const key of path) config = config[key]
  if (typeof config !== 'string') {
    throw new Error('Did not find configuration at ' + path.join('.'))
  }
  return config
}
