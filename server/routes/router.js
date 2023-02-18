const express = require('express');
const router = express.Router();
const { buscarDecretos, crear, verDecreto, crearVarios } = require('../controller/decretosController');

router.get("/", (req, res) => {
    res.render('search')
});

router.get("/decretos", buscarDecretos);

router.post("/decretos", crear);

router.get("/decretos/:id", verDecreto);

module.exports = router;