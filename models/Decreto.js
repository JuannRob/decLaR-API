const mongoose = require(mongoose);
const { Schema } = mongoose;

const decretoSchema = new Schema({
    numero: String,
    anho: String,
    fecha: {
        $date: 2013 - 10 - 13T03: 00: 00Z
    },
    fecha_pub: {
        $date: 2014 - 01 - 24T03: 00: 00Z
    },
    cant_art: String,
    firmantes: [
        Herrera,
        Guerra,
        Agost
    ],
    publicacion: BO,
    num_publi: 11143,
    pag_publi: 3,
    tomo_biblioteca: 1,
    anexo:   ,
    ley_promulgada: 9450,
    ley_vetada:   ,
    parte_vetada:   ,
    ratif_ley:   ,
    ratif_pendiente:   ,
    ley_reglamentada:   ,
    tema:   ,
    titulo:   ,
    estado:   ,
    modificado_por:   ,
    modifica_a:   ,
    link_publi:   ,
    ref_normativas:   ,
    observaciones:   ,
    fecha_carga: {
        $date: 2022 - 10 - 05T03: 00: 00Z
    },
    tipeo/ dictado : Marcelo(Sebastian),
    deroga_dec :   ,
    derogado_por :   
})