import jsonwebtoken from "jsonwebtoken";
import "dotenv/config.js";

export const CreateTokens = (id) => {
  const accessToken = jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "20s",
  });
  const refreshToken = jsonwebtoken.sign({ id }, process.env.REFRESH_SECRET, {
    expiresIn: "1d",
  });
  return { accessToken: accessToken, refreshToken: refreshToken };
};
