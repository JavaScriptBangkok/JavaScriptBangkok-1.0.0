import * as tkt from 'tkt'
import yaml from 'js-yaml'
import * as fs from 'fs'

import { initializeFirebase } from './FirebaseSetup'
import * as FoodReservation from './FoodReservation'
import * as Authentication from './Authentication'

initializeFirebase()
require('dotenv').config()

tkt
  .cli({
    env: {
      desc: 'Environment',
      default: 'development',
    },
  })
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

    await importFood('data/food-test.yml', 'test')
    await importFood('data/food.yml', 'development')
    await importFood('data/food.yml', 'production')
    log.info('All done!')
  })
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
  .parse()
