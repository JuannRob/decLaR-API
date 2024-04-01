import jwt from "jsonwebtoken";
import "dotenv/config.js";

export const CreateToken = (id) => {
  const accessToken = jsonwebtoken.sign({ user }, secretKey, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ user }, secretKey, {
    expiresIn: "1d",
  });
  return;
};
