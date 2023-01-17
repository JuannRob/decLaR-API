const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
// IMPORTAR
const csv = require('csvtojson');

require('dotenv').config();

const app = express();
const connectDB = require('./server/database/connection');
const routes = require('./server/routes/router');

//log requests
app.use(morgan('tiny'));

//parse request to body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs")

//set public folder
app.use('/', express.static(__dirname + '/public'));

//mongodb connection
connectDB();

app.use(express.json());
app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server running: http://localhost:${PORT}/`) })