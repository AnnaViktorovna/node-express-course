const express = require('express');
const app = express();
const tasks = require('./routes/tasks');

const connectDB = require('./db/connect');
require('dotenv').config();

app.use(express.json())


app.get('/Hello' , (req,res) => {
    res.send('Task Manager App')
})
app.use('/api/v1/tasks', tasks);

const port = 4003

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      console.log('Connected to MongoDB');

     
      app.listen(port, () =>
          console.log(`Server is listening on port ${port}...`)
      );
  } catch (error) {
      console.error('Failed to connect to the database:', error);
  }
};
 

  start();
