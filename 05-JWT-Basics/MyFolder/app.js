require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/connect");

const express = require("express");
const app = express();

const mainRouter = require("./routes/main");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");


app.use(express.json());

app.use("/api/v1", mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT ? process.env.PORT : 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
const token = jwt.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: "24h" });

console.log("Generated Token:", token); 
res.status(200).json({ msg: "user login", token });

console.log("JWT_SECRET:", process.env.JWT_SECRET);

start();