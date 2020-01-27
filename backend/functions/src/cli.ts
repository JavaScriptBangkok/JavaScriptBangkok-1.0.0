import * as tkt from 'tkt'
import yaml from 'js-yaml'
import * as fs from 'fs'

import { initializeFirebase } from './FirebaseSetup'
import * as FoodReservation from './FoodReservation'

initializeFirebase()

tkt
  .cli({
    env: {
      desc: 'Environment',
      default: 'dev',
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

    await importFood('data/food-test.yml', 'dev')
    log.info('All done!')
  })
  .parse()
