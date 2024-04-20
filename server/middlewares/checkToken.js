import jsonwebtoken from "jsonwebtoken";
import "dotenv/config.js";

export const checkToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res.status(403).json({ message: "Invalid access token" });
    }

    let parsedToken = accessToken;
    if (accessToken.startsWith("Bearer ")) {
      parsedToken = accessToken.split(" ")[1];
    }

    const decode = jsonwebtoken.verify(parsedToken, process.env.JWT_SECRET);
    req.userId = decode.id;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Access token expired" });
    } else {
      return res
        .status(401)
        .json({ message: "Error checking access token: " + err.message });
    }
  }
};
