import {
  getFirebaseUidFromTicketCode,
  authenticateWithEventpopTicketInfo,
  normalizePhoneNumber,
} from './Authentication'
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

describe('normalizePhoneNumber', () => {
  it('works', () => {
    expect(normalizePhoneNumber('081-234-5678')).toEqual('12345678')
    expect(normalizePhoneNumber('+66-81-234-5678')).toEqual('12345678')
  })
})

if (process.env.MY_TICKET_CODE && process.env.MY_PHONE_NUMBER) {
  describe('authenticateWithEventpopTicketInfo', () => {
    it('returns profile for correct info', async () => {
      const [result] = await authenticateWithEventpopTicketInfo(
        'test',
        process.env.MY_TICKET_CODE!,
        process.env.MY_PHONE_NUMBER!,
      )
      expect(result.profile.firstname).toEqual('Thai')
      expect(result.profile.lastname).toEqual('Pangsakulyanont')
      expect(result.profile.ticketType).toEqual('Event Staff')
    })
    it('does not return profile for incorrect refcode', async () => {
      const result = await authenticateWithEventpopTicketInfo(
        'test',
        'bogus',
        process.env.MY_PHONE_NUMBER!,
      )
      expect(result).toHaveLength(0)
    })
    it('does not return profile for incorrect phone number', async () => {
      const result = await authenticateWithEventpopTicketInfo(
        'test',
        process.env.MY_TICKET_CODE!,
        'bogus',
      )
      expect(result).toHaveLength(0)
    })
  })
}
