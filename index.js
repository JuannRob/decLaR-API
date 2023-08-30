const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./server/database/connection");
const routes = require("./server/routes/decree.routes");
require("dotenv").config();

const app = express();

// CORS
app.use(cors());

//log requests
app.use(morgan('tiny'));

//body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mongodb connection
connectDB();

//router
app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}/`)
});