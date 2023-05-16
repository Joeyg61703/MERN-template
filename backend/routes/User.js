const express = require("express");

const { getUser, loginUser, registerUser } = require("../controllers/User.js")

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


module.exports = router;