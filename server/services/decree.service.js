import Decree from "../models/Decree.js";
import { toRegex, toString } from "diacritic-regex"; //turns string into diacritic insensitive regex

let queries = {};
let options = {
  limit: 10,
  page: 1,
  sort: { tema: -1 },
};

export const getDecs = async ({
  limit = 10,
  page = 1,
  sortBy = "tema",
  order = -1,
  ...filters
}) => {
  //*---Options handler---*
  options.page = parseInt(page);
  options.sort = { [sortBy]: parseInt(order) };
  if (limit != options.limit) {
    options.limit = parseInt(limit);
    options.page = 1;
  }
  //*---------------------*

  //*---MongoDB query regex generator---*
  queries = {};
  if (Object.keys(filters).length) {
    for (const entry in filters) {
      if (filters[entry].charAt(0) === ":") {
        //":" at the beginning of the query means exact match
        queries[entry] = new RegExp(
          `^${toString()(filters[entry]).replace(":", "")}$`
        );
      } else {
        queries[entry] = toRegex({ flags: "i" })(filters[entry]);
      }
    }
  }
  //*-----------------------------------*
  //*---Query executor---*
  try {
    let decrees = await Decree.paginate(queries, options);
    return decrees;
  } catch (error) {
    return error;
  }
  //*--------------------*
};

export const formatDecree = (dec) => {
  if (!dec) {
    throw new Error("🛑 No se recibieron datos para formatear");
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
  } else {
    pubLink = dec.link_pub;
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
  return decree;
};
