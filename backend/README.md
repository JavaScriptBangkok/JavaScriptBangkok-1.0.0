# JavaScriptBangkok-1.0.0/backend

Backend code for some of our systems in use.

Hello. This is an api for backend for networking of bangkok-js. Here are the routes:

https://us-central1-networking-bangkok-js.cloudfunctions.net/widgets/<input> : See below

users : Retrieve all user data

user/:id : Retrieve a specific user data

adduser/:id : Add user if there is none with this id yet and set the user data to req.body

updateuser/:id : Update user data to req.body

addusernetwork/:id/:network : Update user of the specified id to have networks of specified value