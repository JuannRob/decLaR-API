import jsonwebtoken from "jsonwebtoken";
import "dotenv/config.js";

export const checkToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res.status(403).json({ message: "Invalid access token" });
    }

    const decode = jsonwebtoken.verify(accessToken, process.env.JWT_SECRET);
    req.userId = decode.id;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Error in the token checking", err });
  }
};
