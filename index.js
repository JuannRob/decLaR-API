const express = require("express");
const mongoose = require('mongoose');
const decretos = require('./routes/decretos');
require('dotenv').config()

const db_pass = process.env.DB_PASS;
const mongoDB = "mongodb+srv://admin:" + db_pass + "@decretosdb.wgq2r.mongodb.net/decretos?retryWrites=true&w=majority";

mongoose
    .connect(mongoDB, { useNewUrlParser: true })
    .then(() => {
        const app = express();
        app.use(express.json())
        app.use('/decretos', decretos);

        app.listen(5000, () => {
            console.log("Servidor levantado.")
        })
    })
    .catch((err) => console.error(err));