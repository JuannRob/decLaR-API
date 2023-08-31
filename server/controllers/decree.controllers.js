const Decree = require("../models/Decree.js");

let queries = {};
let options = {
    limit: 10,
    page: 1,
    sort: { 'num': 1 }
};

const renderDecs = async (res) => {
    let decrees = await Decree.paginate(queries, options)
    res.status(200).json(decrees);
};

const formatDec = (dec) => {
    if (!dec) {
        console.log({ message: "🛑 No se recibieron datos para formatear" });
    }

    const toDate = (dateStr) => {
        const [day, month, year] = dateStr.split("/");
        return new Date(year, month - 1, day);
    };

    const date = toDate(dec.fecha);
    const pubDate = toDate(dec.fecha_pub);

    let loadDate = new Date();
    if (dec.fecha_carga !== "") {
        loadDate = toDate(dec.fecha_carga);
    }

    const pubPag = dec.pag_pub;
    let pubLink = "";
    if (!dec.link_pub) {
        pubLink = `http://www.boletinoflarioja.com.ar/pdf/${pubDate.getFullYear()}//${pubDate.getFullYear()}-${pubDate.toLocaleString(
            "default",
            { month: "2-digit" }
        )}-${pubDate.toLocaleString("default", {
            day: "2-digit",
        })}.pdf#page=${pubPag}`;
        // console.log('Se generó un link nuevo: ', pubLink);
    } else {
        pubLink = dec.link_pub;
        // console.log('Se usó el link cargado: ', pubLink);
    }

    const decree = new Decree({
        num: dec.num,
        anho: date.getFullYear().toString(),
        fecha: date.getTime().toString(),
        fecha_pub: pubDate.getTime().toString(),
        cant_arts: dec.cant_arts,
        firma: dec.firma,
        otros_firman: dec.otros_firman,
        pub: dec.pub,
        num_ed_pub: dec.num_ed_pub,
        pag_pub: dec.pag_pub,
        anho_tomo: dec.anho_tomo,
        nro_tomo: dec.nro_tomo,
        anexo: dec.anexo,
        ley_promul: dec.ley_promul,
        ley_vetada: dec.ley_vetada,
        parte_vetada: dec.parte_vetada,
        ratif_x_ley: dec.ratif_x_ley,
        dnu: dec.dnu,
        reglamenta_ley: dec.reglamenta_ley,
        tema: dec.tema,
        titulo: dec.titulo,
        estado: dec.estado,
        modif_por: dec.modif_por,
        modif_a: dec.modif_a,
        link_pub: pubLink,
        ref_norm: dec.ref_norm,
        obs: dec.obs,
        fecha_carga: loadDate.getTime().toString(),
        tipeo_dictado: dec.tipeo_dictado,
        deroga_dec: dec.deroga_dec,
        derogado_por: dec.derogado_por,
        pendiente: dec.pendiente,
        obs_tomo: dec.obs_tomo,
    });

    console.log("====================================");
    console.log("RESULTADO DE FORMATEO: ", dec);
    console.log("====================================");
    return decree;
};

const filterDecs = (limit = 10, page = 1, sortBy = 'num', order = 1) => {
    const parsedPage = parseInt(page)
    const parsedLimit = parseInt(limit)
    const parsedOrder = parseInt(order)

    options.page = parsedPage;
    options.sort = { [sortBy]: parsedOrder };

    if (parsedLimit !== options.limit) {
        options.limit = parsedLimit;
        options.page = 1;
    }
};

exports.getDecs = (req, res) => {
    const query = req.query;
    const { limit, page, sortBy, order } = req.query

    console.log('options 1: ', options);
    console.log('query: ', query);
    filterDecs(limit, page, sortBy, order)
    console.log('options 2: ', options);

    const deleteKeys = ['limit', 'page', 'sortBy', 'order'];
    deleteKeys.forEach(key => { if (query.hasOwnProperty(key)) delete query[key] });

    queries = {};
    if (Object.keys(query).length) {
        for (const entry in query) {
            // console.log(`${entry}: ${query[entry]}`);
            if (query[entry].charAt(0) === ":") {
                // "^" + query[entry].replace(":", "") + "$", "i"
                queries[entry] = new RegExp(
                    `^${query[entry].replace(":", "")}$`, "i"
                );
            } else {
                queries[entry] = new RegExp(query[entry], "i");
            }
        }
    }
    renderDecs(res);
};

exports.saveDec = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "No se recibieron datos." });
        return;
    }

    //format incoming Decree using formatDec()
    const formattedDecree = formatDec(req.body);
    try {
        const savedDec = await formattedDecree.save();
        console.log("====================================");
        console.log("data => ", savedDec);
        console.log("====================================");
        res.status(200).send(savedDec);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Algo salió mal durante la creación",
        });
    }
};

exports.findDecById = async (req, res) => {
    const decId = req.params.id;
    const decree = await Decree.findById(decId).exec();
    res.json(decree);
};
