import BlogServices from "../src/services/blog.services";
import mockBlogDB from "../__mocks__/blogsDB.mock";

describe("Blog Services", () => {
    const blogServices = BlogServices(mockBlogDB);

    describe("List blog by slug", () => {
        it("should throw error if blog is not found", async () => {
            try {
                await blogServices.listOneBlogBySlug("ha-ha-ha");
                // eslint-disable-next-line
            } catch (err: any) {
                expect(err.message).toBe("Blog not found");
            }
        });

        it("should return the blog from slug if it exists", async () => {
            const blog = await blogServices.listOneBlogBySlug("ha-ha-ha");
            expect(blog).toStrictEqual({
                title: expect.any(String),
                blogBody: expect.any(String),
                tags: expect.any(Array),
                slug: expect.any(String),
                published_on: expect.any(String),
                is_published: expect.any(Boolean),
            });
        });
    });
});
