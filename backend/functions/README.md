## Prerequisite

Follow these steps to download service account to your local machine

1. Login to firebase console.
2. Next to `Project overview` is setting, then select "Service accounts" tab.
3. Generate new private key and save as "service-account.json" to `backend/functions/src`
   (the file should live at the same level of package.json inside `backend/functions/src`)

## Developing, Debugging and Testing

### Simulate Functions environment

```bash
yarn dev
```

This will watch typescript files under src and run firebase emulator at PORT=5000
(hot-reloading)

### CLI

There is a CLI command at [src/cli.ts](src/cli.ts) where you can add CLI commands that you want to run for convenience,
such as a command to import food list and testi the Eventpop sign-in flow.

```
node cli --help
```

### Test endpoints

These endpoints are exposed to facilitate automated testing of the system.
They are restricted for use with the `test` environment only.

```js
// Set announcement text
http.post('/setTestAnnouncement', { text: 'Announcement text' })

// Resets the test environment to a known state.
http.post('/tester', {
  command: 'resetFoodReservationTestEnvironment',
})

// Set the time to end the food ordering period
http.post('/tester', {
  command: 'setOrderingPeriodEndTime',
  orderingPeriodEndTime: Date.now() + 300e3,
})
```

## Frontend Development

Start the emulator by

```bash
// run at root dir
yarn workspace functions serve
```

or goto functions dir

```bash
cd backend/functions
yarn serve
```

Now, you can visit the api at `http://localhost:5000/javascriptbangkok-companion/us-central1/{function_name}`

## Networking API

Hello. This is an api for backend for networking of bangkok-js. Here are the routes:

https://us-central1-networking-bangkok-js.cloudfunctions.net/widgets/<input> : See below

users : Retrieve all user data

user/:id : Retrieve a specific user data

adduser/:id : Add user if there is none with this id yet and set the user data to req.body

updateuser/:id : Update user data to req.body

addusernetwork/:id/:network : Update user of the specified id to have networks of specified value