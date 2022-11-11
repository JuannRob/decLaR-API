const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Decreto = require('../models/Decreto.js');

router.get('/', async (req, res, next) => {
    const decretos = await Decreto.find();
    res.send(decretos);
});

router.post("/", async (req, res) => {
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
        tipeo_y_dictado: req.body.tipeo_y_dictado,
        deroga_dec: req.body.deroga_dec,
        derogado_por: req.body.derogado_por
    })
    await decreto.save()
    res.send(decreto)
})

module.exports = router;