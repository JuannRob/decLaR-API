const express = require('express');
const router = express.Router();
const { find, create } = require('../controller/controller')


router.get("/decretos", find);

router.post("/decretos", create);

module.exports = router;