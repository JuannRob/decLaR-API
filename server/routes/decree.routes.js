import express from 'express';
const router = express.Router();
import { getDecs, saveDec, findDecById } from '../controllers/index.js';

router.get("/decretos", getDecs);

router.get("/decreto/:id", findDecById);

router.post("/decretos", saveDec)

export default router;