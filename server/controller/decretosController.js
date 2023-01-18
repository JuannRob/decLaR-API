const Decreto = require('../models/Decreto.js');

exports.formatDecreto = (dec) => {
    if (!dec) {
        console.log({ message: "🛑 No se recibieron datos para formatear" });
    }

    const toDate = (dateStr) => {
        const [day, month, year] = dateStr.split("/")
        return new Date(year, month - 1, day)
    }

    const date = toDate(dec.fecha);
    const pubDate = toDate(dec.fecha_pub);

    let loadDate = new Date();
    if (dec.fecha_carga !== '') {
        loadDate = toDate(dec.fecha_carga);
    }

    const pubPag = dec.pag_pub;
    let pubLink = '';
    if (!dec.link_pub) {
        pubLink = `http://www.boletinoflarioja.com.ar/pdf/${pubDate.getFullYear()}//${pubDate.getFullYear()}-${pubDate.toLocaleString("default", { month: "2-digit" })}-${pubDate.toLocaleString("default", { day: "2-digit" })}.pdf#page=${pubPag}`
        console.log('Se generó un link nuevo: ', pubLink);
    } else {
        pubLink = dec.link_pub;
        console.log('Se usó el link cargado: ', pubLink);
    };

    const decreto = new Decreto({
        num: dec.num,
        anho: date.getFullYear().toString(),
        fecha: date.getTime().toString(),
        fecha_pub: pubDate.getTime().toString(),
        cant_arts: dec.cant_arts,
        firma: dec.firma,
        otros_firman: dec.otros_firman,
        pub: dec.body.pub,
        num_ed_pub: dec.body.num_ed_pub,
        pag_pub: dec.body.pag_pub,
        anho_tomo: dec.body.anho_tomo,
        nro_tomo: dec.body.nro_tomo,
        anexo: dec.body.anexo,
        ley_promul: dec.body.ley_promul,
        ley_vetada: dec.body.ley_vetada,
        parte_vetada: dec.body.parte_vetada,
        ratif_x_ley: dec.body.ratif_x_ley,
        dnu: dec.body.dnu,
        reglamenta_ley: dec.body.reglamenta_ley,
        tema: dec.body.tema,
        titulo: dec.body.titulo,
        estado: dec.body.estado,
        modif_por: dec.body.modif_por,
        modif_a: dec.body.modif_a,
        link_pub: pubLink,
        ref_norm: dec.body.ref_norm,
        obs: dec.body.obs,
        fecha_carga: loadDate.getTime().toString(),
        tipeo_dictado: dec.body.tipeo_dictado,
        deroga_dec: dec.body.deroga_dec,
        derogado_por: dec.body.derogado_por,
        pendiente: dec.body.pendiente,
        obs_tomo: dec.body.obs_tomo,
    })

    console.log('====================================');
    console.log('RESULTADO DE FORMATEO: ', dec);
    console.log('====================================');
    return
}

//obtener decretos
//filtra decretos si hay queries si no, muestra todos
exports.buscarDecretos = async (req, res) => {
    let decretos = {};
    let queries = {};
    let title = '';

    if (Object.keys(req.query).length === 0) {
        decretos = await Decreto.find();
        title = 'todos los decretos'
    } else {
        for (const entry in req.query) {
            if (req.query[entry]) {
                console.log(`${entry}: ${req.query[entry]}`);
                queries[entry] = new RegExp(req.query[entry], 'i');
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
        res.status(400).send({ message: "No se recibieron datos" });
        return;
    }

    //formatea el decreto recibido en el body utilizando la función anterior formatDecreto()
    const decretoFormateado = this.formatDecreto(req.body)

    await decretoFormateado
        .save(decretoFormateado)
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