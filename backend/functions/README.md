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
