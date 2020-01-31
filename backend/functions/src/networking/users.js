// Using https://www.youtube.com/watch?v=-NsHWrrUgdk as guide

const express = require("express");
const router = express.Router();

var admin = require("firebase-admin");

var serviceAccount = require("./networking-bangkok-js-firebase-adminsdk-d3d5j-1b2eb3ffbf.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://networking-bangkok-js.firebaseio.com"
});

database = admin.firestore();
collection = database.collection("users");

router.get("/users", (req, res) => {
    let allUsers = [];
    collection.get().then(snapshot => {

        //process data
        snapshot.forEach(doc => {
            allUsers.push(doc.data());
        });

        //then respond as response
        res.status(200).json({
            "message": "Retrieved all user data",
            "data": allUsers,
        });

    }).catch(err => {
        res.status(500).json({
            "message": "Error retrieving users", 
            "data": err,
        });
    });
});
 
router.get("/user/:id", (req, res) => {
    let oneUser = []
    collection.doc(req.params.id).get().then(doc => {

        if (!doc.exists) {
            throw "Invalid user id";
        }
        res.status(200).json({
            "message": "Retrieved one user data",
            "data": doc.data(),
        });

    }).catch(err => {
        if (err == "Invalid user id") {
            res.status(400).json({
                "message": "Error retrieving user", 
                "data": err,
            });
        } else {
            res.status(500).json({
                "message": "Error retrieving user", 
                "data": err,
            });
        }
    });
});

router.post("/updateuser/:id", (req, res) => {
    collection.doc(req.params.id).get().then( doc => {
        
        if (!doc.exists) {
            throw "Invalid user id";
        }
        if (req.body == null || req.body.info == undefined || req.body.networks == undefined) {
            throw "Invalid request body";
        }
        collection.doc(req.params.id).set(req.body).then( () => {
            res.status(200).json({
                "message": "Updated user info",
                "data": req.body,
            });
        });

    }).catch(err => {
        if (err == "Invalid user id" || err == "Invalid request body") {
            res.status(400).json({
                "message": "Error updating user", 
                "data": err,
            });
        } else {
            res.status(500).json({
                "message": "Error updating user", 
                "data": err,
            });
        }
    });
});

router.post("/adduser/:id", (req, res) => {
    collection.doc(req.params.id).get().then( doc => {
        
        if (doc.exists) {
            throw "User already exists";
        }
        if (req.body == null || req.body.info == undefined || req.body.networks == undefined) {
            throw "Invalid request body";
        }
        collection.doc(req.params.id).set(req.body).then( () => {
            res.status(200).json({
                "message": "Updated user info",
                "data": req.body,
            });
        });

    }).catch(err => {
        if (err == "User already exists" || err == "Invalid request body") {
            res.status(400).json({
                "message": "Error adding user", 
                "data": err,
            });
        } else {
            res.status(500).json({
                "message": "Error adding user", 
                "data": err,
            });
        }
    });
});

router.post("/addusernetwork/:id/:network", (req, res) => {
    collection.doc(req.params.id).get().then( doc => {
        if (!doc.exists) {
            throw "User does not exist";
        }
        //append network
        let newData = doc.data();
        if (newData["networks"].includes(req.params.network)) {
            throw "Network already exists for this user";
        }
        newData["networks"].push(req.params.network);
        //update network
        collection.doc(req.params.id).set(newData);
        //respond as response
        res.json({
            "message": "Added one user network",
            "data": newData,
        });
        
    }).catch(err => {
        if (err == "User does not exist" || err == "Network already exists for this user") {
            res.status(400).json({
                "message": "Error updating user network", 
                "data": err,
            });
        } else {
            res.status(500).json({
                "message": "Error updating user network", 
                "data": err,
            });
        }
    })
}); 

module.exports = router