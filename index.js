const express = require("express");
const connectDB = require('./server/database/connection');
const api = require('./server/routes/router');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();


const PORT = process.env.PORT || 5000;

//mongodb connection
connectDB();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.use(express.json());
app.use('/api', api);

app.listen(PORT, () => { console.log(`Server running: http://localhost:${PORT}/`) })