const express = require("express");
const mongoose = require('mongoose');
const connectDB = require('./server/database/connection');
const api = require('./server/routes/router');
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 5000;

//mongodb connection
connectDB();

app.get('/', (req, res) => {
    res.status(200).send('<h1>DECRETOS API</h1>');
});
app.use(express.json())
app.use('/api', api);
app.listen(PORT, () => { console.log(`Server running: http://localhost:${PORT}/`)})