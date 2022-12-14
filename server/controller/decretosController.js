const Decreto = require('../models/Decreto.js');

//obtener decretos
//filtra decretos si hay queries si no, muestra todos
exports.buscarDecretos = async (req, res) => {
    const req_query = req.query;
    let decretos = {};
    let queries = {};
    let title = '';

    if (Object.keys(req.query).length === 0) {
        decretos = await Decreto.find();
        title = 'todos los decretos'
    } else {
        for (const entry in req_query) {
            if (req_query[entry]) {
                console.log(`${entry}: ${req_query[entry]}`);
                queries[entry] = new RegExp(req_query[entry], 'i');
            }
        }
        console.log('====================================');
        console.log('queries:', queries);
        console.log('====================================');

        decretos = await Decreto.find(queries).exec();
    }
    console.log('====================================');
    console.log('decretos:', decretos);
    console.log('====================================');
    res.render('results', { data: decretos })
}

//crea y guarda un decreto nuevo
exports.crear = async (req, res) => {

    if (!req.body) {
        res.status(400).send({ message: "Los datos no deben estar vacíos" });
        return;
    }

    const date = new Date(req.body.fecha);
    const pubDate = new Date(req.body.fecha_pub);

    let loadDate = req.body.fecha_carga;
    if (!loadDate || loadDate === "null") {
        console.log(`No hay fecha: ${loadDate}, chango`);
        loadDate = Date.now;
    }

    const pubPag = req.body.pag_pub;
    let pubLink = '';
    if (!req.body.link_pub) {
        pubLink = `http://www.boletinoflarioja.com.ar/pdf/${pubDate.getFullYear()}//${pubDate.getFullYear()}-${pubDate.toLocaleString("default", { month: "2-digit" })}-${pubDate.toLocaleString("default", { day: "2-digit" })}.pdf#page=${pubPag}`
        console.log('Se generó un link nuevo: ', pubLink);
    } else {
        pubLink = req.body.link_pub;
        console.log('Se usó el link cargado: ', pubLink);
    };

    const decreto = new Decreto({
        num: req.body.num,
        anho: date.getFullYear().toString(),
        fecha: date.getTime().toString(),
        fecha_pub: pubDate.getTime().toString(),
        cant_arts: req.body.cant_arts,
        firman: req.body.firman,
        pub: req.body.pub,
        num_ed_pub: req.body.num_ed_pub,
        pag_pub: req.body.pag_pub,
        anho_tomo: req.body.anho_tomo,
        nro_tomo: req.body.nro_tomo,
        anexo: req.body.anexo,
        ley_promul: req.body.ley_promul,
        ley_vetada: req.body.ley_vetada,
        parte_vetada: req.body.parte_vetada,
        ratif_x_ley: req.body.ratif_x_ley,
        dnu: req.body.dnu,
        reglamenta_ley: req.body.reglamenta_ley,
        tema: req.body.tema,
        titulo: req.body.titulo,
        estado: req.body.estado,
        modif_por: req.body.modif_por,
        modif_a: req.body.modif_a,
        link_pub: pubLink,
        ref_norm: req.body.ref_norm,
        obs: req.body.obs,
        fecha_carga: loadDate,
        tipeo_dictado: req.body.tipeo_dictado,
        deroga_dec: req.body.deroga_dec,
        derogado_por: req.body.derogado_por
    })
    await decreto
        .save(decreto)
        .then(data => {
            console.log('====================================');
            console.log('data => ', data);
            console.log('====================================');
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Algo salió mal durante la creación"
            });
        });
}

exports.verDecreto = async (req, res) => {
    const decretoId = req.params.id;
    const dcrto = await Decreto.findById(decretoId).exec();
    res.render('decreto', { data: dcrto })
}