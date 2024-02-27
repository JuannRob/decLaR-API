import express from "express";
const router = express.Router();
import { getDecs, saveDec, findDecById } from "../controllers/index.js";

router.get("/", getDecs);

router.get("/:id", findDecById);

router.post("/", saveDec);

export default router;
