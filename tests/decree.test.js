const request = require("supertest")
const baseURL = "http://localhost:5000"

global.myUtilityFunction = () => {
    // Utility function logic
};

// describe("Test get all decrees", () => {
//     it("should return all decrees", async () => {
//         const response = await request(baseURL).get("/decretos");
//         const docs = response.body.docs
//         expect(response.statusCode).toBe(200);
//         expect(docs.length).toBeGreaterThan(0);
//         expect(docs).toBeInstanceOf(Array);
//     });
// });

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

const query = {
    limit: 10,
    page: getRandomInt(1, 263),
    sortBy: getRandomCategory(),
    order: 1
}

describe('Test ordering & pagination', () => {
    it('should get paginated and sorted items', async () => {

        console.log('query: ', query);
        const response = await request(baseURL).get("/decretos")
            .query(query)

        const body = response.body
        console.log(body.docs);
        expect(response.statusCode).toBe(200); //http status == 200
        expect(body.docs.length).toBeGreaterThan(0); //is not empty
        expect(body.page).toBe(query.page); //tests if the page is the same as the query
        expect(body.docs).toHaveLength(10); //tests limit
        for (let i = 1; i < body.docs.length; i++) { //tests if the sorting category and the order are correct
            expect(body.docs[i - 1][query.sortBy].toLowerCase() <= body.docs[i][query.sortBy].toLowerCase()).toBe(true);
        }
    });
});
