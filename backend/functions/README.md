## Prerequisite

Follow these steps to download service account to your local machine

1. Login to firebase console.
2. Next to `Project overview` is setting, then select "Service accounts" tab.
3. Generate new private key and save as "service-account.json" to `backend/functions/src`
   (the file should live at the same level of package.json inside `backend/functions/src`)

## API Development

```bash
yarn dev
```
This will watch typescript files under src and run firebase emulator at PORT=5000
(hot-reloading)

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