const mongoose = require('mongoose');

const decretoSchema = new mongoose.Schema({
    numero: String,
    anho: String,
    fecha: Date,
    fecha_pub: Date,
    cant_art: String,
    firmantes: [String],
    publicacion: String,
    num_publi: String,
    pag_publi: String,
    tomo_biblioteca: String,
    anexo: String,
    ley_promulgada: String,
    ley_vetada: String,
    parte_vetada: String,
    ratif_ley: String,
    ratif_pendiente: String,
    ley_reglamentada: String,
    tema: String,
    titulo: String,
    estado: String,
    modificado_por: String,
    modifica_a: String,
    link_publi: String,
    ref_normativas: String,
    observaciones: String,
    fecha_carga: { type: Date, default: Date.now },
    tipeo_y_dictado: String,
    deroga_dec: String,
    derogado_por: String
});

module.exports = mongoose.model('Decreto', decretoSchema, 'decretos');
