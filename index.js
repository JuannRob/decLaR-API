const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()

const db_pass = process.env.DB_PASS;
const mongoDB = "mongodb+srv://admin:" + db_pass + "@decretosdb.wgq2r.mongodb.net/?retryWrites=true&w=majority";

mongoose
    .connect(mongoDB, { useNewUrlParser: true })
    .then(() => {
        const app = express();

        app.listen(5000, () => {
            console.log("Servidor levantado.")
        })
    })