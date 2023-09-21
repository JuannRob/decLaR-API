const request = require("supertest")
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const URL = `http://localhost:${PORT}`

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

const checkOrdering = (arr, order = 1, sortBy = 'num') => {
    if (order === 1) {
        for (let i = 1; i < arr.length; i++) {
            expect(arr[i - 1][sortBy].toLowerCase() <= arr[i][sortBy].toLowerCase()).toBe(true);
        }
    } else {
        for (let i = 1; i < arr.length; i++) {
            expect(arr[i - 1][sortBy].toLowerCase() >= arr[i][sortBy].toLowerCase()).toBe(true);
        }
    }
}

async function sendRequest(query) {
    const { limit, page, sortBy, order } = query
    const response = await request(URL).get("/decretos").query(query)
    const data = response.body.data;
    expect(response.statusCode).toBe(200);
    expect(data.docs.length).toBeGreaterThan(0);
    expect(data.docs).toHaveLength(limit || 10);
    expect(data.page).toBe(page || 1);

    checkOrdering(data.docs, order, sortBy);
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

    it('should set page number to 1 and limit to 10 by default', async () => {
        await sendRequest({
            sortBy: 'num',
            order: 1
        })
    });

    it('should return decrees in descending order', async () => {
        await sendRequest({
            sortBy: 'tema',
            order: -1
        })
    });

    it('should return decrees in ascending order, sorted by number \n and up to 10 items per page', async () => {
        await sendRequest({ page: getRandomInt(1, 263) })
    });
});

//-----------API Requests----------//
// describe('API Route: /api/decs', () => {
//     it('debería manejar parámetros de consulta incorrectos', async () => {
//         const { data } = await request(URL).get("/decretos").query({ limit: 'invalid', page: 'invalid', sortBy: 'invalid', order: 'invalid' })
//         expect(data.statusCode).toBe(400);
//     });
// });
