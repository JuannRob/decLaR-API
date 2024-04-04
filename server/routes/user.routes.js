import express from "express";
const router = express.Router();
import {
  getAllUsers,
  login,
  logout,
  register,
  refreshToken,
} from "../controllers/index.js";
import { checkRole, checkToken } from "../middlewares/index.js";

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", checkToken, checkRole(["admin", "editor"]), getAllUsers);
router.get("/refresh", refreshToken);

export default router;
