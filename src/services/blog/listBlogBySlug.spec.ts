import mockBlogDB from "../../../__mocks__/blogsDB.mock";
import listBlogBySlug from "./listBlogBySlug";

const listOneBlogBySlug = listBlogBySlug(mockBlogDB);

/* eslint-disable @typescript-eslint/no-explicit-any */
describe("List one blog by slug", () => {
    it("should throw an error if blog is not found", async () => {
        try {
            await listOneBlogBySlug("i-never-wrote-this-blog");
        } catch (err: any) {
            expect(err.message).toBe("Blog not found");
        }
    });
    it("should return blog if found", async () => {
        const blog = await listOneBlogBySlug("i-never-wrote-this-blog");
        const expected = {
            title: expect.any(String),
            blogBody: expect.any(String),
            slug: expect.any(String),
            published_on: expect.any(String),
            tags: expect.any(Array),
            is_published: expect.any(Boolean),
        };
        expect(blog).toStrictEqual(expected);
    });
});
