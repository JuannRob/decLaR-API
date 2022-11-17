const express = require('express');
const router = express.Router();
const { getAll, create, getByNumAndYear } = require('../controller/decretosController')

router.get("/decretos", getAll);

router.get("/decreto", getByNumAndYear);

router.post("/decretos", create);

module.exports = router;