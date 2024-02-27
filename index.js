import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import connectDB from "./server/database/connection.js";
import routes from "./server/routes/decree.routes.js";
import "dotenv/config.js";

const app = express();

// CORS
app.use(cors());

//log requests
app.use(morgan("tiny"));

//body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mongodb connection
connectDB();

//router
app.use("/", express.static("public"));
app.use("/decretos", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running port: ${PORT}`);
});
