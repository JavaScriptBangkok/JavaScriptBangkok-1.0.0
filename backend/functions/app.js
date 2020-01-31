const express = require('express');
const bodyParser = require("body-parser")
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());

const users = require("./users.js");
router.use("/", users);

module.exports = router;