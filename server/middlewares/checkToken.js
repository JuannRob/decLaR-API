import jsonwebtoken from "jsonwebtoken";
import "dotenv/config.js";

export const checkToken = (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return res.status(401).json({ message: "Missing access token" });
  }

  let parsedToken = accessToken;
  if (accessToken.startsWith("Bearer")) {
    parsedToken = accessToken.split(" ")[1];
  }

  try {
    const decode = jsonwebtoken.verify(parsedToken, process.env.JWT_SECRET);
    req.userId = decode.id;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Access token expired" });
    } else {
      return res
        .status(401)
        .json({ message: "Error checking access token: " + err.message });
    }
  }
};
