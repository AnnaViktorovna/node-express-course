const express = require("express");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
require("express-async-errors");
require("dotenv").config();

const productsRouter = require("./routes/products");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/products", productsRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
