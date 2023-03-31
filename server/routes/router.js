const express = require('express');
const router = express.Router();
const { getDecs, saveDec, findDecById, filterDecs } = require('../controller/decretosController');

router.get("/", (req, res) => {
    res.render('search')
});

router.get("/decretos", getDecs);

router.post("/decretos", filterDecs);

router.get("/decreto/:id", findDecById);

module.exports = router;