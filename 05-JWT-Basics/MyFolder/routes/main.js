const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');


const { signup, login, hello } = require("../controllers/main");
const authMiddleware = require("../middleware/auth");

router.route("/hello").get(authMiddleware, hello);
router.route("/signup").post(signup);
router.route("/logon").post(login);

module.exports = router;