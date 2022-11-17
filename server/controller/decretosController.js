const Decreto = require('../models/Decreto.js');

//obtener todos los decretos
exports.getAll = async (req, res) => {

    let decretos = {};

    if (req.query.numero && req.query.anho) {
        decretos = await Decreto.findOne({ numero: req.query.numero, anho: req.query.anho }).exec();
        console.log('====================================');
        console.log('decretos solo:', decretos);
        console.log('====================================');
    } else {
        decretos = await Decreto.find();
        console.log('====================================');
        console.log('decretos:', decretos);
        console.log('====================================');
    }
    res.status(200).render('index', { title: 'decretos', data: decretos })
}

//obtener un decreto utilizando número y año
exports.getByNumAndYear = async (req, res) => {
    const decretos = await Decreto.findOne({ numero: req.query.numero, anho: req.query.anho }).exec();

    res.status(200).render('index', { title: `Decreto número: ${req.query.numero}`, data: decretos })
}

//crea y guarda un decreto nuevo
exports.create = async (req, res) => {

    if (!req.body) {
        res.status(400).send({ message: "Los datos no deben estar vacíos" });
        return;
    }

    const decreto = new Decreto({
        numero: req.body.numero,
        anho: req.body.anho,
        fecha: req.body.fecha,
        fecha_pub: req.body.fecha_pub,
        cant_art: req.body.cant_art,
        firmantes: req.body.firmantes,
        publicacion: req.body.publicacion,
        num_publi: req.body.num_publi,
        pag_publi: req.body.pag_publi,
        tomo_biblioteca: req.body.tomo_biblioteca,
        anexo: req.body.anexo,
        ley_promulgada: req.body.ley_promulgada,
        ley_vetada: req.body.ley_vetada,
        parte_vetada: req.body.parte_vetada,
        ratif_ley: req.body.ratif_ley,
        ratif_pendiente: req.body.ratif_pendiente,
        ley_reglamentada: req.body.ley_reglamentada,
        tema: req.body.tema,
        titulo: req.body.titulo,
        estado: req.body.estado,
        modificado_por: req.body.modificado_por,
        modifica_a: req.body.modifica_a,
        link_publi: req.body.link_publi,
        ref_normativas: req.body.ref_normativas,
        observaciones: req.body.observaciones,
        fecha_carga: req.body.fecha_carga,
        tipeo_dictado: req.body.tipeo_y_dictado,
        deroga_dec: req.body.deroga_dec,
        derogado_por: req.body.derogado_por
    })
    await decreto
        .save(decreto)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Algo salió mal durante la creación"
            });
        });

}