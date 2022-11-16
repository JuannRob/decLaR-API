const express = require('express');
const router = express.Router();
const { getAll, create } = require('../controller/decretosController')

router.get("/", getAll);

router.post("/decretos", create);


module.exports = router;