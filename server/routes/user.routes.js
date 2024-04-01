import express from "express";
const router = express.Router();
import {
  getAllUsers,
  login,
  logout,
  register,
  // refreshToken,
} from "../controllers/index.js";
import { checkRole, checkToken } from "../services/index.js";

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", checkToken, checkRole(["admin", "editor"]), getAllUsers);
// app.post("/refresh", refreshToken);

export default router;
