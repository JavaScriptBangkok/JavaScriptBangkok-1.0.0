import * as FoodReservation from './FoodReservation'
const env = 'test'

beforeEach(async () => {
  await FoodReservation.clearEnv(env)
})

it.todo('records food choice for user')
it.todo('prevents adding food choice if restaurant is full')
it.todo('prevents adding food choice if menu is out of stock')
it.todo('updates the RTDB cache')
