import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./server/database/connection.js";
import decRoutes from "./server/routes/decree.routes.js";
import usrRoutes from "./server/routes/user.routes.js";
import "dotenv/config.js";

const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//log requests
app.use(morgan("tiny"));

//body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//mongodb connection
connectDB();

//router
app.use("/", express.static("public"));
app.use("/decrees", decRoutes);
app.use("/user", usrRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running port: ${PORT}`);
});
