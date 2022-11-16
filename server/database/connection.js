const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true
        });

        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;