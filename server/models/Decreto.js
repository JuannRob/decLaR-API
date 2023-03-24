const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const decretoSchema = new mongoose.Schema({
    num: {
        type: String,
        required: [true, 'El número del decreto es obligatorio'],
        match: /^\d+$/
    },
    anho: {
        type: String,
        required: [true, 'El año del decreto es obligatorio'],
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatoria'],
        min: '1809-01-01',
        max: '2026-11-13'
    },
    fecha_pub: {
        type: Date,
        required: [true, 'La fecha de publicación es obligatoria'],
        min: '1809-01-01',
        max: '2026-11-13',
    },
    cant_arts: {
        type: String,
        required: [true, 'Especificar la cantidad de articulos es obligatoria'],
        match: /^\d+$/
    },
    firma: {
        type: String,
        required: [true, 'Especificar quien firma es obligatorio'],
    },
    otros_firman: {
        type: [String],
        required: [true, 'Especificar quien firmantes es obligatorio'],
    },
    pub: {
        type: String,
        required: [true, 'Especificar en dónde se publica es obligatorio'],
    },
    num_ed_pub: {
        type: String,
        required: [true, 'Especificar num ed pub es obligatorio'],
    },
    pag_pub: {
        type: String,
        required: [true, 'Especificar la página donde se publica es obligatorio'],
        match: /^\d+$/
    },
    anho_tomo: {
        type: String,
        minLength: 4,
        maxLength: 4,
        required: [true, 'Especificar el año del tomo es obligatorio'],
        match: /^\d+$/
    },
    nro_tomo: {
        type: String,
        maxLength: 2,
        required: [true, 'Especificar el número del tomo es obligatorio'],
        match: /^\d+$/
    },
    anexo: String,
    ley_promul: {
        type: String,
        match: /^\d+$/
    },
    ley_vetada: {
        type: String,
        match: /^\d+$/
    },
    parte_vetada: {
        type: String,
    },
    ratif_x_ley: {
        type: String,
        match: /^\d+$/
    },
    dnu: String,
    reglamenta_ley: {
        type: String,
        match: /^\d+$/
    },
    tema: String,
    titulo: String,
    estado: String,
    modif_por: String,
    modif_a: String,
    link_pub: String,
    ref_norm: String,
    obs: String,
    fecha_carga: {
        type: Date,
        required: [true, 'Fecha de carga es obligatoria'],
        min: '1809-01-01',
        max: '2026-11-13',
    },
    tipeo_dictado: String,
    deroga_dec: String,
    derogado_por: String,
    pendiente: String,
    obs_tomo: String
}, { collection: 'decs_csv_v1.1' });

decretoSchema.plugin(mongoosePaginate);

decretoSchema.pre('validate', function (next) {
    if (this.parte_vetada && !this.ley_vetada) {
        next(new Error(`No se puede especificar la parte vetada sin una ley vetada. Ley N° ${this.num}/${this.anho}`));
    } else {
        next();
    }
});



module.exports = mongoose.model('Decreto', decretoSchema);