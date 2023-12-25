import "dotenv/config";
import { app } from "../src/app";
import supertest from "supertest";
import { connectDB } from "../src/loaders/database";

const agent = supertest(app);

describe("BLOG ENDPOINT", () => {
    beforeAll(async () => await connectDB(process.env.DATABASE_URL as string));

    describe("TESTING /blogs", () => {
        it("should return only the required data", async () => {
            const response = await agent.get("/api/v1/blogs").expect(200);
            const firstBlog = response.body.data[0];
            expect(firstBlog).not.toBeNull();
            expect(firstBlog).toStrictEqual({
                title: expect.any(String),
                blogBody: expect.any(String),
                published_on: expect.any(String),
                tags: expect.any(Array),
                slug: expect.any(String),
            });
        });

        it.todo("should return only the required data");
    });
});
