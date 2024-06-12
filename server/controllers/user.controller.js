import Joi from "joi";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import "dotenv/config.js";
import { CreateTokens } from "../services/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(50).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(20).required(),
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

export const login = asyncHandler(async (req, res) => {
  const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(20).required(),
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

  const tokens = CreateTokens(user._id);
  res
    .cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      sameSite: "strict",
    })
    .header("authorization", tokens.accessToken)
    .status(200)
    .json({ message: "Successfully logged in", user: user });
});

export const logout = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
  });
  res.status(200).json({ message: "You are logged out!" });
};

export const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) {
    return res.status(400).send("No refresh token provided.");
  }

  const decoded = jsonwebtoken.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET
  );
  const accessToken = CreateTokens(decoded.id).accessToken;
  res
    .header("authorization", accessToken)
    .status(200)
    .json({ message: "Token refreshed" });
});

export const getUser = asyncHandler(async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(400).json({ error: "User not found" });
    res.status(200).json({ message: "User found", user: user });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "Error getting user" });
  }
});
