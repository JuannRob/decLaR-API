const express = require('express');
const router = express.Router();
const { buscarDecretos, crear, verDecreto } = require('../controller/decretosController');

// IMPORTAR
const csv = require('csvtojson');
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
const uploads = multer({ storage: storage })

//IMPORTAR
const { isAuth, cargarCSV } = require('../controller/importController');

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
router.post("/importar/csv", uploads.single('csvFile'), (req, res) => {
    csv()
        .fromFile(req.file.path)
        .then((response) => {
            for (var x = 0; x < response; x++) {
                empResponse = parseFloat(response[x].Name)
                response[x].Name = empResponse
                empResponse = parseFloat(response[x].Email)
                response[x].Email = empResponse
                empResponse = parseFloat(response[x].Designation)
                response[x].Designation = empResponse
                empResponse = parseFloat(response[x].Mobile)
                response[x].Mobile = empResponse
            }
            empSchema.insertMany(response, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    res.redirect('/')
                }
            })
        })
});

module.exports = router;