const jwt = require("jsonwebtoken");
const { BadRequest, Unauthenticated } = require("../errors");

require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const {connection} = require("mongoose");

const signup = async (req, res) => {
  const { username, password } = req.body;
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  if (!username || !password ) {
    throw new BadRequest("Please provide username and password");
  }
  console.log(username,password)

  const existingUser = await User.findOne({  username});
console.log(existingUser)
  if (existingUser) {
    throw new BadRequest("Email is already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username,  password: hashedPassword });

  res.status(200).json({ msg: "user created", newUser });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequest("Please provide username and password");
  }
  // const usersCollection = connection.db.collection('Users');
  console.log("Searching for user:", username);
  const user = await User.findOne({ username });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Unauthenticated("Invalid username or password");
  }

  const id = user._id.toString();
  // Генерация токена внутри функции login
  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, { expiresIn: "24h" });

  console.log("Generated Token:", token); // Логируем сгенерированный токен
  res.status(200).json({ msg: "user login", token });
};

const hello = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  const user = await User.findOne({ name: req.user.name });
  res.status(200).json({
    msg: `Hello, ${user.name}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  hello,
  signup,
};
