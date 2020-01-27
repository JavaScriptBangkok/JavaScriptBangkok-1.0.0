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
  .command('import-food', 'Import food list', {}, async args => {
    const data = yaml.safeLoad(fs.readFileSync('data/food-test.yml', 'utf8'))
    const foodModel = FoodReservation.decodeFoodModel(data)
    console.log(foodModel)
  })
  .parse()
