const express = require('express');
const router = express.Router();
const multer = require("multer")
const upload = multer({ dest: '../../' })
const { buscarDecretos, crear, verDecreto, importarDecretos } = require('../controller/decretosController');

//IMPORTAR
const { isAuth, cargarCSV } = require('../controller/importController');

router.get("/", (req, res) => {
    res.render('search')
});

router.get("/decretos", buscarDecretos);

router.post("/decretos", crear);

router.get("/decretos/:id", verDecreto);

//IMPORTAR
router.get("/importar", isAuth, importarDecretos);
// router.post("/cargar", upload.single('csvFile'), cargarCSV);

module.exports = router;