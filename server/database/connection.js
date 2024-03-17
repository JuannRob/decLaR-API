import mongoose from "mongoose";
import "dotenv/config.js";

export default async function () {
  try {
    const con = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
