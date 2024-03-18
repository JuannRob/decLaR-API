import express from "express";
const router = express.Router();
import { getAllUsers, login, logout, register } from "../controllers/index.js";
import { checkRole, checkToken } from "../services/index.js";

router.get("/register", register);
router.get("/login", login);
router.get("/logout", logout);
router.get("/", checkToken, checkRole(["admin", "editor"]), getAllUsers);

export default router;
