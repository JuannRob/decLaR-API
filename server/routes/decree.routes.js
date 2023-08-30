const express = require('express');
const router = express.Router();
const { getDecs, saveDec, findDecById } = require('../controllers/decree.controllers');

router.get("/", (req, res) => {
    res.render('search')
});

router.get("/decretos", getDecs);

router.get("/decreto/:id", findDecById);

module.exports = router;