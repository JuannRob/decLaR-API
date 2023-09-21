import express from 'express';
const router = express.Router();
import { getDecs, saveDec, findDecById } from '../controllers/index.js';

router.get("/", (req, res) => {
    res.render('search')
});

router.get("/decretos", getDecs);

router.get("/decreto/:id", findDecById);

export default router;