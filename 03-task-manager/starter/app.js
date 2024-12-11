const express = require('express');
const app = express();


const connectDB = require('./db/connect');
require('dotenv').config();

require('./db/connect')

app.get('/api/tasks', (req, res) => {
    res.send('Tasks API');
  });

const port = process.env.PORT || 3000

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
  
  start();
