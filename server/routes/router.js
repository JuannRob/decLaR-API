const express = require('express');
const router = express.Router();
const { obtener, crear } = require('../controller/decretosController')

router.get("/", obtener);

router.post("/decretos", crear);

module.exports = router;