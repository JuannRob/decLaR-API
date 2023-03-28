const express = require('express');
const router = express.Router();
const { buscarDecretos, crearDecreto, verDecreto, filtrarDecretos } = require('../controller/decretosController');

router.get("/", (req, res) => {
    res.render('search')
});

router.get("/decretos", buscarDecretos);

router.post("/decretos", filtrarDecretos);

router.get("/decreto/:id", verDecreto);

module.exports = router;