import { getFirebaseUidFromTicketCode } from './Authentication'
import { initializeFirebase } from './FirebaseSetup'

beforeAll(() => {
  initializeFirebase()
})

describe('getFirebaseUidFromTicketCode', () => {
  it('returns different uid for different tickets', async () => {
    const [a, b] = await Promise.all([
      getFirebaseUidFromTicketCode('test', 'ABCDEF'),
      getFirebaseUidFromTicketCode('test', 'GHIJKL'),
    ])
    expect(a).not.toEqual(b)
  })
  it('returns same uid for same ticket', async () => {
    const [a, b] = await Promise.all([
      getFirebaseUidFromTicketCode('test', 'MNOPQR'),
      getFirebaseUidFromTicketCode('test', 'MNOPQR'),
    ])
    expect(a).toEqual(b)
  })
})
