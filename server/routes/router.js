const express = require('express');
const router = express.Router();
const { buscarDecretos, crear, verDecreto, crearVarios } = require('../controller/decretosController');
//Acceso con contraseña
const { isAuth } = require('../services/authService');

//CARGAR CSV
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
const uploads = multer({ storage: storage })


router.get("/", (req, res) => {
    res.render('search')
});

router.get("/decretos", buscarDecretos);

router.post("/decretos", crear);

router.get("/decretos/:id", verDecreto);

//RENDER PAGINA PARA IMPORTAR
router.get("/importar", isAuth, (req, res) => {
    res.render('import', { data: '' })
});

//CARGAR CSV
router.post("/importar/csv", uploads.single('csvFile'), crearVarios);

module.exports = router;