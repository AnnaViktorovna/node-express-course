require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/connect");

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());


const mainRouter = require("./routes/main");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const {connection} = require("mongoose");





app.use(express.json());

app.use("/api/v1", mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT ? process.env.PORT : 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const collections = await connection.db.listCollections().toArray();

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();