import jsonwebtoken from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config.js";

export const CreateToken = (id) => {
  console.log("secret: ", process.env.JWT_SECRET);
  return jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "60s",
  });
};

export const checkToken = async (req, res, next) => {
  try {
    const cookies = req.headers.cookie;
    console.log("cookies: ", cookies);

    if (!cookies) {
      return res.status(403).json({ message: "Login first" });
    }
    const token = cookies.split("=")[1];

    if (!token) {
      return res.status(403).json({ message: "A token is required" });
    } else {
      const decode = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      req.userId = decode.id;
      next();
    }
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Error in the token checking", err });
  }
};

export const checkRole = (requiredRoles) => async (req, res, next) => {
  try {
    const convertedRoles = requiredRoles.map((role) => role.toLowerCase());
    const userId = req.userId;
    const user = await User.findById(userId);

    const userRole = user.role;
    if (!convertedRoles.includes(userRole.toLowerCase())) {
      return res.status(403).json({ message: "You are unauthorized" });
    }
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Authorization error occurred", err });
  }
};
