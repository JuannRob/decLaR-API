import express from "express";
const router = express.Router();
import {
  getUser,
  login,
  logout,
  register,
  refreshToken,
} from "../controllers/index.js";
import { checkToken } from "../middlewares/index.js";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh", refreshToken);
router.get("/get", checkToken, getUser);

export default router;
