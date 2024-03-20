import Joi from "joi";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { CreateToken } from "../services/index.js";
import "dotenv/config.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    role: Joi.string().valid("viewer", "editor", "admin"),
  });

  const { error } = schemaRegister.validate(req.body);

  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }

  const isEmailExist = await User.findOne({ email: req.body.email });
  if (isEmailExist) {
    return res
      .status(409)
      .json({ error: "A user is already signup with this email" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
    role: role,
  });

  user
    .save()
    .then((savedUser) => res.status(201).json({ data: savedUser }))
    .catch((err) => {
      res.status(400).send({
        message: err,
      });
    });
};

export const login = async (req, res) => {
  const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  const { error } = schemaLogin.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const token = CreateToken(user._id);
  //Create and setting a cookie with the user's ID and token
  res.cookie(String(user._id), token, {
    // httpOnly: true,
    // path = where the cookie is valid
    path: "/",
    // domain = what domain the cookie is valid on
    domain: "localhost",
    // secure = only send cookie over https
    secure: false,
    // sameSite = only send cookie if the request is coming from the same origin
    sameSite: "lax", // "strict" | "lax" | "none" (secure must be true)
    // maxAge = how long the cookie is valid for in milliseconds
    maxAge: 3600000,
  });

  //send this message along with logged user details
  return res
    .status(200)
    .json({ message: "Successfully logged in", User: user });
};

export const logout = (req, res) => {
  const cookies = req.headers.cookie; //request cookie from the header

  //extracting token from the cookies
  const previousToken = cookies.split("=")[1];
  if (!previousToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }

  //varifying token using secret key from the environmental variables
  jsonwebtoken.verify(
    String(previousToken),
    process.env.JWT_SECRET,
    (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Authentication failed" });
      }
      res.clearCookie(`${user.id}`);
      req.cookies[`${user.id}`] = "";
      return res.status(200).json({ message: "Successfully Logged Out" });
    }
  );
};

export const getAllUsers = async (req, res) => {
  try {
    const allusers = await User.find();
    if (!allusers) {
      return res.status(404).json({ message: "There are not any users" });
    } else {
      res.status(200).json({ allusers });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error in getting the Users" });
  }
};
