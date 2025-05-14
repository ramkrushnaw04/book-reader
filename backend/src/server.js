require("dotenv").config();

const express = require('express');
const cors = require('cors')

const app = express();
const PORT = 3000;

const query = require('./routes/query.js');


app.use(express.json());
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
app.use(cors({
  origin: allowedOrigins, 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));


app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.post('/query', query)


app.listen(PORT, () => {
  console.log(`Server running...`);
});