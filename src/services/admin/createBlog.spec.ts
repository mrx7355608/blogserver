import createBlog from "./createBlog";
import mockBlogDB from "../../../__mocks__/blogsDB.mock";

const createNewBlog = createBlog(mockBlogDB);

/* eslint-disable @typescript-eslint/no-explicit-any */
describe("Create a new blog", () => {
    it("should throw error if data is not provided", async () => {
        try {
            await createNewBlog(null);
        } catch (err: any) {
            expect(err.message).toBe("Blog cannot be created without any data");
        }
    });
    it("should create a blog", async () => {
        const data = {
            title: "New CSS Property",
            blogBody:
                "One of the most annoying things to deal with in CSS is margins. They have weird interactions with collapsing and more often than not you end up with extra spacing where you don’t want it. This becomes an even larger pain when moving to a component based design system since now you need to ensure your components all work well with each other without leaking styles outside themselves.s you can see, the bottom margin of the last child is forcing the card to have extra space on the bottom which makes the card taller than it should be. This is relatively easy to fix if we change our",
            tags: ["CSS"],
        };
        const newBlog = await createNewBlog(data);
        expect(newBlog).toStrictEqual({
            title: data.title,
            tags: data.tags,
            blogBody: data.blogBody,
            slug: "some-slug",
            is_published: true,
        });
    });
});
