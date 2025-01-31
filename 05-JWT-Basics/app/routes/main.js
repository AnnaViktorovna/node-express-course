const express = require("express");
const router = express.Router();

const { signup, login, hello } = require("../controllers/main");
const authenticationMiddleware = require("../middleware/auth");

router.route("/hello").get(authenticationMiddleware, hello);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/dashboard").get(authenticationMiddleware, (req, res) => {
    res.status(200).json({
      msg: "Welcome to the dashboard, ${req.user.name}",
      secret: "Here is your secret data",
    })
  })
  

module.exports = router;