const express = require('express');
const router = express.Router();
const { buscarDecretos, crear, verDecreto } = require('../controller/decretosController');

router.get("/", (req, res) => {
    res.render('search')
});

router.get("/decretos/:pag", buscarDecretos);

router.post("/decretos/:pag", buscarDecretos);

router.get("/decreto/:id", verDecreto);

module.exports = router;