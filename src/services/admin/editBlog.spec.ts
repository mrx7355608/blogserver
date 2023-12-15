import editBlogData from "./editBlog";
import mockBlogDB from "../../../__mocks__/blogsDB.mock";

const editBlog = editBlogData(mockBlogDB);

/* eslint-disable @typescript-eslint/no-explicit-any */
describe("Edit blog", () => {
    const changes = {
        title: "Blog 2 - Despair",
        blogBody:
            "A short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despairA short blog about despair",
        slug: "blog-2-despair",
        published_on: "Wed Dec 13, 2023",
        is_published: false,
        tags: ["life"],
    };

    it("should validate blog id", async () => {
        try {
            await editBlog("123123", changes);
        } catch (err: any) {
            expect(err.message).toBe("Invalid blog id");
        }
    });
    it("should return error if blog does not exist", async () => {
        try {
            await editBlog("6576ea783fca4cc2390a95ce", changes);
        } catch (err: any) {
            expect(err.message).toBe("Blog not found");
        }
    });
    it("should validate the changes before updating the blog", async () => {
        try {
            await editBlog("6576ea783fca4cc2390a95ce", {
                ...changes,
                title: "Abc",
            });
        } catch (err: any) {
            expect(err.message).toBe(
                "Blog title should be atleast 10 characters long",
            );
        }
    });
    it("should update the blog", async () => {
        const newTitle = "New blog title";
        const updatedBlog = await editBlog("6576ea783fca4cc2390a95ce", {
            title: newTitle,
        });
        expect(updatedBlog).toMatchObject({
            title: newTitle,
        });
    });
});
