const mongoose = require('mongoose');

const decretoSchema = new mongoose.Schema({
    num: String,
    anho: String,
    fecha: Date,
    fecha_pub: Date,
    cant_arts: String,
    firman: [String],
    pub: String,
    num_ed_pub: String,
    pag_pub: String,
    anho_tomo: String,
    nro_tomo: String,
    anexo: String,
    ley_promul: String,
    ley_vetada: String,
    parte_vetada: String,
    ratif_x_ley: String,
    dnu: String,
    reglamenta_ley: String,
    tema: String,
    titulo: String,
    estado: String,
    modif_por: String,
    modif_a: String,
    link_pub: String,
    ref_norm: String,
    obs: String,
    fecha_carga: { type: Date, default: Date.now },
    tipeo_dictado: String,
    deroga_dec: String,
    derogado_por: String
}, { collection: '2014' });

module.exports = mongoose.model('Decreto', decretoSchema);