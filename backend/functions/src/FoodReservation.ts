import * as t from 'io-ts'
import * as Either from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { getEnvDoc } from './FirebaseSetup'
import { testMenu } from './FoodReservationTestFixture'
import admin from 'firebase-admin'

type FoodModel = t.TypeOf<typeof FoodModel>

export function decodeFoodModel(data: any): FoodModel {
  const decoded = FoodModel.decode(data)
  return Either.fold(
    () => {
      throw new Error(
        `Validation error:\n` + PathReporter.report(decoded).join('\n'),
      )
    },
    (food: FoodModel) => {
      return food
    },
  )(decoded)
}

export async function importFood(env: string, model: FoodModel) {
  await getEnvDoc(env)
    .collection('configuration')
    .doc('food')
    .set({ menu: model }, { merge: true })
}

export async function setOrderingPeriodEndTime(env: string, time: number) {
  await getEnvDoc(env)
    .collection('configuration')
    .doc('food')
    .set({ orderingPeriodEndTime: time }, { merge: true })
}

export async function resetTestEnv() {
  const env = 'test'
  await getEnvDoc(env)
    .collection('configuration')
    .doc('food')
    .delete()
  await getEnvDoc(env)
    .collection('foodChoices')
    .get()
    .then(snapshot => {
      if (snapshot.size == 0) return
      let batch = admin.firestore().batch()
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref)
      })
      return batch.commit()
    })
  const foodModel = decodeFoodModel(testMenu)
  await importFood(env, foodModel)
  await setOrderingPeriodEndTime(env, Date.now() + 3600e3)
  await saveFoodChoice(env, 'test01', {
    restaurantId: 'FoodStall',
    customizations: {
      Food: ['A', 'B'],
    },
  })
}

export async function saveFoodChoice(
  env: string,
  userId: string,
  foodChoice: FoodChoice,
) {
  await getEnvDoc(env)
    .collection('foodChoices')
    .doc(userId)
    .set(foodChoice)
}

export async function retrieveFoodChoice(
  env: string,
  userId: string,
): Promise<FoodChoice | undefined> {
  return (
    await getEnvDoc(env)
      .collection('foodChoices')
      .doc(userId)
      .get()
  ).data() as any
}

export type FoodChoice = {
  restaurantId: string
  customizations: {
    [customizationId: string]: string[]
  }
}

// Type definitions
export const CustomizationChoice = t.intersection(
  [
    t.type({
      id: t.string,
      title: t.string,
    }),
    t.partial({
      info: t.string,
      availability: t.number,
    }),
  ],
  'CustomizationChoice',
)

export const Customization = t.intersection(
  [
    t.type({
      id: t.string,
      title: t.string,
      choices: t.array(CustomizationChoice),
    }),
    t.partial({
      allowedChoices: t.number,
    }),
  ],
  'Customization',
)

export const Restaurant = t.intersection(
  [
    t.type({
      id: t.string,
      title: t.string,
      customizations: t.array(Customization),
    }),
    t.partial({
      availability: t.number,
      info: t.string,
    }),
  ],
  'Restaurant',
)

export const Group = t.type(
  {
    title: t.string,
    choices: t.array(Restaurant),
  },
  'Group',
)

export const FoodModel = t.type(
  {
    groups: t.array(Group),
  },
  'FoodModel',
)
