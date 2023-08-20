const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const serveStatic = require('serve-static');
const cors = require("cors");
const connectDB = require('./server/database/connection');
const routes = require('./server/routes/router');
require('dotenv').config();

const app = express();

// CORS
app.use(cors());

//log requests
app.use(morgan('tiny'));

//parse request to body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");

//set public folder
app.use('/', serveStatic(__dirname + '/public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

//mongodb connection
connectDB();

app.use(bodyParser.json());
app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server running: http://localhost:${PORT}/`) });