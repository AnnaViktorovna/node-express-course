const mongoose = require("mongoose");

const connectDb = (url) => {
    console.log(url);
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDb;