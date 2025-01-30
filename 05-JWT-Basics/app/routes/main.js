const express = require("express");
const router = express.Router();

const { signup, login, hello } = require("../controllers/main");
const authMiddleware = require("../middleware/auth");

router.route("/hello").get(authMiddleware, hello);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/dashboard").get(authMiddleware, (req, res) => {
    res.status(200).json({
      msg: "Welcome to the dashboard",
      secret: "Here is your secret data",
    })
  })
  

module.exports = router;