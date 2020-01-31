const express = require('express');
const cors = require('cors');
const app = express();
const functions = require('firebase-functions');

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
const firestoreAPI = require("./app.js"); 
app.use("/", firestoreAPI);

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);