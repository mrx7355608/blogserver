import "dotenv/config";
import { app } from "../src/app"
import supertest from "supertest"
import { connectDB } from "../src/loaders/database";

const agent = supertest(app);

describe("Blog endpoint tests", () => {
    beforeAll(async() => {
        await connectDB(process.env.DATABASE_URL as string);
    })
    it("should throw error on negative number as page query value", async () => {
        const resp = await agent.get("/api/v1/blogs?page=-99").expect(400)
        expect(resp.body.message).toBe("Invalid page number")
    })
    it("should return 10 blogs per page", async () => {
        const firstResponse = await agent.get("/api/v1/blogs?page=1").expect(200);
        const secondResponse = await agent.get("/api/v1/blogs?page=2").expect(200);
        expect(firstResponse.body.data.length).toBe(10);
        expect(secondResponse.body.data.length).toBe(10);
    })
    it("should return new blogs on different pages", async() => {
        const firstResponse = await agent.get("/api/v1/blogs?page=1").expect(200);
        const secondResponse = await agent.get("/api/v1/blogs?page=2").expect(200);
        const f1 = firstResponse.body.data[0]
        const f2 = secondResponse.body.data[0]
        expect(f1).not.toStrictEqual(f2);
    })
    it("should return the data with required fields only", async() => {
        const resp = await agent.get("/api/v1/blogs");
        expect(resp.body.data[0]).toStrictEqual({
            title: expect.any(String),
            slug: expect.any(String),
            blogBody: expect.any(String),
            tags: expect.any(Array),
            published_on: expect.any(String),
        })
    })
})
