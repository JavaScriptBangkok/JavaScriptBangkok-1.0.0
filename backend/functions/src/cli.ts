import * as tkt from 'tkt'
import yaml from 'js-yaml'
import * as fs from 'fs'

import { initializeFirebase, getEnvDoc } from './FirebaseSetup'
import * as FoodReservation from './FoodReservation'
import * as Authentication from './Authentication'

initializeFirebase()
require('dotenv').config()

tkt
  .cli({})
  .command('import-food', 'Import food list', {}, async () => {
    const log = tkt.logger('import-food')

    const importFood = async (filename: string, env: string) => {
      log.info(
        'Importing food menus from "%s" into %s environment...',
        filename,
        env,
      )
      const data = yaml.safeLoad(fs.readFileSync(filename, 'utf8'))
      const foodModel = FoodReservation.decodeFoodModel(data)
      await FoodReservation.importFood(env, foodModel)
    }

    await importFood('data/food.yml', 'development')
    await importFood('data/food.yml', 'production')
    log.info('All done!')
  })
  .command(
    'reset-test-env',
    'Resets the food reservation database for test environment',
    {},
    async () => {
      await FoodReservation.resetTestEnv()
    },
  )
  .command(
    'synchronize-food-selection-stats <env>',
    'Synchronizes the food selection stats',
    {
      env: {
        desc: 'Environment to update',
      },
    },
    async (args: any) => {
      await FoodReservation.synchronizeSelectionStats(args.env)
    },
  )
  .command(
    'sign-in-with-eventpop <env> <code>',
    'Performs the sign-in-with-Eventpop flow',
    {
      env: {
        desc: 'Environment to sign in to',
      },
      code: {
        desc: 'OAuth2 authorization code received from Eventpop',
      },
    },
    async (args: any) => {
      const result = await Authentication.authenticateWithEventpopAuthorizationCode(
        args.env,
        args.code,
      )
      console.log(JSON.stringify(result, null, 2))
    },
  )
  .command(
    'check-eventpop-code <code>',
    'Check Eventpop OAuth2 authorization code and return the Eventpop access token',
    {
      code: {
        desc: 'OAuth2 authorization code received from Eventpop',
      },
    },
    async (args: any) => {
      const log = tkt.logger('check-eventpop-code')
      const token = await Authentication.getAccessTokenFromEventpop(args.code)
      log.info(token)
    },
  )
  .command(
    'get-eventpop-profile <token>',
    'Get the profile from Eventpop access token',
    {
      token: {
        desc: 'OAuth2 access token',
      },
    },
    async (args: any) => {
      const log = tkt.logger('get-eventpop-profile')
      const profile = await Authentication.getProfilesFromEventpop(args.token)
      log.info(profile)
    },
  )
  .command(
    'emergency:migrate-profile',
    'Migrate profiles to new scheme',
    {},
    async (args: any) => {
      const data = await getEnvDoc('production')
        .collection('profiles')
        .get()
      for (const doc of data.docs) {
        if (doc.id.match(/^eventpop_......$/)) {
          const uid = await Authentication.getFirebaseUidFromTicketCode(
            'production',
            doc.get('referenceCode'),
          )
          const existing = data.docs.find(d => d.id === uid)
          if (existing) {
            if (doc.createTime.toMillis() > existing.createTime.toMillis()) {
              console.log('migrate existing', doc.id, existing.id)
              await getEnvDoc('production')
                .collection('profiles')
                .doc(uid)
                .set(doc.data())
            } else {
              console.log('keep existing', doc.id, existing.id)
            }
          } else {
            console.log('migrate new', doc.id, uid)
            await getEnvDoc('production')
              .collection('profiles')
              .doc(uid)
              .set(doc.data())
          }
        }
      }
      console.log('all done')
    },
  )
  .command(
    'emergency:migrate-food',
    'Migrates food choice to new UID',
    {},
    async (args: any) => {
      const data = await getEnvDoc('production')
        .collection('foodChoices')
        .get()
      for (const doc of data.docs) {
        const m = doc.id.match(/^eventpop_(......)$/)
        if (m) {
          const uid = await Authentication.getFirebaseUidFromTicketCode(
            'production',
            m[1],
          )
          const existing = data.docs.find(d => d.id === uid)
          if (existing) {
            if (doc.createTime.toMillis() > existing.createTime.toMillis()) {
              console.log('migrate existing', doc.id, existing.id)
              await getEnvDoc('production')
                .collection('foodChoices')
                .doc(uid)
                .set(doc.data())
            } else {
              console.log('keep existing', doc.id, existing.id)
            }
          } else {
            console.log('migrate new', doc.id, uid)
            await getEnvDoc('production')
              .collection('foodChoices')
              .doc(uid)
              .set(doc.data())
          }
        }
      }
      console.log('all done')
    },
  )
  .command(
    'emergency:purge-old-ids',
    'Purges profiles and food choices with old ID scheme',
    {},
    async (args: any) => {
      {
        const data = await getEnvDoc('production')
          .collection('profiles')
          .get()
        for (const doc of data.docs) {
          if (doc.id.match(/^eventpop_......$/)) {
            console.log('remove', doc.id)
            await doc.ref.delete()
          }
        }
      }
      {
        const data = await getEnvDoc('production')
          .collection('foodChoices')
          .get()
        for (const doc of data.docs) {
          if (doc.id.match(/^eventpop_......$/)) {
            console.log('remove', doc.id)
            await doc.ref.delete()
          }
        }
      }
      console.log('all done')
    },
  )
  .command('stats', 'Displays stats', {}, async (args: any) => {
    const data = await getEnvDoc('production')
      .collection('foodChoices')
      .get()
    console.log(data.size)
  })
  .parse()
