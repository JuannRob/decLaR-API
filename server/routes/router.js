const express = require('express');
const router = express.Router();
const { getAll, create, getData2 } = require('../controller/decretosController')

router.get("/", getAll);

router.post("/decretos", create);

router.get("/data2", getData2);

module.exports = router;