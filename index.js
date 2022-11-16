const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const connectDB = require('./server/database/connection');
const routes = require('./server/routes/router');

const app = express();
const PORT = process.env.PORT || 5000;

//log requests
app.use(morgan('tiny'));

//parse request to body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs")

//set assets path
app.use('/css', express.static(path.resolve(`${__dirname}/assets/css`)));
app.use('/js', express.static(path.resolve(`${__dirname}/assets/js`)));

//mongodb connection
connectDB();

app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => { console.log(`Server running: http://localhost:${PORT}/`) })