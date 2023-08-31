const request = require("supertest")
const baseURL = "http://localhost:5000"

//Utilities
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
const getRandomCategory = () => {
    categories = [
        "num",
        "anho",
        "fecha",
        "fecha_pub",
        "cant_arts",
        "firma",
        "otros_firman",
        "pub",
        "num_ed_pub",
        "pag_pub",
        "anho_tomo",
        "nro_tomo",
        "anexo",
        "ley_promul",
        "ley_vetada",
        "parte_vetada",
        "ratif_x_ley",
        "dnu",
        "art_126_12",
        "reglamenta_ley",
        "tema",
        "titulo",
        "estado",
        "modif_por",
        "modif_a",
        "modif_por_ley",
        "modif_a_ley",
        "link_pub",
        "ref_norm",
        "obs",
        "fecha_carga",
        "tipeo_dictado",
        "deroga_dec",
        "derogado_por",
        "pendiente",
        "obs_tomo",
        "claves"
    ]
    return categories[getRandomInt(0, (categories.length - 1))]
}
const checkOrdering = (arr, order) => {
    for (let i = 1; i < arr.length; i++) {
        expect(arr[i - 1][sortBy || num].toLowerCase() <= response.body.docs[i][sortBy || num].toLowerCase()).toBe(true);
    }
}

async function sendRequest(query) {
    const { limit, page, sortBy, order } = query
    const response = await request(baseURL).get("/decretos").query(query)
    expect(response.statusCode).toBe(200);
    expect(response.body.docs.length).toBeGreaterThan(0);
    expect(response.body.docs).toHaveLength(limit || 10);
    expect(response.body.page).toBe(page || 1);



    if (order === 1) {
        for (let i = 1; i < response.body.docs.length; i++) {
            expect(response.body.docs[i - 1][sortBy || num].toLowerCase() <= response.body.docs[i][sortBy || num].toLowerCase()).toBe(true);
        }
    } else {
        for (let i = 1; i < response.body.docs.length; i++) {
            expect(response.body.docs[i - 1][sortBy || num].toLowerCase() >= response.body.docs[i][sortBy || num].toLowerCase()).toBe(true);
        }
    }
}

//?---------------TESTS---------------//

//----Sorting and pagination---//
describe('Test ordering & pagination', () => {
    it('should get paginated and sorted items', async () => {
        await sendRequest({
            limit: 10,
            page: getRandomInt(1, 263),
            sortBy: getRandomCategory(),
            order: 1
        })
    });
});
describe('Test limit and page default values', () => {
    it('page number should be 1 and limit should be 10', async () => {
        await sendRequest({
            sortBy: getRandomCategory(),
            order: 1
        })
    });
});
describe('Test sortBy, limit and order default values', () => {
    it('sortBy should be "num", limit should be 10 and order should be ascending', async () => {
        await sendRequest({ page: getRandomInt(1, 263) })
    });
});

//-----------Search----------//