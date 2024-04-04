import express from "express";
const router = express.Router();
import {
  getDecs,
  saveDec,
  findDec,
  deleteDec,
  updateDec,
} from "../controllers/index.js";
import { checkRole, checkToken } from "../middlewares/index.js";

router.get("/", getDecs);

router.get("/:id", findDec);

router.post("/", checkToken, checkRole(["admin", "editor"]), saveDec);

router.delete("/:id", checkToken, checkRole(["admin", "editor"]), deleteDec);

router.patch("/:id", checkToken, checkRole(["admin", "editor"]), updateDec);

export default router;
