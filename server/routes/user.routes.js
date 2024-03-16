import express from "express";
import {
  register,
  login,
  getAllUsers,
} from "../controllers/user.controller.js";
import { checkRole, checkToken } from "../services/user.service.js";
const router = express.Router();

router.get("/register", register);
router.get("/login", login);
router.get("/", checkToken, checkRole(["admin", "editor"]), getAllUsers);

export default router;