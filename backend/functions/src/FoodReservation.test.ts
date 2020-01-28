import { initializeFirebase } from './FirebaseSetup'
import * as FoodReservation from './FoodReservation'
const env = 'test'

beforeAll(() => {
  initializeFirebase()
})

beforeEach(async () => {
  await FoodReservation.clearEnv(env)
})

it('records food choice for user', async () => {
  const foodChoice: FoodReservation.FoodChoice = {
    restaurantId: 'FoodStall',
    customizations: {
      choices: ['A', 'B'],
    },
  }
  await FoodReservation.saveFoodChoice(env, 'userA', foodChoice)
  const storedChoice = await FoodReservation.retrieveFoodChoice(env, 'userA')
  expect(storedChoice).toEqual(foodChoice)
})

it.todo('prevents adding food choice if restaurant is full')
it.todo('prevents adding food choice if menu is out of stock')
it.todo('updates the RTDB cache')
