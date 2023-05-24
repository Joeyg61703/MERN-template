const express = require("express");

const { getUser, loginUser, registerUser, updateSettings } = require("../controllers/User.js")

const router = express.Router();

//Route: /auth/register
router.route("/register")
.post(registerUser); //creation of user

//Route: /auth/login
router.route("/login")
.post(loginUser);

//Route: /auth/user
router.route("/user")
.get(getUser);

//Route: /auth/user/settings
router.route("/user/settings")
.post(updateSettings);


module.exports = router;