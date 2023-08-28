const request = require("supertest")
const baseURL = "http://localhost:5000"

describe("GET /decretos", () => {
    it("should return all decrees", async () => {
        const response = await request(baseURL).get("/decretos");
        const docs = response.body.docs
        expect(response.statusCode).toBe(200);
        expect(docs.length).toBeGreaterThan(0);
        expect(docs).toBeInstanceOf(Array);
    });
});

