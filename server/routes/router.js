const express = require('express');
const router = express.Router();
const { obtener, crear } = require('../controller/decretosController')

router.get("/", (req, res) => {
    res.render('search')
});

router.get("/decretos", obtener);

router.post("/decretos", crear);

module.exports = router;