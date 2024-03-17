import express from "express";
const router = express.Router();
import {
  getDecs,
  saveDec,
  findDecById,
  deleteDecById,
} from "../controllers/index.js";
import { checkRole, checkToken } from "../services/user.service.js";

router.get("/", getDecs);

router.get("/:id", findDecById);

router.post("/", checkToken, checkRole(["admin", "editor"]), saveDec);

router.delete(
  "/:id",
  checkToken,
  checkRole(["admin", "editor"]),
  deleteDecById
);

export default router;
