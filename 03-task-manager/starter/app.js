require('./db/connect')
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');


const connectDB = require('./db/connect');
require('dotenv').config();

const errorHandler = require("./middleware/errorHandler");

const notFound = require("./middleware/not-found");

const port = process.env.PORT ? process.env.PORT : 3000;

//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes
app.get('/Hello' , (req,res) => {
    res.send('Task Manager App')
})
app.use('/api/v1/tasks', tasks);

app.use(errorHandler);
app.use(notFound);

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      

     
      app.listen(port, 
          console.log(`Server is listening on port ${port}...`)
      );
  } catch (error) {
      console.error('Failed to connect to the database:', error);
  }
};
 

  start();
